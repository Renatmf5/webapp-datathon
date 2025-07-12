'use client';

import { useEffect, useState } from 'react';
import { buscaDriftReport } from '@/services/api';

export default function DriftReportPage() {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        // A função buscaDriftReport retorna o HTML conforme está no bucket S3
        const result = await buscaDriftReport();
        setHtmlContent(result.drift_report);
      } catch (err) {
        console.error('Erro ao buscar Drift Report:', err);
        setError('Erro ao buscar Drift Report.');
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, []);

  if (loading) return <p>Carregando Drift Report...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drift Report</h1>
      <div className="border rounded p-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}