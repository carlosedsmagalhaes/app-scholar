import React, { useState, useEffect, use } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import Loader from "../components/Loader";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useRoute, RouteProp } from "@react-navigation/native";
import type { Professor as IProfessor, Area as IArea, Titutulacao as ITitutulacao } from "../types";
import { Select } from "../components/Select";
import serverApi from "../services/serverApi";

export function Professor() {
  const route = useRoute<RouteProp<RootStackParamList, 'Professor'>>();
  const { id } = route.params || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [titulacaoId, setTitulacaoId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [tempoDocencia, setTempoDocencia] = useState("");
  
  const [listaTitulacoes, setListaTitulacoes] = useState<{ label: string; value: string }[]>([]);
  const [listaAreas, setListaAreas] = useState<{ label: string; value: string }[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [resAreas, resTitulacoes] = await Promise.all([
          serverApi.get("/api/areas"),
          serverApi.get("/api/titulacoes")
        ]);

        setListaAreas(resAreas.data.map((a: IArea) => ({ label: a.descricao, value: String(a.id) })));
        setListaTitulacoes(resTitulacoes.data.map((t: ITitutulacao) => ({ label: t.descricao, value: String(t.id) })));

        if (id) {
          const resProf = await serverApi.get<IProfessor>(`/api/professores/${id}`);
          const p = resProf.data;

          setNome(p.nome);
          setEmail(p.usuario.email || "");
          setTitulacaoId(String(p.titulacao_id));
          setAreaId(String(p.area_id));
          setTempoDocencia(p.tempo_docencia ? String(p.tempo_docencia) : "");
        }
      } catch (err) {
        Alert.alert("Erro", "Não foi possível carregar as informações do professor.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  async function handleSalvar() {
    if (!nome || !email || !titulacaoId || !areaId) {
      setError("Campos obrigatórios faltando.");
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      nome,
      email,
      titulacaoId: Number(titulacaoId),
      areaId: Number(areaId),
    };

    try {
      setLoading(true);
      if (id) {
        await serverApi.put(`/api/professores/${id}`, payload);
        Alert.alert("Sucesso", "Professor atualizado com sucesso!");
      } else {
        await serverApi.post("/api/professores", payload);
        Alert.alert("Sucesso", "Professor cadastrado com sucesso!");
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", "Falha ao salvar os dados do professor.");
    } finally {
      setLoading(false);
    }
  }

  if (loading && id) {
    return <Loader />;
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
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Ex: professor@fatec.sp.gov.br"
        keyboardType="email-address"
        autoCapitalize="none"
        errorMessage={error && email === "" ? error : null}
      />

      <Select
        label="Titulação"
        data={listaTitulacoes}
        value={titulacaoId}
        onChange={setTitulacaoId}
        placeholder="Selecione a titulação"
        errorMessage={error && titulacaoId === "" ? error : undefined}
      />

      <Select
        label="Área de Atuação"
        data={listaAreas}
        value={areaId}
        onChange={setAreaId}
        placeholder="Selecione a área"
        errorMessage={error && areaId === "" ? error : undefined}
      />

      <Input
        label="Tempo de Docência (anos)"
        value={tempoDocencia}
        onChangeText={setTempoDocencia}
        placeholder="Ex: 10"
        keyboardType="numeric"
        errorMessage={error && tempoDocencia === "" ? error : undefined}
      />

      <Button 
        title={"Confirmar"} 
        onPress={handleSalvar} 
        disabled={loading} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" }
});