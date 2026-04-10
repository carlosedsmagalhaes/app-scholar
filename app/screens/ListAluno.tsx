import React, { useState } from "react";
import { View, Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ListItemCard } from "../components/ListItemCard";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

export function ListAluno() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [alunos, setAlunos] = useState([
    { id: "1", nome: "Carlos Pereira", matricula: "20241001", curso: "ADS" },
    { id: "2", nome: "Marina Souza", matricula: "20241002", curso: "DSM" },
    {
      id: "3",
      nome: "Rafael Almeida",
      matricula: "20241003",
      curso: "Geoprocessamento",
    },
  ]);

  const handleEdit = (id: string) => {
    Alert.alert("Editar", "Editar aluno");
    navigation.navigate("Aluno", { id });
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar Exclusao", "Tem certeza que deseja excluir o aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
          Alert.alert("Excluido", "Aluno excluido com sucesso");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.nome}
            description={`Matricula: ${item.matricula} | Curso: ${item.curso}`}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Aluno")}
      >
        <MaterialIcons name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
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