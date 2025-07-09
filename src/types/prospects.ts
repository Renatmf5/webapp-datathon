export interface Prospect {
  id: number;
  nome: string;
  codigo_candidato: number;
  data_candidatura: string;
  comentario: string;
  codigo_vaga: number;
  titulo_vaga: string;
  situacao_candidato: string;
  ultima_atualizacao: string;
  recrutador: string;
}

export type ProspectsGroup = {
  codigo_vaga: number
  titulo_vaga: string
  modalidade: string
  prospects: Prospect[]
}