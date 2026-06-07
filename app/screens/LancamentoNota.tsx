import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, ScrollView, Alert, Text, TextInput } from "react-native";
import Loader from "../components/Loader";
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

  const [listaAlunosOriginal, setListaAlunosOriginal] = useState<any[]>([]);
  const [listaDisciplinasOriginal, setListaDisciplinasOriginal] = useState<any[]>([]);

  const [alunoId, setAlunoId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [loading, setLoading] = useState(false);
  const nota2Ref = useRef<TextInput>(null);

  useEffect(() => {
    async function loadResources() {
      try {
        setLoading(true);
        const [resAlunos, resDisc] = await Promise.all([
          serverApi.get("/api/alunos"),
          serverApi.get("/api/disciplinas"),
        ]);
        setListaAlunosOriginal(resAlunos.data);
        setListaDisciplinasOriginal(resDisc.data);
        if (params?.nota) {
          setAlunoId(String(params.nota.aluno_id));
          setDisciplinaId(String(params.nota.disciplina_id));
          setNota1(String(params.nota.nota1));
          setNota2(String(params.nota.nota2));
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar dados para lançamento.");
      }
      finally {
        setLoading(false);
      }
    }
    loadResources();
  }, [params]);

  const alunosFiltrados = useMemo(() => {
    if (!disciplinaId) return [];

    // Encontra a disciplina selecionada para saber o semestre dela
    const discSelecionada = listaDisciplinasOriginal.find(
      (d) => String(d.id) === disciplinaId
    );
    if (!discSelecionada) return [];

    // Filtra alunos que estão no mesmo semestre da disciplina
    return listaAlunosOriginal
      .filter((a) => a.semestre === discSelecionada.semestre)
      .map((a) => ({
        label: `${a.nome} (${a.matricula})`,
        value: String(a.id),
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Ordena alfabeticamente
  }, [disciplinaId, listaAlunosOriginal, listaDisciplinasOriginal]);

  const disciplinasData = useMemo(() => {
    return listaDisciplinasOriginal.map((d) => ({
      label: `${d.nome} - ${d.semestre}º Sem`,
      value: String(d.id),
    }));
  }, [listaDisciplinasOriginal]);

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
    loading ? (
      <Loader />
    ) : (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Select
        label="Disciplina"
        data={disciplinasData}
        value={disciplinaId}
        onChange={(val) => {
          setDisciplinaId(val);
          setAlunoId(""); // Reseta o aluno se trocar a disciplina
        }}
        disable={!!params?.nota} // Bloqueia troca de disciplina na edição
      />

      <Select
        label="Aluno"
        data={alunosFiltrados}
        value={alunoId}
        onChange={setAlunoId}
        disable={!!params?.nota || !disciplinaId} // Bloqueia troca de aluno na edição ou se nenhuma disciplina selecionada
      />

      <Input
        label="Nota 1"
        placeholder="Ex: 7.5"
        value={nota1}
        onChangeText={setNota1}
        keyboardType="numeric"
        nextRef={nota2Ref}
      />

      <Input
        label="Nota 2"
        placeholder="Ex: 8.0"
        value={nota2}
        onChangeText={setNota2}
        keyboardType="numeric"
        ref={nota2Ref}
        returnKeyType="done"
        onSubmitEditing={handleSave}
      />

      <Button title={"Confirmar"} onPress={handleSave} disabled={loading} />
    </ScrollView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },
});
