import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const serverApi = axios.create({
  baseURL: "http://192.168.18.6:3333",
  timeout: 5000,
});

serverApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@SGE:token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

serverApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("@SGE:token");
      await AsyncStorage.removeItem("@SGE:user");
      Alert.alert("Sessão expirada. Por favor, faça login novamente.");
    }
    return Promise.reject(error);
  },
);

export default serverApi;
