import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert, Text } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { COLORS } from "../styles/theme";
import { consultarCep } from "../services/cepService";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Dropdown } from "react-native-element-dropdown";

export function Aluno() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState<string | null>(null);

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
          setCidade(data.localidade || "");
          setEstado(data.uf || "");
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

      <View style={styles.container}>
        <Text style={styles.labelPersonalizada}>Curso</Text>

        <Dropdown
          style={[
            styles.dropdown,
            isFocus && { borderColor: COLORS.primary },
            error && curso === "" && { borderColor: COLORS.error },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={cursoDados}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Selecione o curso" : ""}
          value={curso}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCurso(item.value);
            setIsFocus(false);
          }}
        />
        {error && curso === "" && <Text style={styles.errorText}>{error}</Text>}
      </View>

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
      <Input
        label="Cidade"
        value={cidade}
        onChangeText={setCidade}
        placeholder="Digite a cidade"
      />
      <Input
        label="Estado"
        value={estado}
        onChangeText={setEstado}
        placeholder="Digite o estado"
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
