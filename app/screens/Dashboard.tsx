import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MenuCard } from "../components/MenuCard";
import { COLORS } from "../styles/theme";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

export function Dashboard() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App Scholar!</Text>
      <Text style={styles.subtitle}>O que você gostaria de gerenciar hoje?</Text>

      <View style={styles.menuGrid}>
        <MenuCard
          title="Alunos"
          onPress={() => {
            navigation.navigate("Aluno");
          }}
        />
        <MenuCard
          title="Professores"
          onPress={() => {
            navigation.navigate("Professor");
          }}
        />
        <MenuCard
          title="Disciplinas"
          onPress={() => {
            console.log("Disciplina");
          }}
        />
        <MenuCard
          title="Boletim"
          onPress={() => {
            console.log("Boletim");
          }}
        />
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
