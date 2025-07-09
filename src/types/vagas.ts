
export interface InfosBasicas {
  data_requisicao: string | null;
  requisitante: string;
  superior_imediato: string;
  codigo_vaga: number;
  analista_responsavel: string;
  nome: string;
  limite_esperado_para_contratacao: string;
  tipo_contratacao: string;
  telefone: string;
  titulo_vaga: string;
  prazo_contratacao: string;
  vaga_sap: string;
  objetivo_vaga: string;
  cliente: string;
  prioridade_vaga: string;
  solicitante_cliente: string;
  origem_vaga: string;
  empresa_divisao: string;
}

export interface Perfil {
  cidade: string;
  nivel_academico: string;
  viagens_requeridas: string;
  bairro: string;
  nivel_ingles: string;
  equipamentos_necessarios: string | null;
  regiao: string;
  nivel_espanhol: string;
  local_trabalho: string;
  outro_idioma: string;
  codigo_vaga: number;
  vaga_especifica_para_pcd: string;
  areas_atuacao: string;
  id: number;
  faixa_etaria: string;
  principais_atividades: string;
  pais: string;
  horario_trabalho: string;
  competencia_tecnicas_e_comportamentais: string;
  estado: string;
  nivel_profissional: string | null;
  demais_observacoes: string;
}

export interface Beneficios {
  id: number;
  valor_compra_1: string;
  valor_venda: string;
  codigo_vaga: number;
  valor_compra_2: string;
}

export interface VagaDetails {
  infos_basicas: InfosBasicas;
  perfil: Perfil;
  beneficios: Beneficios;
}
