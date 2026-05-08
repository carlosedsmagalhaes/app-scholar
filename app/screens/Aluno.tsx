import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { COLORS } from "../styles/theme";
import { consultarCep } from "../services/cepService";
import { consultarEstados, consultarCidades } from "../services/ibgeService";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Select } from "../components/Select";
import { useRoute, RouteProp } from "@react-navigation/native";
import type { Aluno as IAluno, Curso as ICurso } from "../types";
import serverApi from "../services/serverApi";

export function Aluno() {
  const route = useRoute<RouteProp<RootStackParamList, "Aluno">>();
  const { id } = route.params || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cidadeDoCep, setCidadeDoCep] = useState("");
  const [listaCursos, setListaCursos] = useState<
    { label: string; value: string }[]
  >([]);
  const [listaEstados, setListaEstados] = useState<
    { label: string; value: string }[]
  >([]);
  const [listaCidades, setListaCidades] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [resCursos, dataEstados] = await Promise.all([
          serverApi.get("/api/cursos"),
          consultarEstados(),
        ]);

        setListaCursos(
          resCursos.data.map((c: ICurso) => ({
            label: c.nome,
            value: String(c.id),
          })),
        );
        setListaEstados(
          dataEstados.map((e: any) => ({ label: e.nome, value: e.sigla })),
        );

        if (id) {
          const resAluno = await serverApi.get(`/api/alunos/${id}`);
          const a = resAluno.data;
          console.log("Aluno carregado:", a);
          setNome(a.nome);
          setMatricula(a.matricula);
          setCursoId(String(a.curso_id));
          setEmail(a.usuario.email || "");
          setTelefone(a.telefone || "");
          setCep(a.cep || "");
          setEndereco(a.logradouro || "");
          setNumero(a.numero || "");
          setBairro(a.bairro || "");
          setEstado(a.estado || "");
          setCidadeDoCep(a.cidade || "");
        }
      } catch (err) {
        Alert.alert("Erro", "Falha ao carregar informações iniciais.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  useEffect(() => {
    const sanitizedCep = cep.replace(/[^0-9]/g, "");
    if (sanitizedCep.length === 8) {
      consultarCep(sanitizedCep)
        .then((data) => {
          console.log("Dados do CEP:", data);
          setEndereco(data.logradouro || "");
          setBairro(data.bairro || "");
          setEstado(data.uf || "");
          setCidadeDoCep(data.localidade || "");
          /* setCidade(data.localidade || ""); */
        })
        .catch((error) => {
          Alert.alert("Erro", error.message);
        });
    } else {
      setEndereco("");
      setBairro("");
      setCidade("");
      setEstado("");
    }
  }, [cep]);

  useEffect(() => {
    consultarEstados()
      .then((data) => {
        const formatado = data.map((e: any) => ({
          label: e.nome,
          value: e.sigla,
        }));
        setListaEstados(formatado);
      })
      .catch((err) => console.error("Erro ao carregar estados", err));
  }, []);

  useEffect(() => {
    if (estado) {
      consultarCidades(estado)
        .then((data) => {
          const formatado = data.map((c: any) => ({
            label: c.nome,
            value: c.nome,
          }));
          setListaCidades(formatado);
          if (cidadeDoCep) {
            const encontrou = formatado.find(
              (c) =>
                c.value.toLowerCase().trim() ===
                cidadeDoCep.toLowerCase().trim(),
            );
            if (encontrou) {
              setCidade(encontrou.value);
              setCidadeDoCep("");
            }
          }
        })
        .catch(() =>
          Alert.alert(
            "Erro",
            "Não foi possível carregar as cidades deste estado.",
          ),
        );
    } else {
      setListaCidades([]);
      setCidade("");
    }
  }, [estado]);

  async function handleSalvar() {
    if (!nome || !matricula || !cursoId || !email) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      nome,
      matricula,
      curso_id: Number(cursoId),
      email,
      telefone,
      cep,
      logradouro: endereco,
      numero,
      bairro,
      cidade,
      estado,
    };

    try {
      setLoading(true);
      if (id) {
        await serverApi.put(`/api/alunos/${id}`, payload);
        Alert.alert("Sucesso", "Aluno atualizado!");
      } else {
        await serverApi.post("/api/alunos", payload);
        Alert.alert("Sucesso", "Aluno cadastrado!");
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar os dados do aluno.");
    } finally {
      setLoading(false);
    }
  }

  if (loading && id) {
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={styles.loader}
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Input
        label="Nome Completo"
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome completo"
        errorMessage={error && nome === "" ? error : null}
      />
      <Input
        label="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
        placeholder="Digite a matrícula"
        keyboardType="numeric"
        errorMessage={error && matricula === "" ? error : null}
      />

      <Select
        label="Curso"
        data={listaCursos}
        value={cursoId}
        onChange={setCursoId}
        placeholder="Selecione o curso"
        errorMessage={error && cursoId === "" ? error : undefined}
      />

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o email"
        keyboardType="email-address"
        errorMessage={error && email === "" ? error : null}
      />
      <Input
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Digite o telefone"
        keyboardType="phone-pad"
      />
      <Input
        label="CEP"
        value={cep}
        onChangeText={setCep}
        placeholder="Digite o CEP"
        keyboardType="numeric"
      />
      <Input
        label="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Digite o endereço"
      />
      <Input
        label="Número"
        value={numero}
        onChangeText={setNumero}
        placeholder="Digite o número"
        keyboardType="numeric"
      />
      <Input
        label="Bairro"
        value={bairro}
        onChangeText={setBairro}
        placeholder="Digite o bairro"
      />
      <Select
        label="Estado"
        data={listaEstados}
        value={estado}
        onChange={(val) => {
          setEstado(val);
          setCidade("");
        }}
        placeholder="Selecione o estado"
      />

      <Select
        label="Cidade"
        data={listaCidades}
        value={cidade}
        onChange={setCidade}
        placeholder="Selecione a cidade"
        disable={!estado}
      />
      <Button title="Salvar" onPress={handleSalvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  dropdown: {
    height: 55,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.white,
    marginBottom: 5,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 2,
  },
  labelPersonalizada: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.text,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
