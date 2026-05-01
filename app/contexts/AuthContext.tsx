import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import serverApi from "../services/serverApi";

interface User {
  id: number;
  email: string;
  perfil: "ADMIN" | "PROFESSOR" | "ALUNO";
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storageUser = await AsyncStorage.getItem("@SGE:user");
        const storageToken = await AsyncStorage.getItem("@SGE:token");

        if (storageUser && storageToken) {
          setUser(JSON.parse(storageUser));
        }
      } catch (err) {
        console.error("Erro ao carregar dados do AsyncStorage:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const response = await serverApi.post("/api/login", {
        email,
        senha: password,
      });
      const { usuario:user, token } = response.data;
      console.log("Login bem-sucedido:", user);


      await AsyncStorage.setItem("@SGE:user", JSON.stringify(user));
      await AsyncStorage.setItem("@SGE:token", token);
      await AsyncStorage.setItem("@SGE:perfil", user.perfil);

      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Falha ao fazer login. Verifique suas credenciais.");
    }
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
