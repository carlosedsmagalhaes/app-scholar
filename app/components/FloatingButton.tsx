import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";

interface FloatingButtonProps {
  onPress: () => void;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  style?: ViewStyle;
}

export function FloatingButton({ 
  onPress, 
  iconName = "add", 
  style 
}: FloatingButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.fab, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialIcons name={iconName} size={30} color={COLORS.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});