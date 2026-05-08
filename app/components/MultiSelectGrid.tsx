import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";

interface MultiSelectGridProps {
  label: string;
  selectedItems: { label: string; value: string }[];
  onRemove: (value: string) => void;
  onAddPress: () => void;
}

export function MultiSelectGrid({ 
  label, 
  selectedItems, 
  onRemove, 
  onAddPress 
}: MultiSelectGridProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
      </View>

      {selectedItems.map((item) => (
        <View key={item.value} style={styles.itemRow}>
          <View style={styles.itemContent}>
            <Text style={styles.itemText}>{item.label}</Text>
          </View>
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => onRemove(item.value)}
          >
            <MaterialIcons name="close" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={onAddPress}
      >
        <MaterialIcons name="add" size={24} color={COLORS.primary} />
        <Text style={styles.addButtonText}>Adicionar {label.toLowerCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginLeft: 8 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 15, 
    borderWidth: 1,
    borderColor: '#e0eef0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  itemText: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  removeButton: {
    width: 45,
    height: 45,
    backgroundColor: '#f8e8e8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButton: {
    height: 55,
    borderWidth: 1.5,
    borderColor: '#b2d8d8',
    borderStyle: 'dashed',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  }
});