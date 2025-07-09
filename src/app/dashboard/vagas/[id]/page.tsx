'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VagaDetalhes from '@/components/vaga-detalhes';
import { VagaDetails } from '@/types/vagas';
import { fetchDataVagasById } from '../../../../services/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VagaDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState<VagaDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Se id for um array, pegue o primeiro elemento
        const idStr = Array.isArray(id) ? id[0] : id!;
        const result = await fetchDataVagasById(idStr);
        setDetails(result.data);
        setIsLoading(false);
      } catch (err) {
        let errorMessage = 'Erro desconhecido';
        if (err instanceof Error) {
          // Verifica se o erro contém o código 400 e aplica a mensagem personalizada
          errorMessage = err.message.includes('400') ? 'Vaga não encontrada' : err.message;
        }
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) {
    return <p>Carregando detalhes da vaga...</p>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">Erro: {error}</p>
        <Link href="/dashboard/vagas" passHref>
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    );
  }

  if (!details) {
    return <p>Nenhuma informação encontrada para a vaga.</p>;
  }

  return <VagaDetalhes details={details} />;
}