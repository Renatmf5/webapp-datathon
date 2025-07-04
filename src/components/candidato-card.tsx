'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CandidatoCardProps {
  nome: string;
  objetivo_profissional: string;
  email: string;
  local: string;
}

export default function CandidatoCard({
  nome,
  objetivo_profissional,
  email,
  local
}: CandidatoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Objetivo:</strong> {objetivo_profissional}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Local:</strong> {local}</p>
      </CardContent>
    </Card>
  );
}
