import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { COLORS } from '../styles/theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    function handleLogin() {
        if (!email || !password) {
            setError('Pro favor, preencha todos os campos.');
            return;
        }

        setError(null);
        console.log(`Login realizado com: ${email} - ${password}`);
        Alert.alert("Sucesso", "Login simulado com sucesso!");
        navigation.replace("Dashboard");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>App Scholar</Text>
            <Input label="Usuário ou E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" errorMessage={error && email === '' ? error : null}/>
            <Input label="Senha" placeholder="Digite sua senha" value={password} onChangeText={setPassword} secureTextEntry={true} errorMessage={error && password === '' ? error : null}/>
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: COLORS.primary,
  }
});