import React, { useState } from "react";
import { ScrollView, StyleSheet, Alert, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { COLORS } from "../styles/theme";
import serverApi from "../services/serverApi";

export function ResetPassword() {
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  async function handleReset() {
    if (!token || !novaSenha || !confirmarSenha) {
      setError("Por favor, preencha todos os campos.");
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      await serverApi.post("/api/reset-password", { token, novaSenha });

      /* Alert.alert("Sucesso", "Senha alterada! Use sua nova senha para entrar.", [
        { text: "Ir para Login", onPress: () => navigation.navigate("Login") }
      ]); */
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Token expirado ou inválido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <Text style={styles.subtitle}>
        Cole o código recebido no e-mail e defina sua nova senha de acesso.
      </Text>

      <Input
        label="Código (Token)"
        value={token}
        onChangeText={setToken}
        placeholder="Cole o token aqui"
        errorMessage={error && token === "" ? error : null}
      />
      <Input
        label="Nova Senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        errorMessage={error && novaSenha === "" ? error : null}
      />
      <Input
        label="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        errorMessage={error && confirmarSenha === "" ? error : null}
      />

      <Button title={"Confirmar"} onPress={handleReset} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 25, paddingTop: 60 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
});
