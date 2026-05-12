import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

interface LoaderProps {
  size?: number | "small" | "large";
  color?: string;
  style?: any;
}

export function Loader({ size = "large", color = COLORS.primary, style }: LoaderProps) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
