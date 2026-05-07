import React, { useState, useCallback } from "react";
import { View, Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
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
import { Disciplina } from "../navigation/types";

export function ListDisciplina() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const isAdmin = user?.perfil === 'ADMIN';
  console.log("Perfil do usuário:", user?.perfil);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchDisciplinas();
    }, []),
  );

  async function fetchDisciplinas() {
    try {
      const response = await serverApi.get("/api/disciplinas");
      console.log("Disciplinas carregadas:", response.data);
      setDisciplinas(response.data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar disciplinas.");
    }
  };

  const handleEdit = (id: number) => {
    Alert.alert("Editar", "Editar disciplina");
    navigation.navigate("Disciplina", { id });
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja remover esta disciplina?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setDisciplinas((prev) => prev.filter((disciplina) => disciplina.id !== id));
            Alert.alert("Excluido", "Disciplina removida");
          },
        },
      ],
    );
  };

  const filtered = disciplinas.filter((d: any) => 
    d.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <InputFilter
        placeholder="Buscar disciplina..."
        onChangeText={setSearchText}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.nome}
            description={`${item.carga_horaria} | ${item.professores.map((p) => p.professor.nome).join(", ")}`}
            showActions={isAdmin}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      {isAdmin && <FloatingButton onPress={() => navigation.navigate("Disciplina")} />}
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