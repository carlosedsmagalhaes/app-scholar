import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { BoletimCard } from "../components/BoletimCard";
import { COLORS } from "../styles/theme";

interface DadosBoletim {
  id: string;
  disciplina: string;
  nota1: string;
  nota2: string;
}

export function Boletim() {
  const [dados, setDados] = useState<DadosBoletim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const dadosMock: DadosBoletim[] = [
        {
          id: "1",
          disciplina: "Engenharia de Software",
          nota1: "7.5",
          nota2: "8.0",
        },
        { id: "2", disciplina: "Cálculo I", nota1: "5.0", nota2: "6.0" },
        {
          id: "3",
          disciplina: "Algoritmos e Programação",
          nota1: "9.0",
          nota2: "9.5",
        },
      ];
      setDados(dadosMock);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do boletim.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BoletimCard
            disciplina={item.disciplina}
            nota1={item.nota1}
            nota2={item.nota2}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 40,
  },
});
