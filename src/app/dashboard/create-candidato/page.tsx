/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createCandidato } from '../../../../services/api';

export default function CreateCandidatoPage() {
  // Estado para "infos_basicas"
  const [infosBasicas, setInfosBasicas] = useState({
    nome: "",
    email: "",
    telefone: "",
    telefone_recado: "",
    objetivo_profissional: "",
    data_criacao: "",
    data_atualizacao: "",
    inserido_por: "",
    local: "",
    sabendo_de_nos_por: ""
  });

  // Estado para "informacoes_pessoais"
  const [informacoesPessoais, setInformacoesPessoais] = useState({
    nome: "",
    cpf: "",
    telefone_celular: "",
    data_nascimento: "",
    sexo: "",
    estado_civil: "",
    pcd: "",
    endereco: "",
    url_linkedin: ""
  });

  // Estado para "informacoes_profissionais"
  const [informacoesProfissionais, setInformacoesProfissionais] = useState({
    titulo_profissional: "",
    area_atuacao: "",
    conhecimentos_tecnicos: "",
    certificacoes: "",
    remuneracao: "",
    nivel_profissional: ""
  });

  // Estado para "formacao_e_idiomas"
  const [formacaoEIdiomas, setFormacaoEIdiomas] = useState({
    nivel_academico: "",
    nivel_ingles: "",
    nivel_espanhol: "",
    outro_idioma: ""
  });

  // Estado para "cv_pt"
  const [cvPt, setCvPt] = useState("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const candidatoData = {
      infos_basicas: infosBasicas,
      informacoes_pessoais: informacoesPessoais,
      informacoes_profissionais: informacoesProfissionais,
      formacao_e_idiomas: formacaoEIdiomas,
      cv_pt: cvPt
    };

    try {
      const response = await createCandidato(candidatoData);
      setSuccessMessage(`Candidato criado com sucesso! Código: ${response.codigo_candidato}`);
      // Opcional: Limpar formulário ou redirecionar
    } catch (error) {
      setErrorMessage("Falha ao criar candidato.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInfosBasicasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfosBasicas({
      ...infosBasicas,
      [e.target.name]: e.target.value
    });
  };

  const handleInformacoesPessoaisChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInformacoesPessoais({
      ...informacoesPessoais,
      [e.target.name]: e.target.value
    });
  };

  const handleInformacoesProfissionaisChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInformacoesProfissionais({
      ...informacoesProfissionais,
      [e.target.name]: e.target.value
    });
  };

  const handleFormacaoEIdiomasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormacaoEIdiomas({
      ...formacaoEIdiomas,
      [e.target.name]: e.target.value
    });
  };

  const handleCvPtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvPt(e.target.value);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Cadastro de Candidato</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção: Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" value={infosBasicas.nome} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={infosBasicas.email} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" value={infosBasicas.telefone} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="telefone_recado">Telefone Recado</Label>
              <Input id="telefone_recado" name="telefone_recado" value={infosBasicas.telefone_recado} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="objetivo_profissional">Objetivo Profissional</Label>
              <Input id="objetivo_profissional" name="objetivo_profissional" value={infosBasicas.objetivo_profissional} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="data_criacao">Data de Criação</Label>
              <Input id="data_criacao" name="data_criacao" value={infosBasicas.data_criacao} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="data_atualizacao">Data de Atualização</Label>
              <Input id="data_atualizacao" name="data_atualizacao" value={infosBasicas.data_atualizacao} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="inserido_por">Inserido Por</Label>
              <Input id="inserido_por" name="inserido_por" value={infosBasicas.inserido_por} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="local">Local</Label>
              <Input id="local" name="local" value={infosBasicas.local} onChange={handleInfosBasicasChange} />
            </div>
            <div>
              <Label htmlFor="sabendo_de_nos_por">Sabendo de Nós Por</Label>
              <Input id="sabendo_de_nos_por" name="sabendo_de_nos_por" value={infosBasicas.sabendo_de_nos_por} onChange={handleInfosBasicasChange} />
            </div>
          </CardContent>
        </Card>

        {/* Seção: Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome_pessoal">Nome</Label>
              <Input id="nome_pessoal" name="nome" value={informacoesPessoais.nome} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" name="cpf" value={informacoesPessoais.cpf} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="telefone_celular">Telefone Celular</Label>
              <Input id="telefone_celular" name="telefone_celular" value={informacoesPessoais.telefone_celular} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="data_nascimento">Data de Nascimento</Label>
              <Input id="data_nascimento" name="data_nascimento" value={informacoesPessoais.data_nascimento} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="sexo">Sexo</Label>
              <Input id="sexo" name="sexo" value={informacoesPessoais.sexo} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="estado_civil">Estado Civil</Label>
              <Input id="estado_civil" name="estado_civil" value={informacoesPessoais.estado_civil} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="pcd">PCD</Label>
              <Input id="pcd" name="pcd" value={informacoesPessoais.pcd} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" name="endereco" value={informacoesPessoais.endereco} onChange={handleInformacoesPessoaisChange} />
            </div>
            <div>
              <Label htmlFor="url_linkedin">URL do LinkedIn</Label>
              <Input id="url_linkedin" name="url_linkedin" value={informacoesPessoais.url_linkedin} onChange={handleInformacoesPessoaisChange} />
            </div>
          </CardContent>
        </Card>

        {/* Seção: Informações Profissionais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Profissionais</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titulo_profissional">Título Profissional</Label>
              <Input id="titulo_profissional" name="titulo_profissional" value={informacoesProfissionais.titulo_profissional} onChange={handleInformacoesProfissionaisChange} />
            </div>
            <div>
              <Label htmlFor="area_atuacao">Área de Atuação</Label>
              <Input id="area_atuacao" name="area_atuacao" value={informacoesProfissionais.area_atuacao} onChange={handleInformacoesProfissionaisChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="conhecimentos_tecnicos">Conhecimentos Técnicos</Label>
              <Textarea id="conhecimentos_tecnicos" name="conhecimentos_tecnicos" value={informacoesProfissionais.conhecimentos_tecnicos} onChange={handleInformacoesProfissionaisChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="certificacoes">Certificações</Label>
              <Input id="certificacoes" name="certificacoes" value={informacoesProfissionais.certificacoes} onChange={handleInformacoesProfissionaisChange} />
            </div>
            <div>
              <Label htmlFor="remuneracao">Remuneração</Label>
              <Input id="remuneracao" name="remuneracao" value={informacoesProfissionais.remuneracao} onChange={handleInformacoesProfissionaisChange} />
            </div>
            <div>
              <Label htmlFor="nivel_profissional">Nível Profissional</Label>
              <Input id="nivel_profissional" name="nivel_profissional" value={informacoesProfissionais.nivel_profissional} onChange={handleInformacoesProfissionaisChange} />
            </div>
          </CardContent>
        </Card>

        {/* Seção: Formação e Idiomas */}
        <Card>
          <CardHeader>
            <CardTitle>Formação e Idiomas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nivel_academico">Nível Acadêmico</Label>
              <Input id="nivel_academico" name="nivel_academico" value={formacaoEIdiomas.nivel_academico} onChange={handleFormacaoEIdiomasChange} />
            </div>
            <div>
              <Label htmlFor="nivel_ingles">Nível de Inglês</Label>
              <Input id="nivel_ingles" name="nivel_ingles" value={formacaoEIdiomas.nivel_ingles} onChange={handleFormacaoEIdiomasChange} />
            </div>
            <div>
              <Label htmlFor="nivel_espanhol">Nível de Espanhol</Label>
              <Input id="nivel_espanhol" name="nivel_espanhol" value={formacaoEIdiomas.nivel_espanhol} onChange={handleFormacaoEIdiomasChange} />
            </div>
            <div>
              <Label htmlFor="outro_idioma">Outro Idioma</Label>
              <Input id="outro_idioma" name="outro_idioma" value={formacaoEIdiomas.outro_idioma} onChange={handleFormacaoEIdiomasChange} />
            </div>
          </CardContent>
        </Card>

        {/* Seção: Currículo (cv_pt) */}
        <Card>
          <CardHeader>
            <CardTitle>Currículo (PT)</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="cv_pt" className="mb-2">Resumo do Currículo</Label>
            <Textarea id="cv_pt" name="cv_pt" value={cvPt} onChange={handleCvPtChange} />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Cadastrar Candidato"}
          </Button>
        </div>
      </form>
    </div>
  );
}