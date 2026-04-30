import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { COLORS } from "../styles/theme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import serverApi from "../services/serverApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  async function handleLogin() {
    try {
      if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
      }

      setError(null);
      const response = await serverApi.post("/api/login", { email, senha: password });
      const { token, user } = response.data;
      await AsyncStorage.setItem("@SGE:token", token);
      await AsyncStorage.setItem('@SGE:perfil', user.perfil);
      await AsyncStorage.setItem("@SGE:user", JSON.stringify(user));
      navigation.replace("Dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert(
        "Erro",
        "Falha ao fazer login. Verifique suas credenciais e tente novamente.",
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Scholar</Text>
      <Input
        label="Usuário ou E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        errorMessage={error && email === "" ? error : null}
      />
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        errorMessage={error && password === "" ? error : null}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: COLORS.primary,
  },
});
