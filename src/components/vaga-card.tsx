'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VagaCardProps {
  titulo_vaga: string;
  objetivo_vaga: string;
  cliente: string;
  analista_responsavel: string;
}

export default function VagaCard({ titulo_vaga, objetivo_vaga, cliente, analista_responsavel }: VagaCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo_vaga}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Objetivo:</strong> {objetivo_vaga}</p>
        <p><strong>Cliente:</strong> {cliente}</p>
        <p><strong>Analista:</strong> {analista_responsavel}</p>
      </CardContent>
    </Card>
  );
}