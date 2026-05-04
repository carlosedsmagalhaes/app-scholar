import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MenuCard } from "../components/MenuCard";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const isAdmin = user?.perfil === "ADMIN";
  const isProfessor = user?.perfil === "PROFESSOR";
  const isAluno = user?.perfil === "ALUNO";

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Olá, {user?.email.split("@")[0]}</Text>
      </View>

      <View style={styles.menuGrid}>
        {(isAdmin || isProfessor) && (
          <MenuCard
            title="Alunos"
            onPress={() => {
              navigation.navigate("ListAluno");
            }}
          />
        )}
        {isAdmin && (
          <MenuCard
            title="Professores"
            onPress={() => {
              navigation.navigate("ListProfessor");
            }}
          />
        )}
        <MenuCard
          title="Disciplinas"
          onPress={() => {
            navigation.navigate("ListDisciplina");
          }}
        />
        {(isAdmin || isProfessor) && (
          <MenuCard
            title="Boletim"
            onPress={() => {
              navigation.navigate("Boletim");
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  menuGrid: {
    width: "100%",
    flexDirection: "column",
  },
});
