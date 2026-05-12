import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Alert, Modal, View, Text, TouchableOpacity } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { MultiSelectGrid } from "../components/MultiSelectGrid";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useRoute, RouteProp } from "@react-navigation/native";
import serverApi from "../services/serverApi";
import type { Disciplina as IDisciplina } from "../types/index";
import { calculateSemestre } from "../utils/calculateSemestre";

const SEMESTRE_DADOS = calculateSemestre(10);

export function Disciplina() {
  const route = useRoute<RouteProp<RootStackParamList, "Disciplina">>();
  const { id } = route.params || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [semestre, setSemestre] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Estados para a seleção multipla de Professores
  const [professorOpcoes, setProfessorOpcoes] = useState<{ label: string; value: string }[]>([]);
  const [professoresSelecionados, setProfessoresSelecionados] = useState<{ label: string; value: string }[]>([]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cursos, setCursos] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [resProf, resCursos] = await Promise.all([
          serverApi.get("/api/professores"),
          serverApi.get("/api/cursos"),
        ]);

        setProfessorOpcoes(resProf.data.map((p: any) => ({ label: p.nome, value: String(p.id) })));
        setCursos(resCursos.data.map((c: any) => ({ label: c.nome, value: String(c.id) })));

        if (id) {
          const resDisc = await serverApi.get<IDisciplina>(`/api/disciplinas/${id}`);
          const d = resDisc.data;
          setNome(d.nome);
          setCargaHoraria(String(d.carga_horaria));
          setCursoId(String(d.cursos[0].curso?.id || ""));
          setSemestre(String(d.semestre));
          
          // Mapeia os professores que já vêm do banco para o formato do grid
          const profsMapped = d.professores.map((pd: any) => ({
            label: pd.professor.nome,
            value: String(pd.professor.id)
          }));
          setProfessoresSelecionados(profsMapped);
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, [id]);

  const handleAddProfessor = (profId: string) => {
    const jaExiste = professoresSelecionados.find(p => p.value === profId);
    if (!jaExiste) {
      const prof = professorOpcoes.find(p => p.value === profId);
      if (prof) setProfessoresSelecionados([...professoresSelecionados, prof]);
    }
    setIsModalVisible(false);
  };

  const handleRemoveProfessor = (profId: string) => {
    setProfessoresSelecionados(prev => prev.filter(p => p.value !== profId));
  };

  async function handleSalvar() {
    if (!nome || !cargaHoraria || !cursoId || !semestre || professoresSelecionados.length === 0) {
      Alert.alert("Atenção", "Preencha todos os campos e adicione ao menos um professor.");
      setError("Preencha todos os campos e adicione ao menos um professor.");
      return;
    }

    const payload = {
      nome,
      cargaHoraria: Number(cargaHoraria),
      cursoId: Number(cursoId),
      semestre: Number(semestre),
      professorIds: professoresSelecionados.map(p => Number(p.value)) 
    };

    try {
      setLoading(true);
      if (id) {
        await serverApi.put(`/api/disciplinas/${id}`, payload);
      } else {
        await serverApi.post("/api/disciplinas", payload);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a disciplina.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Input label="Nome da Disciplina" value={nome} onChangeText={setNome} placeholder="Ex: Programação Mobile" errorMessage={error && nome === "" ? error : null} />
      
      <Input label="Carga Horária (horas)" value={cargaHoraria} onChangeText={setCargaHoraria} keyboardType="numeric" placeholder="Ex: 80" errorMessage={error && cargaHoraria === "" ? error : undefined} />

      <Select label="Curso" data={cursos} value={cursoId} onChange={setCursoId} placeholder="Selecione o curso" errorMessage={error && cursoId === "" ? error : undefined} />

      <Select label="Semestre" data={SEMESTRE_DADOS} value={semestre} onChange={setSemestre} placeholder="Selecione o semestre"  errorMessage={error && semestre === "" ? error : undefined} />

      <MultiSelectGrid 
        label="Professores"
        selectedItems={professoresSelecionados}
        onRemove={handleRemoveProfessor}
        onAddPress={() => setIsModalVisible(true)}
      />

      <Button title={"Confirmar"} onPress={handleSalvar} disabled={loading} />

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecionar Professor</Text>
            
            <Select 
              label=""
              data={professorOpcoes}
              value=""
              onChange={handleAddProfessor}
              placeholder="Clique para selecionar"
            />

            <TouchableOpacity 
              onPress={() => setIsModalVisible(false)} 
              style={styles.closeModal}
            >
              <Text style={styles.closeModalText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },
  closeModal: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
  },
  closeModalText: {
    color: COLORS.error,
    fontWeight: "600",
  },
});