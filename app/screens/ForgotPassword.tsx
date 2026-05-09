import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { COLORS } from "../styles/theme";
import serverApi from "../services/serverApi";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  async function handleSendEmail() {
    if (!email) {
      setError("Por favor, informe seu e-mail cadastrado.");
      Alert.alert("Atenção", "Informe seu e-mail cadastrado.");
      return;
    }

    try {
      setLoading(true);
      await serverApi.post("/api/forgot-password", { email });
      
      /* Alert.alert(
        "Verifique seu e-mail",
        "Enviamos um código de recuperação para você.",
        [{ text: "OK", onPress: () => navigation.navigate("ResetPassword") }]
      ); */
      navigation.navigate("ResetPassword");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível processar a solicitação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Enviaremos um código para o seu e-mail para que você possa cadastrar uma nova senha.
      </Text>

      <Input
        label="E-mail"
        placeholder="Digite o email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        errorMessage={error && email === "" ? error : null}
      />

      <Button 
        title={"Confirmar"} 
        onPress={handleSendEmail} 
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 25, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: COLORS.text, marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30, lineHeight: 22 },
}); 