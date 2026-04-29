import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert, Text } from "react-native";
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

export function Aluno() {
  const route = useRoute<RouteProp<RootStackParamList, "Aluno">>();
  const { id } = route.params || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidadeDoCep, setCidadeDoCep] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [listaEstados, setListaEstados] = useState<
    { label: string; value: string }[]
  >([]);
  const [listaCidades, setListaCidades] = useState<
    { label: string; value: string }[]
  >([]);

  const cursoDados = [
    { label: "ADS", value: "ADS" },
    { label: "DSM", value: "DSM" },
    { label: "Geoprocessamento", value: "Geoprocessamento" },
    { label: "Meio Ambiente", value: "Meio Ambiente" },
  ];

  useEffect(() => {
    const sanitizedCep = cep.replace(/[^0-9]/g, "");
    if (sanitizedCep.length === 8) {
      consultarCep(sanitizedCep)
        .then((data) => {
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
    if (id) {
      const alunoData = {
        nome: "Carlos Pereira",
        matricula: "20241001",
        curso: "ADS",
        email: "carlos.pereira@aluno.edu",
        telefone: "(11) 99999-1234",
        cep: "01001000",
        endereco: "Praca da Se",
        numero: "100",
        bairro: "Se",
        cidade: "Sao Paulo",
        estado: "SP",
      };

      setNome(alunoData.nome);
      setMatricula(alunoData.matricula);
      setCurso(alunoData.curso);
      setEmail(alunoData.email);
      setTelefone(alunoData.telefone);
      setCep(alunoData.cep);
      setEndereco(alunoData.endereco);
      setNumero(alunoData.numero);
      setBairro(alunoData.bairro);
      setCidade(alunoData.cidade);
      setEstado(alunoData.estado);
    }
  }, [id]);

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
              (c) => c.value.toLowerCase().trim() === cidadeDoCep.toLowerCase().trim(),
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

  function handleSalvar() {
    if (!nome || !matricula || !curso || !email) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Aluno cadastrado:", {
      nome,
      matricula,
      curso,
      email,
      telefone,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
    });

    Alert.alert("Sucesso", "Aluno cadastrado com sucesso!");
    setNome("");
    setMatricula("");
    setCurso("");
    setEmail("");
    setTelefone("");
    setCep("");
    setEndereco("");
    setNumero("");
    setBairro("");
    setCidade("");
    setEstado("");
    setError(null);
    navigation.goBack();
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
        data={cursoDados}
        value={curso}
        onChange={setCurso}
        placeholder="Selecione o curso"
        errorMessage={error && curso === "" ? error : undefined}
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
});
