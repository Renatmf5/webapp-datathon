/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CandidatoDetalhes, { CandidateDetails } from '@/components/candidato-detalhes';
import {
  fetchDataCandidatosById,
  buscaVagasParaCandidato,
  analisaMatchEntreCandidatoEVaga
} from '../../../../../services/api';
import { CandidateDataMatching } from '@/types/candidates';

export default function CandidatoDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState<CandidateDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isRecoLoading, setIsRecoLoading] = useState<boolean>(false);
  const [recoError, setRecoError] = useState<string | null>(null);
  // Estado para armazenar os resultados do match por código de vaga
  const [matchResults, setMatchResults] = useState<{ [codigo_vaga: string]: number }>({});

  // Função para chave de cache das recomendações, baseada no id do candidato
  const getCacheKey = (idStr: string) => `recommendations-${idStr}`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Se id for um array, pega o primeiro elemento
        const idStr = Array.isArray(id) ? id[0] : id!;
        const result = await fetchDataCandidatosById(idStr);
        console.log('fetchDataCandidatosById API Response:', result);
        setDetails(result);

        // Tenta carregar recomendações cacheadas para este candidato
        const cached = localStorage.getItem(getCacheKey(idStr));
        if (cached) {
          setRecommendations(JSON.parse(cached));
        }
        setIsLoading(false);
      } catch (err) {
        let errorMessage = 'Erro desconhecido';
        if (err instanceof Error) {
          errorMessage = err.message.includes('400') ? 'Usuário não encontrado' : err.message;
        }
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleGenerateRecommendations = async () => {
    if (!details) return;
    setIsRecoLoading(true);
    setRecoError(null);

    // Mapeando os campos esperados no payload para busca de vagas
    const payload = {
      titulo_profissional: details.informacoes_profissionais.titulo_profissional || '',
      conhecimentos_tecnicos: details.informacoes_profissionais.conhecimentos_tecnicos || '',
      certificacoes: details.informacoes_profissionais.certificacoes || '',
      outras_certificacoes: details.informacoes_profissionais.outras_certificacoes || '',
      cidade: details.infos_basicas.local || '',
      ingles: details.formacao_e_idiomas.nivel_ingles || '',
      espanhol: details.formacao_e_idiomas.nivel_espanhol || '',
      outros_idiomas: details.formacao_e_idiomas.outro_idioma || '',
      pcd: details.informacoes_pessoais.pcd || '',
      cv_candidato: details.curriculos.cv_pt || ''
    };

    console.log('Payload para buscaVagasParaCandidato:', payload);

    try {
      const response = await buscaVagasParaCandidato(payload);
      console.log('buscaVagasParaCandidato API Response:', response);
      // Seleciona os primeiros 5 resultados para exibição
      const recos = response.data.slice(0, 5);
      setRecommendations(recos);
      // Armazenando no cache (localStorage) para persistir mesmo ao navegar para outra página
      const idStr = Array.isArray(id) ? id[0] : id!;
      localStorage.setItem(getCacheKey(idStr), JSON.stringify(recos));
    } catch (err) {
      let errorMessage = 'Erro ao buscar recomendações';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setRecoError(errorMessage);
    } finally {
      setIsRecoLoading(false);
    }
  };

  // Função para analisar match entre candidato e vaga e exibir a probabilidade no card
  const handleAnalyzeMatch = async (codigo_vaga: string) => {
    console.log('Analisando match para código de vaga:', codigo_vaga);
    if (!details) return;
    const candidateData: CandidateDataMatching = {
      sexo: details.informacoes_pessoais.sexo || '',
      estado_civil: details.informacoes_pessoais.estado_civil || '',
      pcd: details.informacoes_pessoais.pcd || '',
      nivel_academico: details.formacao_e_idiomas.nivel_academico || '',
      cidade: details.infos_basicas.local || '',
      nivel_profissional: details.informacoes_profissionais.nivel_profissional || '',
      ingles: details.formacao_e_idiomas.nivel_ingles || '',
      espanhol: details.formacao_e_idiomas.nivel_espanhol || '',
      outros_idiomas: details.formacao_e_idiomas.outro_idioma || '',
      titulo_profissional: details.informacoes_profissionais.titulo_profissional || '',
      conhecimentos_tecnicos: details.informacoes_profissionais.conhecimentos_tecnicos || '',
      certificacoes: details.informacoes_profissionais.certificacoes || '',
      outras_certificacoes: details.informacoes_profissionais.outras_certificacoes || '',
      area_atuacao: details.informacoes_profissionais.area_atuacao || '',
      cv_candidato: details.curriculos.cv_pt || ''
    };

    try {
      const matchResult = await analisaMatchEntreCandidatoEVaga(candidateData, codigo_vaga);
      console.log('Resultado do match:', matchResult);
      // Armazena o valor do match (match_probability) para este código de vaga
      setMatchResults(prev => ({ ...prev, [codigo_vaga]: matchResult.match_probability }));
    } catch (error) {
      console.error('Erro ao analisar match:', error);
    }
  };

  if (isLoading) {
    return <p>Carregando detalhes do candidato...</p>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <p className="text-red-500">Erro: {error}</p>
          <Link href="/dashboard/candidatos" passHref>
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!details) {
    return <p>Nenhuma informação encontrada para o Candidato.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/dashboard/candidatos" passHref>
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>

      <CandidatoDetalhes details={details} />

      <div className="mt-8 flex flex-col items-center">
        <Button onClick={handleGenerateRecommendations} disabled={isRecoLoading}>
          {isRecoLoading ? 'Carregando recomendações...' : 'Gerar recomendação de vagas'}
        </Button>
        <p className="mt-4 text-center">
          Segue abaixo até 5 recomendações que fazem mais sentido para esse perfil
        </p>
      </div>

      {recoError && <p className="text-red-500 mt-2 text-center">Erro: {recoError}</p>}

      {recommendations.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4">
          {recommendations.map((vaga, index) => (
            <div key={index} className="border rounded p-4 shadow">
              <h3 className="text-xl font-bold mb-2">{vaga.titulo_vaga}</h3>
              <p className="mb-2"><strong>Código da Vaga:</strong> {vaga.codigo_vaga}</p>
              <p className="mb-2"><strong>Competências:</strong> {vaga.competencia_tecnicas_e_comportamentais}</p>
              <p className="mb-4"><strong>Áreas de atuação:</strong> {vaga.areas_atuacao_vaga}</p>
              <div className="flex justify-between">
                <Link href={`/dashboard/vagas/${vaga.codigo_vaga}`} passHref>
                  <Button variant="outline">Ver detalhes</Button>
                </Link>
                <Button variant="outline" onClick={() => handleAnalyzeMatch(vaga.codigo_vaga)}>
                  Analisar
                </Button>
                <Button variant="outline">Candidatar</Button>
              </div>
              {matchResults[vaga.codigo_vaga] !== undefined && (
                <p className="mt-2 text-center">
                  Probabilidade de aprovação: {matchResults[vaga.codigo_vaga]}%
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}