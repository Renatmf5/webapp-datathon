'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { atualizaProspect } from '@/services/api';
import { ProspectsGroup, Prospect } from '@/types/prospects';
import Link from 'next/link';

export default function ProspectDetailsPage() {
  const params = useParams();
  const codigo_vaga = Number(params.codigo_vaga);
  const [group, setGroup] = useState<ProspectsGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Para controle da edição do prospect
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editSituacao, setEditSituacao] = useState<string>('');
  const [editComentario, setEditComentario] = useState<string>('');

  useEffect(() => {
    // Recupera os dados do grupo armazenado
    const storedGroup = localStorage.getItem("groupDetails");
    if (storedGroup) {
      const parsedGroup = JSON.parse(storedGroup) as ProspectsGroup;
      if (parsedGroup.codigo_vaga === codigo_vaga) {
        setGroup(parsedGroup);
      } else {
        setError("Dados do grupo incompatíveis.");
      }
    } else {
      setError("Dados do grupo não disponíveis.");
    }
    setLoading(false);
  }, [codigo_vaga]);

  const handleEdit = (prospect: Prospect) => {
    setEditingId(prospect.id);
    setEditSituacao(prospect.situacao_candidato);
    setEditComentario(prospect.comentario);
  };

  const handleSave = async (prospect: Prospect) => {
    try {
      const payload = {
        codigo_vaga: group?.codigo_vaga || 0,
        codigo_candidato: prospect.codigo_candidato,
        situacao_candidato: editSituacao,
        comentario: editComentario,
      };
      await atualizaProspect(payload);
      // Atualiza o estado local com os novos valores
      if (group) {
        const updatedProspects = group.prospects.map((p: Prospect) =>
          p.id === prospect.id ? { ...p, situacao_candidato: editSituacao, comentario: editComentario } : p
        );
        setGroup({ ...group, prospects: updatedProspects });
      }
      setEditingId(null);
    } catch (err) {
      console.error('Erro ao atualizar prospect', err);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error || !group) return <p>{error || 'Grupo não encontrado.'}</p>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link href="/dashboard/prospects" passHref>
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        Detalhes dos Prospects - Vaga: {group.titulo_vaga} (Código: {group.codigo_vaga})
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Código Candidato</TableHead>
            <TableHead>Data Candidatura</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Comentário</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.prospects.map((prospect: Prospect) => (
            <TableRow key={prospect.id}>
              <TableCell>{prospect.id}</TableCell>
              <TableCell>{prospect.nome}</TableCell>
              <TableCell>{prospect.codigo_candidato}</TableCell>
              <TableCell>{prospect.data_candidatura}</TableCell>
              <TableCell>
                {editingId === prospect.id ? (
                  <input
                    type="text"
                    value={editSituacao}
                    onChange={(e) => setEditSituacao(e.target.value)}
                    className="border p-1 max-w-[200px]"
                  />
                ) : (
                  <div className="max-w-[200px] truncate" title={prospect.situacao_candidato}>
                    {prospect.situacao_candidato}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {editingId === prospect.id ? (
                  <input
                    type="text"
                    value={editComentario}
                    onChange={(e) => setEditComentario(e.target.value)}
                    className="border p-1 max-w-[200px]"
                  />
                ) : (
                  <div className="max-w-[200px] truncate" title={prospect.comentario}>
                    {prospect.comentario}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {editingId === prospect.id ? (
                  <Button onClick={() => handleSave(prospect)}>Salvar</Button>
                ) : (
                  <Button onClick={() => handleEdit(prospect)}>Editar</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}