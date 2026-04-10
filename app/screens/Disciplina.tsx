import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert, Text } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Dropdown } from "react-native-element-dropdown";

export function Disciplina() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [professor, setProfessor] = useState("");
  const [curso, setCurso] = useState("");
  const [semestre, setSemestre] = useState("");
  const [focusField, setFocusField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cursoDados = [
    { label: "ADS", value: "ADS" },
    { label: "DSM", value: "DSM" },
    { label: "Geoprocessamento", value: "Geoprocessamento" },
    { label: "Meio Ambiente", value: "Meio Ambiente" },
  ];

  const professorDados = [
    { label: "Professor A", value: "Professor A" },
    { label: "Professor B", value: "Professor B" },
    { label: "Professor C", value: "Professor C" },
  ];

  const semestreDados = [
    { label: "1º Semestre", value: "1º Semestre" },
    { label: "2º Semestre", value: "2º Semestre" },
    { label: "3º Semestre", value: "3º Semestre" },
    { label: "4º Semestre", value: "4º Semestre" },
    { label: "5º Semestre", value: "5º Semestre" },
    { label: "6º Semestre", value: "6º Semestre" },
    { label: "7º Semestre", value: "7º Semestre" },
    { label: "8º Semestre", value: "8º Semestre" },
    { label: "9º Semestre", value: "9º Semestre" },
    { label: "10º Semestre", value: "10º Semestre" },
  ];

  function handleSalvar() {
    if (!nome || !cargaHoraria || !professor || !curso || !semestre) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Disciplina cadastrada:", {
      nome,
      cargaHoraria,
      professor,
      curso,
      semestre,
    });

    Alert.alert("Sucesso", "Disciplina cadastrada com sucesso!");
    setNome("");
    setCargaHoraria("");
    setProfessor("");
    setCurso("");
    setSemestre("");
    setError(null);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Input
        label="Nome da Disciplina"
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome da disciplina"
        errorMessage={error && nome === "" ? error : null}
      />
      <Input
        label="Carga Horária"
        value={cargaHoraria}
        onChangeText={setCargaHoraria}
        placeholder="Digite a carga horária"
        keyboardType="numeric"
        errorMessage={error && cargaHoraria === "" ? error : null}
      />
      <Select
        label="Professor"
        data={professorDados}
        value={professor}
        onChange={setProfessor}
        placeholder="Selecione o professor"
        errorMessage={error && professor === "" ? error : undefined}
      />

      <Select
        label="Curso"
        data={cursoDados}
        value={curso}
        onChange={setCurso}
        placeholder="Selecione o curso"
        errorMessage={error && curso === "" ? error : undefined}
      />

      <Select
        label="Semestre"
        data={semestreDados}
        value={semestre}
        onChange={setSemestre}
        placeholder="Selecione o semestre"
        errorMessage={error && semestre === "" ? error : undefined}
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
