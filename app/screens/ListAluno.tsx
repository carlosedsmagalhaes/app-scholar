import React, { useCallback, useState } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItemCard } from "../components/ListItemCard";
import { InputFilter } from "../components/InputFilter";
import { EmptyCard } from "../components/EmptyCard";
import { FloatingButton } from "../components/FloatingButton";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import serverApi from "../services/serverApi";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../contexts/AuthContext";
import { Aluno } from "../types/index";

export function ListAluno() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const isAdmin = user?.perfil === "ADMIN";
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchAlunos();
    }, []),
  );

  async function fetchAlunos() {
    try {
      setLoading(true);
      const response = await serverApi.get("/api/alunos");
      console.log("Alunos carregados:", response.data);
      setAlunos(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (id: number) => {
    Alert.alert("Editar", "Editar aluno");
    navigation.navigate("Aluno", { id });
  };

  const handleDelete = (id: number) => {
    Alert.alert("Confirmar Exclusão", "Deseja remover este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await serverApi.delete(`/api/alunos/${id}`);
            Alert.alert("Sucesso", "Aluno removido");
            fetchAlunos();
          } catch (error) {
            Alert.alert("Erro", "Falha ao excluir aluno.");
          }
        },
      },
    ]);
  };

  const filteredAlunos = alunos.filter(
    (aluno: Aluno) =>
      aluno.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      aluno.matricula.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <InputFilter
        placeholder="Buscar por nome ou matrícula..."
        onChangeText={setSearchText}
      />

      {filteredAlunos.length === 0 && !loading ? (
        <EmptyCard message="Nenhum aluno encontrado." />
      ) : (
        <FlatList
          data={filteredAlunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItemCard
              title={item.nome}
              description={`Matricula: ${item.matricula} | Curso: ${item.curso?.nome}`}
              showActions={isAdmin}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {isAdmin && (
        <FloatingButton onPress={() => navigation.navigate("Aluno")} />
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
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
