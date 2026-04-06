import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { COLORS } from '../styles/theme';

interface InputProps extends TextInputProps {
  label: string;
  errorMessage?: string | null;
}

export function Input ({ label, errorMessage, ...rest }: InputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[styles.input, errorMessage ? styles.inputError : null]} placeholderTextColor="#999"  {...rest}/>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: 16 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  inputError: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 5 }
});