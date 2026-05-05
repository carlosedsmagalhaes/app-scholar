import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BoletimCard } from "../components/BoletimCard";
import { COLORS } from "../styles/theme";
import serverApi from "../services/serverApi";
import { useAuth } from "../contexts/AuthContext";
import { EmptyCard } from "../components/EmptyCard";
import { InputFilter } from "../components/InputFilter";
import { RootStackParamList, DadosBoletim, Disciplina, Aluno } from "../navigation/types";
import { FloatingButton } from "../components/FloatingButton";

export function ListBoletim() {
  const [dados, setDados] = useState<DadosBoletim[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ListBoletim'>>();
  const isAluno = user?.perfil === "ALUNO";

  const dadosFiltrados = dados.filter((item) => {
    const busca = searchText.toLowerCase();
    // Filtra por nome da disciplina ou nome do aluno
    return (
      item.disciplina.nome.toLowerCase().includes(busca) ||
      item.aluno?.nome?.toLowerCase().includes(busca)
    );
  });

  useFocusEffect(
    useCallback(() => {
      async function fetchDados() {
        try {
          let url = user?.perfil === "ALUNO" ? "/api/notas/aluno" : "/api/notas";
          const response = await serverApi.get(url);
          setDados(response.data);
        } catch (error) {
          Alert.alert("Erro", "Falha ao atualizar boletim.");
        }
      }

      fetchDados();
    }, [user])
  );

  return (
    <View style={styles.container}>
      <InputFilter
        placeholder="Buscar por aluno ou disciplina..."
        onChangeText={setSearchText}
      />
      {dadosFiltrados.length === 0 ? (
        <EmptyCard message="Nenhum registro encontrado" />
      ) : (
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BoletimCard
              titulo={isAluno ? item.disciplina.nome : item.aluno.nome}
              subtitulo={isAluno ? undefined : item.disciplina.nome}
              nota1={item.nota1}
              nota2={item.nota2}
              showActions={!isAluno} 
              onEdit={() => {
                navigation.navigate("LancamentoNota", { nota: item });
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {!isAluno && (
      <FloatingButton 
        onPress={() => navigation.navigate("LancamentoNota")} 
      />
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
    paddingBottom: 40,
  },
});
