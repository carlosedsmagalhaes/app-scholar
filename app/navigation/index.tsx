import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { ListAluno } from "../screens/ListAluno";
import { Aluno } from "../screens/Aluno";
import { ListProfessor } from "../screens/ListProfessor";
import { Professor } from "../screens/Professor";
import { LisDisciplina } from "../screens/LisDisciplina";
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
          name="ListAluno"
          component={ListAluno}
          options={{ title: "Alunos" }}
        />
        <Stack.Screen 
          name="ListProfessor" 
          component={ListProfessor} 
          options={{ title: 'Professores' }} 
        />
        <Stack.Screen
          name="LisDisciplina"
          component={LisDisciplina}
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
          options={({route}) => ({ title: route.params?.id ? 'Editar Professor' : 'Cadastro de Professor' })} 
        />
        <Stack.Screen 
          name="Disciplina" 
          component={Disciplina} 
          options={({ route }) => ({
            title: route.params?.id ? "Editar Disciplina" : "Cadastro de Disciplina",
          })}
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
