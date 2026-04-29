import api from './ibgeApi';

export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

export interface Cidade {
  id: number;
  nome: string;
}

export async function consultarEstados(): Promise<Estado[]> {
    try {
        const response = await api.get('/?orderBy=nome');
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar os estados:', error);
        throw new Error('Não foi possível consultar os estados. Tente novamente mais tarde.');
    }
}

export async function consultarCidades(estadoSigla: string): Promise<Cidade[]> {
    try {
        const response = await api.get(`/${estadoSigla}/municipios`);
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar as cidades:', error);
        throw new Error('Não foi possível consultar as cidades. Tente novamente mais tarde.');
    }
}