'use client'
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VagaDetails } from '@/types/vagas';

interface VagaDetalhesProps {
  details: VagaDetails;
}

export default function VagaDetalhes({ details }: VagaDetalhesProps) {
  const router = useRouter();
  const { infos_basicas, perfil, beneficios } = details;

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Detalhes da Vaga: {infos_basicas.titulo_vaga}
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
            <li><strong>Data de Requisição:</strong> {infos_basicas.data_requisicao}</li>
            <li><strong>Requisitante:</strong> {infos_basicas.requisitante}</li>
            <li><strong>Superior Imediato:</strong> {infos_basicas.superior_imediato}</li>
            <li><strong>Código da Vaga:</strong> {infos_basicas.codigo_vaga}</li>
            <li><strong>Analista Responsável:</strong> {infos_basicas.analista_responsavel}</li>
            <li><strong>Nome:</strong> {infos_basicas.nome}</li>
            <li><strong>Limite Esperado para Contratação:</strong> {infos_basicas.limite_esperado_para_contratacao}</li>
            <li><strong>Tipo de Contratação:</strong> {infos_basicas.tipo_contratacao}</li>
            <li><strong>Telefone:</strong> {infos_basicas.telefone}</li>
            <li><strong>Título da Vaga:</strong> {infos_basicas.titulo_vaga}</li>
            <li><strong>Prazo de Contratação:</strong> {infos_basicas.prazo_contratacao}</li>
            <li><strong>Vaga SAP:</strong> {infos_basicas.vaga_sap}</li>
            <li><strong>Objetivo da Vaga:</strong> {infos_basicas.objetivo_vaga}</li>
            <li><strong>Cliente:</strong> {infos_basicas.cliente}</li>
            <li><strong>Prioridade da Vaga:</strong> {infos_basicas.prioridade_vaga}</li>
            <li><strong>Solicitante do Cliente:</strong> {infos_basicas.solicitante_cliente}</li>
            <li><strong>Origem da Vaga:</strong> {infos_basicas.origem_vaga}</li>
            <li><strong>Empresa/Divisão:</strong> {infos_basicas.empresa_divisao}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Cidade:</strong> {perfil.cidade}</li>
            <li><strong>Nível Acadêmico:</strong> {perfil.nivel_academico}</li>
            <li><strong>Viagens Requeridas:</strong> {perfil.viagens_requeridas}</li>
            <li><strong>Bairro:</strong> {perfil.bairro}</li>
            <li><strong>Nível de Inglês:</strong> {perfil.nivel_ingles}</li>
            <li>
              <strong>Equipamentos Necessários:</strong> {perfil.equipamentos_necessarios || 'N/A'}
            </li>
            <li><strong>Região:</strong> {perfil.regiao}</li>
            <li><strong>Nível de Espanhol:</strong> {perfil.nivel_espanhol}</li>
            <li><strong>Local de Trabalho:</strong> {perfil.local_trabalho}</li>
            <li><strong>Outro Idioma:</strong> {perfil.outro_idioma}</li>
            <li><strong>Código da Vaga (Perfil):</strong> {perfil.codigo_vaga}</li>
            <li><strong>Vaga Específica para PCD:</strong> {perfil.vaga_especifica_para_pcd}</li>
            <li><strong>Áreas de Atuação:</strong> {perfil.areas_atuacao}</li>
            <li><strong>ID do Perfil:</strong> {perfil.id}</li>
            <li><strong>Faixa Etária:</strong> {perfil.faixa_etaria}</li>
            <li><strong>Principais Atividades:</strong> {perfil.principais_atividades}</li>
            <li><strong>País:</strong> {perfil.pais}</li>
            <li><strong>Horário de Trabalho:</strong> {perfil.horario_trabalho}</li>
            <li>
              <strong>Competência Técnicas e Comportamentais:</strong> {perfil.competencia_tecnicas_e_comportamentais}
            </li>
            <li><strong>Estado:</strong> {perfil.estado}</li>
            <li><strong>Nível Profissional:</strong> {perfil.nivel_profissional}</li>
            <li><strong>Demais Observações:</strong> {perfil.demais_observacoes || 'N/A'}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Benefícios */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>ID do Benefício:</strong> {beneficios.id}</li>
            <li><strong>Valor Compra 1:</strong> {beneficios.valor_compra_1}</li>
            <li><strong>Valor Venda:</strong> {beneficios.valor_venda}</li>
            <li><strong>Código da Vaga (Benefícios):</strong> {beneficios.codigo_vaga}</li>
            <li><strong>Valor Compra 2:</strong> {beneficios.valor_compra_2}</li>
          </ul>
        </CardContent>
      </Card>

      <Button onClick={() => router.back()}>Voltar</Button>
    </div>
  );
}