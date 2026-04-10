import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { Aluno } from "../screens/Aluno";
import { Professor } from "../screens/Professor";
import { Disciplina } from "../screens/Disciplina";
import { Boletim } from "../screens/Boletim";
import { RootStackParamList } from "./types";
import { COLORS } from "../styles/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ title: 'App Scholar' }} 
        />
        <Stack.Screen 
          name="Aluno" 
          component={Aluno} 
          options={{ title: 'Cadastro de Aluno' }} 
        />
        <Stack.Screen 
          name="Professor" 
          component={Professor} 
          options={{ title: 'Cadastro de Professor' }} 
        />
        <Stack.Screen 
          name="Disciplina" 
          component={Disciplina} 
          options={{ title: 'Cadastro de Disciplina' }} 
        />
        <Stack.Screen 
          name="Boletim" 
          component={Boletim} 
          options={{ title: 'Boletim' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
