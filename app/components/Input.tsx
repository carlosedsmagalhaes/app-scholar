import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons'; 

interface InputProps extends TextInputProps {
  label: string;
  errorMessage?: string | null;
  nextRef?: React.RefObject<TextInput | null>;
}

export const Input = React.forwardRef<TextInput, InputProps>(function Input(
  { label, errorMessage, secureTextEntry, nextRef, returnKeyType, blurOnSubmit, onSubmitEditing, ...rest },
  ref,
) {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const isPasswordInput = secureTextEntry;
  const shouldMoveToNext = !!nextRef?.current;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            errorMessage ? styles.inputError : null,
            isPasswordInput ? { paddingRight: 45 } : null
          ]}
          placeholderTextColor="#999"
          secureTextEntry={isPasswordInput ? passwordHidden : false}
          returnKeyType={returnKeyType ?? (shouldMoveToNext ? 'next' : 'done')}
          blurOnSubmit={blurOnSubmit ?? !shouldMoveToNext}
          onSubmitEditing={(event) => {
            onSubmitEditing?.(event);
            nextRef?.current?.focus();
          }}
          {...rest}
        />

        {isPasswordInput && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordHidden(!passwordHidden)}
          >
            <Ionicons
              name={passwordHidden ? "eye" : "eye-off"}
              size={22}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  inputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    color: '#000', 
  },
  inputError: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 5 },
  eyeButton: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  }
});