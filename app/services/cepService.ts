import api from './api';

export async function consultarCep(cep: string) {
    const sanitizedCep = cep.replace(/\D/g, '');

    if (sanitizedCep.length !== 8) {
        throw new Error('CEP inválido. O CEP deve conter 8 dígitos.');
    }

    try {
        const response = await api.get(`/${sanitizedCep}/json/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        throw new Error('Não foi possível consultar o CEP. Tente novamente mais tarde.');
    }
}