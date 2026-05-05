import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export function EmptyCard({ message }: { message: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 100,   
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  message: {
    color: COLORS.text,
    fontSize: 16, 
    textAlign: 'center',
    fontWeight: 'bold',
  }
});