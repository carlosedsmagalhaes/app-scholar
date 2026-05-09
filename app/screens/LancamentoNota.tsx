import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { COLORS } from "../styles/theme";
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import serverApi from "../services/serverApi";

export function LancamentoNota() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as any;

  const [alunos, setAlunos] = useState<{ label: string; value: string }[]>([]);
  const [disciplinas, setDisciplinas] = useState<
    { label: string; value: string }[]
  >([]);

  const [alunoId, setAlunoId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        const [resAlunos, resDisc] = await Promise.all([
          serverApi.get("/api/alunos"),
          serverApi.get("/api/disciplinas"),
        ]);

        setAlunos(
          resAlunos.data.map((a: any) => ({
            label: a.nome,
            value: String(a.id),
          })),
        );
        setDisciplinas(
          resDisc.data.map((d: any) => ({
            label: d.nome,
            value: String(d.id),
          })),
        );

        if (params?.nota) {
          setAlunoId(String(params.nota.aluno_id));
          setDisciplinaId(String(params.nota.disciplina_id));
          setNota1(String(params.nota.nota1));
          setNota2(String(params.nota.nota2));
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar dados para lançamento.");
      }
    }
    loadResources();
  }, [params]);

  async function handleSave() {
    if (!alunoId || !disciplinaId || !nota1 || !nota2) {
      Alert.alert("Atenção", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      await serverApi.post("/api/notas", {
        alunoId: Number(alunoId),
        disciplinaId: Number(disciplinaId),
        nota1,
        nota2,
      });

      Alert.alert("Sucesso", "Nota registrada com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a nota.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Select
        label="Aluno"
        data={alunos}
        value={alunoId}
        onChange={setAlunoId}
        disable={!!params?.nota} // Bloqueia troca de aluno na edição
      />

      <Select
        label="Disciplina"
        data={disciplinas}
        value={disciplinaId}
        onChange={setDisciplinaId}
        disable={!!params?.nota} // Bloqueia troca de disciplina na edição
      />

      <Input
        label="Nota 1"
        placeholder="Ex: 7.5"
        value={nota1}
        onChangeText={setNota1}
        keyboardType="numeric"
      />

      <Input
        label="Nota 2"
        placeholder="Ex: 8.0"
        value={nota2}
        onChangeText={setNota2}
        keyboardType="numeric"
      />

      <Button
        title={"Confirmar"}
        onPress={handleSave}
        disabled={loading}
      />
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
  }
});