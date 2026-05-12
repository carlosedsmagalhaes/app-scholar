import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator, ViewStyle } from 'react-native';
import { COLORS } from '../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export function Button ({ title, style, ...rest }: ButtonProps) {
  const { loading } = rest as any;
  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.7} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
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