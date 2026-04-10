import React, { useState } from "react";
import { View, Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ListItemCard } from "../components/ListItemCard";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

export function LisDisciplina() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [disciplinas, setDisciplinas] = useState([
    {
      id: "1",
      nome: "Programacao Mobile",
      cargaHoraria: "80h",
      professor: "Andre Olimpio",
    },
    {
      id: "2",
      nome: "Banco de Dados",
      cargaHoraria: "60h",
      professor: "Sergio Santos",
    },
    {
      id: "3",
      nome: "Engenharia de Software",
      cargaHoraria: "80h",
      professor: "Claudio Silva",
    },
  ]);

  const handleEdit = (id: string) => {
    Alert.alert("Editar", "Editar disciplina");
    navigation.navigate("Disciplina", { id });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar Exclusao",
      "Tem certeza que deseja excluir a disciplina?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setDisciplinas((prev) => prev.filter((disciplina) => disciplina.id !== id));
            Alert.alert("Excluido", "Disciplina excluida com sucesso");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.nome}
            description={`${item.cargaHoraria} | ${item.professor}`}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Disciplina")}
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