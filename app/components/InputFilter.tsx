import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";

interface InputFilterProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

export function InputFilter({ placeholder, onChangeText }: InputFilterProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="search"
        size={22}
        color={COLORS.textSecondary}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#999"}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 8,
    height: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
  },
});
