import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MenuCard } from "../components/MenuCard";
import { COLORS } from "../styles/theme";

export function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App Scholar!</Text>
      <Text style={styles.subtitle}>O que você gostaria de gerenciar hoje?</Text>

      <View style={styles.menuGrid}>
        <MenuCard
          title="Alunos"
          onPress={() => {
            console.log("Alunos");
          }}
        />
        <MenuCard
          title="Professores"
          onPress={() => {
            console.log("Professores");
          }}
        />
        <MenuCard
          title="Disciplinas"
          onPress={() => {
            console.log("Disciplinas");
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
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
