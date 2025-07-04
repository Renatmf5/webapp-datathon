/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createVaga } from '../../../../services/api';

export default function CreateVagaPage() {
  // Estado para "infos_basicas"
  const [infosBasicas, setInfosBasicas] = useState({
    data_requisicao: "",
    limite_esperado_para_contratacao: "",
    titulo_vaga: "",
    vaga_sap: "",
    cliente: "",
    solicitante_cliente: "",
    empresa_divisao: "",
    requisitante: "",
    analista_responsavel: "",
    tipo_contratacao: "",
    prazo_contratacao: "",
    objetivo_vaga: "",
    prioridade_vaga: "",
    origem_vaga: "",
    superior_imediato: "",
    nome: "",
    telefone: ""
  });

  // Estado para "perfil_vaga"
  const [perfilVaga, setPerfilVaga] = useState({
    pais: "",
    estado: "",
    cidade: "",
    bairro: "",
    regiao: "",
    local_trabalho: "",
    vaga_especifica_para_pcd: "",
    faixa_etaria: "",
    horario_trabalho: "",
    nivel_profissional: "",
    nivel_academico: "",
    nivel_ingles: "",
    nivel_espanhol: "",
    outro_idioma: "",
    areas_atuacao: "",
    principais_atividades: "",
    competencia_tecnicas_e_comportamentais: "",
    demais_observacoes: "",
    viagens_requeridas: "",
    equipamentos_necessarios: ""
  });

  // Estado para "beneficios"
  const [beneficios, setBeneficios] = useState({
    valor_venda: "",
    valor_compra_1: "",
    valor_compra_2: ""
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Monta o objeto a ser enviado conforme o formato esperado na API
    const vagaData = {
      infos_basicas: infosBasicas,
      perfil_vaga: perfilVaga,
      beneficios: beneficios,
    };

    try {
      const response = await createVaga(vagaData);
      setSuccessMessage(`Vaga criada com sucesso! ID: ${response.codigo_vaga}`);
      // Opcional: Limpar formulário ou redirecionar
    } catch (error) {
      setErrorMessage("Falha ao criar vaga.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInfosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfosBasicas({
      ...infosBasicas,
      [e.target.name]: e.target.value
    });
  };

  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerfilVaga({
      ...perfilVaga,
      [e.target.name]: e.target.value
    });
  };

  const handleBeneficiosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficios({
      ...beneficios,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Cadastro de Vaga</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção: Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data_requisicao">Data de Requisição</Label>
              <Input id="data_requisicao" name="data_requisicao" value={infosBasicas.data_requisicao} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="limite_esperado_para_contratacao">Limite para Contratação</Label>
              <Input id="limite_esperado_para_contratacao" name="limite_esperado_para_contratacao" value={infosBasicas.limite_esperado_para_contratacao} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="titulo_vaga">Título da Vaga</Label>
              <Input id="titulo_vaga" name="titulo_vaga" value={infosBasicas.titulo_vaga} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="vaga_sap">Vaga SAP</Label>
              <Input id="vaga_sap" name="vaga_sap" value={infosBasicas.vaga_sap} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input id="cliente" name="cliente" value={infosBasicas.cliente} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="solicitante_cliente">Solicitante Cliente</Label>
              <Input id="solicitante_cliente" name="solicitante_cliente" value={infosBasicas.solicitante_cliente} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="empresa_divisao">Empresa/Divisão</Label>
              <Input id="empresa_divisao" name="empresa_divisao" value={infosBasicas.empresa_divisao} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="requisitante">Requisitante</Label>
              <Input id="requisitante" name="requisitante" value={infosBasicas.requisitante} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="analista_responsavel">Analista Responsável</Label>
              <Input id="analista_responsavel" name="analista_responsavel" value={infosBasicas.analista_responsavel} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="tipo_contratacao">Tipo de Contratação</Label>
              <Input id="tipo_contratacao" name="tipo_contratacao" value={infosBasicas.tipo_contratacao} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="prazo_contratacao">Prazo de Contratação</Label>
              <Input id="prazo_contratacao" name="prazo_contratacao" value={infosBasicas.prazo_contratacao} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="objetivo_vaga">Objetivo da Vaga</Label>
              <Input id="objetivo_vaga" name="objetivo_vaga" value={infosBasicas.objetivo_vaga} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="prioridade_vaga">Prioridade da Vaga</Label>
              <Input id="prioridade_vaga" name="prioridade_vaga" value={infosBasicas.prioridade_vaga} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="origem_vaga">Origem da Vaga</Label>
              <Input id="origem_vaga" name="origem_vaga" value={infosBasicas.origem_vaga} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="superior_imediato">Superior Imediato</Label>
              <Input id="superior_imediato" name="superior_imediato" value={infosBasicas.superior_imediato} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" value={infosBasicas.nome} onChange={handleInfosChange} />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" value={infosBasicas.telefone} onChange={handleInfosChange} />
            </div>
          </CardContent>
        </Card>

        {/* Seção: Perfil da Vaga */}
        <Card>
          <CardHeader>
            <CardTitle>Perfil da Vaga</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pais">País</Label>
              <Input id="pais" name="pais" value={perfilVaga.pais} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Input id="estado" name="estado" value={perfilVaga.estado} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" name="cidade" value={perfilVaga.cidade} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="bairro">Bairro</Label>
              <Input id="bairro" name="bairro" value={perfilVaga.bairro} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="regiao">Região</Label>
              <Input id="regiao" name="regiao" value={perfilVaga.regiao} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="local_trabalho">Local de Trabalho</Label>
              <Input id="local_trabalho" name="local_trabalho" value={perfilVaga.local_trabalho} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="vaga_especifica_para_pcd">Vaga específica para PCD</Label>
              <Input id="vaga_especifica_para_pcd" name="vaga_especifica_para_pcd" value={perfilVaga.vaga_especifica_para_pcd} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="faixa_etaria">Faixa Etária</Label>
              <Input id="faixa_etaria" name="faixa_etaria" value={perfilVaga.faixa_etaria} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="horario_trabalho">Horário de Trabalho</Label>
              <Input id="horario_trabalho" name="horario_trabalho" value={perfilVaga.horario_trabalho} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="nivel_profissional">Nível Profissional</Label>
              <Input id="nivel_profissional" name="nivel_profissional" value={perfilVaga.nivel_profissional} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="nivel_academico">Nível Acadêmico</Label>
              <Input id="nivel_academico" name="nivel_academico" value={perfilVaga.nivel_academico} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="nivel_ingles">Nível de Inglês</Label>
              <Input id="nivel_ingles" name="nivel_ingles" value={perfilVaga.nivel_ingles} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="nivel_espanhol">Nível de Espanhol</Label>
              <Input id="nivel_espanhol" name="nivel_espanhol" value={perfilVaga.nivel_espanhol} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="outro_idioma">Outro Idioma</Label>
              <Input id="outro_idioma" name="outro_idioma" value={perfilVaga.outro_idioma} onChange={handlePerfilChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="areas_atuacao">Áreas de Atuação</Label>
              <Input id="areas_atuacao" name="areas_atuacao" value={perfilVaga.areas_atuacao} onChange={handlePerfilChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="principais_atividades">Principais Atividades</Label>
              <Textarea id="principais_atividades" name="principais_atividades" value={perfilVaga.principais_atividades} onChange={handlePerfilChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="competencia_tecnicas_e_comportamentais">Competências Técnicas e Comportamentais</Label>
              <Textarea id="competencia_tecnicas_e_comportamentais" name="competencia_tecnicas_e_comportamentais" value={perfilVaga.competencia_tecnicas_e_comportamentais} onChange={handlePerfilChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="demais_observacoes">Demais Observações</Label>
              <Textarea id="demais_observacoes" name="demais_observacoes" value={perfilVaga.demais_observacoes} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="viagens_requeridas">Viagens Requeridas</Label>
              <Input id="viagens_requeridas" name="viagens_requeridas" value={perfilVaga.viagens_requeridas} onChange={handlePerfilChange} />
            </div>
            <div>
              <Label htmlFor="equipamentos_necessarios">Equipamentos Necessários</Label>
              <Input id="equipamentos_necessarios" name="equipamentos_necessarios" value={perfilVaga.equipamentos_necessarios} onChange={handlePerfilChange} />
            </div>
          </CardContent>
        </Card>

        {/* Seção: Benefícios */}
        <Card>
          <CardHeader>
            <CardTitle>Benefícios</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="valor_venda">Valor Venda</Label>
              <Input id="valor_venda" name="valor_venda" value={beneficios.valor_venda} onChange={handleBeneficiosChange} />
            </div>
            <div>
              <Label htmlFor="valor_compra_1">Valor Compra 1</Label>
              <Input id="valor_compra_1" name="valor_compra_1" value={beneficios.valor_compra_1} onChange={handleBeneficiosChange} />
            </div>
            <div>
              <Label htmlFor="valor_compra_2">Valor Compra 2</Label>
              <Input id="valor_compra_2" name="valor_compra_2" value={beneficios.valor_compra_2} onChange={handleBeneficiosChange} />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Cadastrar Vaga"}
          </Button>
        </div>
      </form>
    </div>
  );
}