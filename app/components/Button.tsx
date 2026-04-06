import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { COLORS } from '../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button ({ title, style, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }
});