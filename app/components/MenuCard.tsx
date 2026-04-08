import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

interface MenuCardProps {
  title: string;
  onPress: () => void;
}

export function MenuCard({ title, onPress }: MenuCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 80,   
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start', 
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 18, 
  }
});
