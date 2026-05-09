import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, TouchableOpacity } from "react-native";
import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { ListAluno } from "../screens/ListAluno";
import { Aluno } from "../screens/Aluno";
import { ListProfessor } from "../screens/ListProfessor";
import { Professor } from "../screens/Professor";
import { ListDisciplina } from "../screens/ListDisciplina";
import { Disciplina } from "../screens/Disciplina";
import { ListBoletim } from "../screens/ListBoletim";
import { LancamentoNota } from "../screens/LancamentoNota";
import { ForgotPassword } from "../screens/ForgotPassword";
import { ResetPassword } from "../screens/ResetPassword";
import { RootStackParamList } from "./types";
import { useAuth } from "../contexts/AuthContext";
import { COLORS } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  const { signed, loading, signOut } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () =>
            signed && (
              <TouchableOpacity onPress={signOut}>
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            ),
        }}
      >
        {!signed ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ title: "Recuperar Senha" }}
            />

            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ title: "Redefinir Senha" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ title: "App Scholar" }}
            />
            <Stack.Screen
              name="ListAluno"
              component={ListAluno}
              options={{ title: "Alunos" }}
            />
            <Stack.Screen
              name="ListProfessor"
              component={ListProfessor}
              options={{ title: "Professores" }}
            />
            <Stack.Screen
              name="ListDisciplina"
              component={ListDisciplina}
              options={{ title: "Disciplinas" }}
            />
            <Stack.Screen
              name="Aluno"
              component={Aluno}
              options={({ route }) => ({
                title: route.params?.id ? "Editar Aluno" : "Cadastro de Aluno",
              })}
            />
            <Stack.Screen
              name="Professor"
              component={Professor}
              options={({ route }) => ({
                title: route.params?.id
                  ? "Editar Professor"
                  : "Cadastro de Professor",
              })}
            />
            <Stack.Screen
              name="Disciplina"
              component={Disciplina}
              options={({ route }) => ({
                title: route.params?.id
                  ? "Editar Disciplina"
                  : "Cadastro de Disciplina",
              })}
            />
            <Stack.Screen
              name="ListBoletim"
              component={ListBoletim}
              options={{ title: "Boletim" }}
            />
            <Stack.Screen
              name="LancamentoNota"
              component={LancamentoNota}
              options={({ route }) => ({
                title: route.params?.nota
                  ? "Editar Nota"
                  : "Lançamento de Nota",
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
