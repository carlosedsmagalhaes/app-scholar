import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

interface BoletimCardProps {
  disciplina: string;
  nota1: string;
  nota2: string;
}

export function BoletimCard({ disciplina, nota1, nota2 }: BoletimCardProps) {
  const n1 = parseFloat(nota1);
  const n2 = parseFloat(nota2);
  const media = (n1 + n2) / 2;
  const isAprovado = media >= 6;

  const statusColor = isAprovado ? COLORS.success : COLORS.error;
  const statusBg = isAprovado ? COLORS.successLight : COLORS.errorLight;
  const statusText = isAprovado ? "Aprovado" : "Reprovado";

  return (
    <View style={[styles.container, { borderLeftColor: statusColor }]}>
      <View style={styles.header}>
        <Text style={styles.disciplina}>{disciplina}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusText}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.notaBlock}>
          <Text style={styles.notaLabel}>Nota 1</Text>
          <Text style={styles.notaValue}>{nota1}</Text>
        </View>
        <View style={styles.notaBlock}>
          <Text style={styles.notaLabel}>Nota 2</Text>
          <Text style={styles.notaValue}>{nota2}</Text>
        </View>
        <View style={[styles.notaBlock, styles.mediaBlock]}>
          <Text style={styles.notaLabel}>Média</Text>
          <Text style={[styles.mediaValue, { color: COLORS.primary }]}>
            {media.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  disciplina: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  notaBlock: {
    alignItems: "center",
    flex: 1, // Divide o espaço igualmente
  },
  mediaBlock: {
    alignItems: "flex-end",
  },
  notaLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  notaValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  mediaValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
