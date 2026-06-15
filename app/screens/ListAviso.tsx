import React, { useCallback, useState, useRef } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import Loader from "../components/Loader";
import { ListItemCard } from "../components/ListItemCard";
import { InputFilter } from "../components/InputFilter";
import { EmptyCard } from "../components/EmptyCard";
import { FloatingButton } from "../components/FloatingButton";
import { COLORS } from "../styles/theme";
import serverApi from "../services/serverApi";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Aviso } from "../types/index";

export function ListAviso() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  
  const isAluno = user?.perfil === "ALUNO";

  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [ultimoIdLido, setUltimoIdLido] = useState<number>(0);
  const [avisosCriadosPorMim, setAvisosCriadosPorMim] = useState<number[]>([]);
  
  const maiorIdDisponivel = useRef<number>(0);

  useFocusEffect(
    useCallback(() => {
      fetchAvisos();

      return () => {
        if (maiorIdDisponivel.current > 0) {
          AsyncStorage.setItem("@ultimo_aviso_lido", String(maiorIdDisponivel.current))
            .catch(err => console.error("Erro ao salvar último visto:", err));
        }
      };
    }, []),
  );

  async function fetchAvisos() {
    try {
      setLoading(true);

      // 1. Recupera o histórico do último ID guardado antes do usuário entrar na tela
      const salvo = await AsyncStorage.getItem("@ultimo_aviso_lido");
      if (salvo) setUltimoIdLido(Number(salvo));

      // 2. Busca os dados da API
      const response = await serverApi.get("/api/avisos");
      const listaAvisos: Aviso[] = response.data;
      setAvisos(listaAvisos);

      // 3. Guarda o maior ID na referência para persistir somente na saída da tela
      if (listaAvisos.length > 0) {
        maiorIdDisponivel.current = listaAvisos[0].id;
      }

      // 4. Verifica localmente quais desses IDs foram criados por esta máquina
      const criados: number[] = [];
      await Promise.all(
        listaAvisos.map(async (aviso) => {
          const porMim = await AsyncStorage.getItem(`@criado_por_mim_${aviso.id}`);
          if (porMim === "true") criados.push(aviso.id);
        })
      );
      setAvisosCriadosPorMim(criados);

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os avisos.");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = (id: number) => {
    Alert.alert("Confirmar Exclusão", "Deseja remover este aviso?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await serverApi.delete(`/api/avisos/${id}`);
            Alert.alert("Sucesso", "Aviso removido");
            fetchAvisos();
          } catch (error) {
            Alert.alert("Erro", "Falha ao excluir aviso.");
          }
        },
      },
    ]);
  };

  const dadosFiltrados = avisos.filter(
    (aviso: Aviso) =>
      aviso.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
      aviso.descricao.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <InputFilter
        placeholder="Buscar por título ou descrição..."
        onChangeText={setSearchText}
      />

      {loading ? (
        <Loader />
      ) : dadosFiltrados.length === 0 ? (
        <EmptyCard message="Nenhum aviso encontrado" />
      ) : (
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            // Lógica estável do Badge Visual de Notificação
            const isNovo = item.id > ultimoIdLido;
            const foiCriadoPorMim = avisosCriadosPorMim.includes(item.id);
            const exibirBadgeNovo = isNovo && !foiCriadoPorMim;

            return (
              <ListItemCard
                title={exibirBadgeNovo ? `🚨 [NOVO] ${item.titulo}` : item.titulo}
                description={`Prioridade: ${item.prioridade}\n${item.descricao}`}
                showActions={false} 
                onEdit={() => navigation.navigate("Aviso", { id: item.id })} 
                onDelete={() => handleDelete(item.id)}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      )}

      {!isAluno && (
        <FloatingButton onPress={() => navigation.navigate("Aviso")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 20,
    paddingBottom: 250, 
  },
});