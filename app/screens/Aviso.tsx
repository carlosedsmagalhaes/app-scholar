import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { COLORS } from "../styles/theme";
import serverApi from "../services/serverApi";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Aviso() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState("INFORMATIVO");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listaPrioridades = [
        { label: "Informativo", value: "INFORMATIVO" },
        { label: "Importante", value: "IMPORTANTE" },
        { label: "Urgente", value: "URGENTE" }
    ];

    async function handleSalvar() {
        if (!titulo || !descricao) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            setLoading(true);

            const response = await serverApi.post("/api/avisos", {
                titulo,
                descricao,
                prioridade
            });

            if (response.data && response.data.id) {
                await AsyncStorage.setItem(`@criado_por_mim_${response.data.id}`, "true");
            }

            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar o aviso.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Input
                label="Título"
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Digite o título principal"
                errorMessage={error && titulo === "" ? error : null}

                editable={!loading}
            />

            <Input
                label="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Digite os detalhes do comunicado"
                errorMessage={error && descricao === "" ? error : null}
                editable={!loading}
                multiline
            />

            <Select
                label="Grau de Prioridade"
                value={prioridade}
                onChange={setPrioridade}
                data={listaPrioridades}
                errorMessage={error && prioridade === "" ? error : undefined}
            />

            <Button
                title={"Confirmar"}
                onPress={handleSalvar}
                loading={loading}
                disabled={loading}
            />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 20,
        paddingBottom: 100
    }
});