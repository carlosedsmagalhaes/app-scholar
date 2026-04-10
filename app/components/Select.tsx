import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "../styles/theme";

interface SelectProps {
  label: string;
  data: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
}

export function Select({
  label,
  data,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  errorMessage,
}: SelectProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: COLORS.primary },
          errorMessage ? { borderColor: COLORS.error } : null,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : ""}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  dropdown: {
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
  },
});
