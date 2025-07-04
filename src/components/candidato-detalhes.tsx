'use client'
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface CandidateDetails {
  infos_basicas: {
    codigo_profissional: number;
    telefone: string;
    objetivo_profissional: string;
    data_atualizacao: string;
    local: string;
    nome: string;
    email: string;
    telefone_recado: string;
    data_criacao: string;
    inserido_por: string;
    sabendo_de_nos_por: string;
  };
  informacoes_pessoais: {
    codigo_profissional: number;
    nome: string;
    telefone_celular: string;
    telefone_recado: string;
    sexo: string;
    pcd: string;
    skype: string;
    facebook: string;
    email_secundario: string;
    cpf: string;
    id: number;
    data_nascimento: string;
    estado_civil: string;
    endereco: string;
    url_linkedin: string;
    fonte_indicacao: string;
    data_aceite: string;
  };
  informacoes_profissionais: {
    codigo_profissional: number;
    titulo_profissional: string;
    conhecimentos_tecnicos: string;
    outras_certificacoes: string;
    nivel_profissional: string;
    area_atuacao: string;
    id: number;
    certificacoes: string;
    remuneracao: string;
  };
  formacao_e_idiomas: {
    nivel_ingles: string;
    id: number;
    outro_idioma: string;
    codigo_profissional: number;
    nivel_academico: string;
    nivel_espanhol: string;
  };
  curriculos: {
    id: number;
    codigo_profissional: number;
    cv_pt: string;
  };
}

interface CandidateDetalhesProps {
  details: CandidateDetails;
}

export default function CandidatoDetalhes({ details }: CandidateDetalhesProps) {
  const router = useRouter();
  const { infos_basicas, informacoes_pessoais, informacoes_profissionais, formacao_e_idiomas, curriculos } = details;

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Detalhes do Candidato: {infos_basicas.nome}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Código Profissional:</strong> {infos_basicas.codigo_profissional}</li>
            <li><strong>Telefone:</strong> {infos_basicas.telefone}</li>
            <li><strong>Objetivo Profissional:</strong> {infos_basicas.objetivo_profissional}</li>
            <li><strong>Data Atualização:</strong> {infos_basicas.data_atualizacao}</li>
            <li><strong>Local:</strong> {infos_basicas.local}</li>
            <li><strong>Email:</strong> {infos_basicas.email}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Informações Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Data de Nascimento:</strong> {informacoes_pessoais.data_nascimento}</li>
            <li><strong>Estado Civil:</strong> {informacoes_pessoais.estado_civil}</li>
            <li><strong>Endereço:</strong> {informacoes_pessoais.endereco}</li>
            <li><strong>Fonte de Indicação:</strong> {informacoes_pessoais.fonte_indicacao}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Informações Profissionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Profissionais</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Título Profissional:</strong> {informacoes_profissionais.titulo_profissional}</li>
            <li><strong>Conhecimentos Técnicos:</strong> {informacoes_profissionais.conhecimentos_tecnicos}</li>
            <li><strong>Remuneração:</strong> {informacoes_profissionais.remuneracao}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Formação e Idiomas */}
      <Card>
        <CardHeader>
          <CardTitle>Formação e Idiomas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Nível Acadêmico:</strong> {formacao_e_idiomas.nivel_academico}</li>
            <li><strong>Nível de Inglês:</strong> {formacao_e_idiomas.nivel_ingles}</li>
            <li><strong>Nível de Espanhol:</strong> {formacao_e_idiomas.nivel_espanhol}</li>
            <li><strong>Outro Idioma:</strong> {formacao_e_idiomas.outro_idioma}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Currículo */}
      <Card>
        <CardHeader>
          <CardTitle>Currículo (CV - PT)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{curriculos.cv_pt}</p>
        </CardContent>
      </Card>

      <Button onClick={() => router.back()}>Voltar</Button>
    </div>
  );
}