import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItemCard } from "../components/ListItemCard";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../contexts/AuthContext";

export function ListProfessor() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const isAdmin = user?.perfil === "ADMIN";
  const [professors, setProfessors] = useState([
    { id: "1", nome: "André Olímpio", titulacao: "Doutor" },
    { id: "2", nome: "Sérgio Santos", titulacao: "Mestre" },
    { id: "3", nome: "Cláudio Silva", titulacao: "Especialista" },
  ]);

  const handleEdit = (id: string) => {
    Alert.alert("Editar", `Editar professor`);
    navigation.navigate("Professor", { id });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o professor?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setProfessors((prev) => prev.filter((prof) => prof.id !== id));
            Alert.alert("Excluído", "Professor excluído com sucesso");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={professors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItemCard
            title={item.nome}
            description={item.titulacao}
            showActions={isAdmin}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Professor")}
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
