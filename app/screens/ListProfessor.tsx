import React, { useState, useCallback } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Loader from "../components/Loader";
import { ListItemCard } from "../components/ListItemCard";
import { InputFilter } from "../components/InputFilter";
import { EmptyCard } from "../components/EmptyCard";
import { FloatingButton } from "../components/FloatingButton";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../contexts/AuthContext";
import serverApi from "../services/serverApi";
import { Professor } from "../types/index";

export function ListProfessor() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const isAdmin = user?.perfil === "ADMIN";
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchProfessores();
    }, []),
  );

  async function fetchProfessores() {
    try {
      setLoading(true);
      const response = await serverApi.get("/api/professores");
      setProfessores(response.data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar professores.");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (id: number) => {
    navigation.navigate("Professor", { id });
  };

  async function handleDelete(id: number) {
    Alert.alert("Confirmar Exclusão", "Deseja remover este professor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await serverApi.delete(`/api/professores/${id}`);
          Alert.alert("Excluido", "Professor removido");
          fetchProfessores();
        },
      },
    ]);
  }

  const dadosFiltrados = professores.filter((p: Professor) =>
    p.nome.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <InputFilter
        placeholder="Buscar professor..."
        onChangeText={setSearchText}
      />
      {loading ? (
        <Loader />
      ) :
      dadosFiltrados.length === 0 ? (
        <EmptyCard message="Nenhum registro encontrado" />
      ) : (
      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.nome}
            description={item.titulacao.descricao}
            showActions={isAdmin}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      )}
      {isAdmin && (
        <FloatingButton onPress={() => navigation.navigate("Professor")} />
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
