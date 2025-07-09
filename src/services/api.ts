import axios from 'axios';
import { CandidateDataMatching } from '@/types/candidates';
import { VagaDetails } from '@/types/vagas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.grupo-ever-rmf.com/api/v1/';

console.log('NEXT_PUBLIC_API_BASE_URL:', API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchDataVagas = async (offset: number, limit: number) => {
  try {
    const response = await api.get('vagas/list', {
      params: { offset, limit }
    });
    console.log('fetchDataVagas API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching data:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching data:', error);
    }
    throw error;
  }
};


export const fetchDataVagasById = async (id: string) => {
  try {
    const response = await api.get(`vagas/details/${id}`);
    console.log('fetchDataVagasById API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching data:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching data:', error);
    }
    throw error;
  }
};


export const createVaga = async (vagaData: unknown) => {
  try {
    const response = await api.post('vagas/create', vagaData);
    console.log('createVaga API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error creating vaga:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error creating vaga:', error);
    }
    throw error;
  }
};

export const fetchDataCandidatos = async (offset: number, limit: number) => {
  try {
    const response = await api.get('candidatos/list', {
      params: { offset, limit }
    });
    console.log('fetchDataCandidatos API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching candidatos:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching candidatos:', error);
    }
    throw error;
  }
};

export const fetchDataCandidatosById = async (id: string) => {
  try {
    const response = await api.get(`candidatos/details/${id}`);
    console.log('fetchDataCandidatosById API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching candidato by ID:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching candidato by ID:', error);
    }
    throw error;
  }
};


export const createCandidato = async (candidatoData: unknown) => {
  try {
    const response = await api.post('candidatos/create', candidatoData);
    console.log('createCandidato API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error creating candidato:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error creating candidato:', error);
    }
    throw error;
  }
}

export const buscaVagasParaCandidato = async (candidatoData: unknown) => {
  try {
    const response = await api.post('inferencias/recommendationModel/predict', candidatoData);
    console.log('buscaVagasParaCandidato API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching vagas for candidato:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching vagas for candidato:', error);
    }
    throw error;
  }
}

export const analisaMatchEntreCandidatoEVaga = async (candidatoData: CandidateDataMatching, codigo_vaga: string) => {
  // Busca informações de vagas pela função de vagas detalhes e concatena com os dados do candidato
  const vagaResponse = await fetchDataVagasById(codigo_vaga);
  const vagaDetails: VagaDetails = vagaResponse.data ? vagaResponse.data : vagaResponse;
  console.log('vagaDetails para o match:', vagaDetails?.perfil?.vaga_especifica_para_pcd);
  const payload = {
    sexo: candidatoData.sexo || '',
    estado_civil: candidatoData.estado_civil || '',
    pcd: candidatoData.pcd || '',
    vaga_especifica_para_pcd: vagaDetails.perfil.vaga_especifica_para_pcd || '',
    pais_vaga: vagaDetails.perfil.pais || '',
    nivel_academico: candidatoData.nivel_academico || '',
    tipo_contratacao: vagaDetails.infos_basicas.tipo_contratacao || '',
    cidade: candidatoData.cidade || '',
    cidade_vaga: vagaDetails.perfil.cidade || '',
    nivel_profissional: candidatoData.nivel_profissional || '',
    nivel_profissional_vaga: vagaDetails.perfil.nivel_profissional || '',
    ingles: candidatoData.ingles || '',
    espanhol: candidatoData.espanhol || '',
    outros_idiomas: candidatoData.outros_idiomas || '',
    nivel_ingles_vaga: vagaDetails.perfil.nivel_ingles || '',
    nivel_espanhol_vaga: vagaDetails.perfil.nivel_espanhol || '',
    titulo_profissional: candidatoData.titulo_profissional || '',
    titulo_vaga: vagaDetails.infos_basicas.titulo_vaga || '',
    conhecimentos_tecnicos: candidatoData.conhecimentos_tecnicos || '',
    certificacoes: candidatoData.certificacoes || '',
    outras_certificacoes: candidatoData.outras_certificacoes || '',
    area_atuacao: candidatoData.area_atuacao || '',
    areas_atuacao_vaga: vagaDetails.perfil.areas_atuacao || '',
    competencia_tecnicas_e_comportamentais: vagaDetails.perfil.competencia_tecnicas_e_comportamentais || '',
    cv_candidato: candidatoData.cv_candidato || ''
  };

  console.log('Payload para analisaMatchEntreCandidatoEVaga:', payload);

  try {
    const response = await api.post('inferencias/matchModel/predict', payload);
    console.log('analisaMatchEntreCandidatoEVaga API Response:', response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error analyzing match between candidate and vaga:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error analyzing match between candidate and vaga:', error);
    }
    throw error;
  }
};


export const fetchDataAnaliseProcessos = async (offset: number, limit: number) => {
  try {
    const response = await api.get('prospects/grouped-list', {
      params: { offset, limit }
    });
    console.log('fetchDataAnaliseProcessos API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching analise processos:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error fetching analise processos:', error);
    }
    throw error;
  }
};


export const atualizaProspect = async (prospectData: unknown) => {
  try {
    const response = await api.put('prospects/update-candidate', prospectData);
    console.log('atualizaProspect API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error updating prospect:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error updating prospect:', error);
    }
    throw error;
  }
}