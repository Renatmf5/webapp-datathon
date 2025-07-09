'use client';

import { useEffect, useState } from 'react';
import { DataTableDemo } from '@/components/data-table';
import { fetchDataAnaliseProcessos } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ProspectsGroup } from '@/types/prospects';

interface AnaliseProcessosResponse {
  total_grupos: number;
  offset: number;
  limit: number;
  data: ProspectsGroup[];
}

export default function AnaliseProcessosPage() {
  // Armazena os grupos acumulados
  const [accumulatedGroups, setAccumulatedGroups] = useState<ProspectsGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Controle do offset atual
  const [offset, setOffset] = useState<number>(0);
  // Defina o limite (por exemplo, 10)
  const limit = 10;
  // Se a última requisição retornar menos que o limite, não há mais dados
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMoreGroups = async () => {
    setLoading(true);
    try {
      const result: AnaliseProcessosResponse = await fetchDataAnaliseProcessos(offset, limit);
      setAccumulatedGroups(prev => [...prev, ...result.data]);
      setOffset(prev => prev + limit);
      if (result.data.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar dados de análise de processos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Análise de Prospects</h1>
      {error && <p className="text-red-500">{error}</p>}
      <DataTableDemo data={accumulatedGroups} />
      <div className="mt-4 flex items-center space-x-4">
        {hasMore ? (
          <>
            <Button variant="outline" onClick={loadMoreGroups} disabled={loading}>
              {loading ? 'Carregando...' : 'Trazer mais prospects'}
            </Button>
            <span className="text-sm">
              Grupos carregados: {accumulatedGroups.length}
            </span>
          </>
        ) : (
          <p>Todos os prospects foram carregados.</p>
        )}
      </div>
    </div>
  );
}