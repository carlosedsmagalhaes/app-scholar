import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

export function Professor() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [titulacao, setTitulacao] = useState("");
  const [areaAtuacao, setAreaAtuacao] = useState("");
  const [tempoDocencia, setTempoDocencia] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSalvar() {
    if (!nome || !titulacao || !areaAtuacao || !email) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log("Professor cadastrado:", {
      nome,
      titulacao,
      areaAtuacao,
      tempoDocencia,
      email,
    });

    Alert.alert("Sucesso", "Professor cadastrado com sucesso!");
    setNome("");
    setTitulacao("");
    setAreaAtuacao("");
    setTempoDocencia("");
    setEmail("");
    setError(null);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Input
        label="Nome Completo"
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome completo"
        errorMessage={error && nome === "" ? error : null}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o email"
        keyboardType="email-address"
        errorMessage={error && email === "" ? error : null}
      />
      <Input
        label="Titulação"
        value={titulacao}
        onChangeText={setTitulacao}
        placeholder="Digite a titulação"
        errorMessage={error && titulacao === "" ? error : null}
      />
      <Input
        label="Área de Atuação"
        value={areaAtuacao}
        onChangeText={setAreaAtuacao}
        placeholder="Digite a área de atuação"
        errorMessage={error && areaAtuacao === "" ? error : null}
      />
      <Input
        label="Tempo de Docência"
        value={tempoDocencia}
        onChangeText={setTempoDocencia}
        placeholder="Digite o tempo de docência"
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={handleSalvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});
