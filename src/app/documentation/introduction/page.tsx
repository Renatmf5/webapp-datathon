import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa'; // Importando o ícone do GitHub

export default function DocIntro() {
  return (
    <>
      {/* Cabeçalho */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-bold">Documentação do Projeto</h1>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Introdução ao Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Este projeto apresenta uma aplicação com dois modelos principais, ambos voltados para o entendimento e previsão dos retornos do mercado de ações brasileiro (B3). Utilizamos conceitos de Factor Investing para realizar análises iniciais e implementar tanto modelos de seleção de carteiras de ações quanto de geração de features para redes neurais, com o objetivo de prever movimentos do mercado.

              O modelo base adotado é o Fama-French Five-Factor Model, uma extensão do tradicional modelo de três fatores proposto por Fama e French (1993). Esta abordagem, amplamente utilizada no Factor Investing, busca explicar e explorar os principais fatores sistemáticos que impulsionam os retornos das ações.

              No projeto, combinamos indicadores fundamentalistas derivados do modelo de Fama-French com análise técnica, a fim de alimentar algoritmos de Machine Learning e Deep Learning. A aplicação é sustentada por uma infraestrutura robusta na AWS, garantindo escalabilidade e eficiência no processamento dos dados.
            </p>
            <p className="text-gray-600 mb-4">
              É importante destacar que prever movimentos do mercado financeiro é uma tarefa extremamente complexa, dada a influência de múltiplos fatores externos e imprevisíveis. Esta é a versão 1 do projeto, ainda em fase experimental, e os modelos de previsão mensal disponíveis na seção Playground - Predictions e Backtests podem não gerar lucros substanciais ou consistentes neste estágio.

              Apesar dessas limitações, o modelo de alocação de carteiras com base em fatores já é uma abordagem consolidada e amplamente validada historicamente, com evidências de retornos consistentes ao longo do tempo.

              Mesmo com ressalvas quanto à previsibilidade de curto prazo, o projeto demonstra um fluxo completo e sofisticado de coleta, processamento e modelagem de dados para apoiar decisões no mercado de capitais.

              Para versões futuras, está prevista a inclusão de análises de texto e notícias como um novo fator de geração de features, dada sua relevância no impacto sobre os preços dos ativos.
            </p>
            <Separator className="my-4" />
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="components">Componentes</TabsTrigger>
                <TabsTrigger value="functions">funcionalidades</TabsTrigger>

              </TabsList>

              {/* Visão Geral */}
              <TabsContent value="overview">
                <ScrollArea className="h-120">
                  <h2 className="text-xl font-semibold mb-2">Visão Geral</h2>
                  <p className="mb-2">
                    O projeto é composto por três principais sistemas integrados que viabilizam todo o pipeline de coleta, análise e previsão do mercado de ações brasileiro, com foco na B3:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong className="mb-4">Sistema de Coleta e Armazenamento de Dados (Scraping de Dados):</strong>
                      <p className="mb-4 mt-6 " >
                        Este sistema, localizado no repositório <strong>b3-trading-tc4</strong>, é responsável pela coleta automatizada de dados fundamentalistas de todas as empresas listadas atualmente na B3. Os dados são obtidos diretamente das Demonstrações Financeiras (DREs, Balanço Patrimonial, DFC, DVA) disponibilizadas no site oficial da CVM, cobrindo todos os trimestres históricos desde 2010.
                      </p>
                      <ul className="list-disc pl-6 text-gray-600">
                        <li>
                          A partir dessas demonstrações contábeis, extraímos e estruturamos os principais fatores fundamentais utilizados no modelo de Fama-French Five Factors, como valor patrimonial, lucratividade, investimento e tamanho da empresa.
                        </li>
                        <li>
                          Os dados são armazenados em um Data Lake hospedado na AWS (Amazon S3), o que garante escalabilidade, segurança e fácil integração com outras ferramentas do projeto.
                        </li>
                      </ul>
                      <p>Esses dados alimentam dois produtos principais:</p>
                      <ul className="list-disc pl-6 text-gray-600">
                        <li>
                          A carteira mensal baseada em fatores, construída com base em rankings dos fatores fundamentalistas;
                        </li>
                        <li>
                          A geração de features para os modelos de Machine Learning e Deep Learning, com foco especial em modelos LSTM (Long Short-Term Memory) para previsão de preços e sinais de compra/venda.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong className="mt-6 mb-4">Laboratório de Modelagem e Treinamento de Modelos:</strong>
                      <p className="mb-4 mt-6 ">
                        Ainda no repositório <strong>b3-trading-tc4</strong>, este módulo é responsável por toda a parte de análise, engenharia de dados e modelagem preditiva. Suas funções incluem:
                      </p>
                      <ul className="list-disc pl-6 text-gray-600">
                        <li>
                          Análise exploratória de dados contábeis e técnicos, visando entender padrões, sazonalidades e tendências de mercado;
                        </li>
                        <li>
                          Construção de indicadores técnicos (como médias móveis, RSI, MACD, etc.), que capturam sinais de curto prazo e comportamento do preço;
                        </li>
                        <li>
                          Estudos de correlação e regressão entre os fatores fundamentais e o retorno das ações, buscando identificar os fatores mais relevantes;
                        </li>
                        <li>
                          Treinamento de modelos preditivos, com destaque para dois tipos de LSTM:
                          <ul className="list-disc pl-6 text-gray-600">
                            <li>LSTM de Classificação: prevê a direção do preço (compra, venda, neutro);</li>
                            <li>LSTM de Regressão: estima o preço-alvo de cada ação em um horizonte de 1 mês.</li>
                          </ul>
                        </li>
                        <li>
                          Esses modelos são treinados de forma individual para cada ativo da B3, utilizando janelas móveis temporais. Eles são otimizados com métricas como RMSE, MAE, accuracy e precision, e estão prontos para serem consumidos em produção.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Sistema de API e Integração com Plataforma Web</h2>
                        <p className="mb-4">
                          O sistema de APIs está no repositório <strong>FastAPI-tc4</strong> e tem como papel centralizar as operações de previsão, gestão de modelos e exposição dos resultados ao usuário da plataforma. Suas principais responsabilidades incluem:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600">
                          <li>
                            Carregar os modelos de LSTM e os scalers correspondentes diretamente do ambiente em nuvem (AWS S3), conforme o ativo selecionado pelo usuário;
                          </li>
                          <li>
                            Executar as predições mensais (preço-alvo e recomendação) e retornar os resultados em tempo real;
                          </li>
                          <li>
                            Buscar e apresentar métricas de desempenho dos modelos, como RMSE, MAE, acurácia e histórico de erro para diferentes ativos;
                          </li>
                          <li>
                            Exibir o histórico de backtests realizados, tanto dos modelos de LSTM quanto da carteira gerada pelo modelo de Factor Investing;
                          </li>
                          <li>
                            Fornecer acesso à performance histórica das carteiras recomendadas, permitindo análise comparativa com benchmarks como Ibovespa.
                          </li>
                        </ul>
                      </div>                    </li>
                  </ul>
                </ScrollArea>
              </TabsContent>

              {/* Componentes */}
              <TabsContent value="components">
                <ScrollArea className="h-64">
                  <h2 className="text-xl font-semibold mb-2">Componentes do Projeto</h2>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>FastAPI:</strong> API para gerenciar operações de trading, métricas de desempenho e integração com serviços externos. Este componente centraliza as indicadores de abertura e fechamento de pregões em tempo real e posteriormente entrega um predição mensal da Ação.
                    </li>
                    <li>
                      <strong>Next.js:</strong> Interface web para visualização de métricas, backtests e Predições. Este repositório contém o código da plataforma web do projeto.
                    </li>
                    <li>
                      <strong>Modelos de Deep Learning:</strong> LSTM Classification, LSTM Regression. Esses modelos são treinados no laboratório de ML e DeepLearning para realizar previsões e tomar decisões de Compra e venda.
                    </li>
                    <li>
                      <strong>Infraestrutura AWS:</strong> EC2, S3,  ALB, Route53, CodePipeline e muito mais. A infraestrutura é provisionada utilizando AWS CDK.
                    </li>
                  </ul>
                </ScrollArea>
              </TabsContent>

              {/* Funcionalidades */}
              <TabsContent value="functions">
                <ScrollArea className="h-64">
                  <h2 className="text-xl font-semibold mb-2">Funcionalidades Principais</h2>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>Carteira Factor:</strong> Apresenta métricas de desempenho do Modelo de Factor Investing, como retorno, volatilidade e Sharpe Ratio, com base em dados históricos. O sistema de backtest é responsável por calcular essas métricas.
                    </li>
                    <li>
                      <strong>Predictions e Backtests:</strong> Realiza previsões mensais e backtests dos modelos de LSTM, permitindo ao usuário visualizar o desempenho histórico e as previsões futuras. O Usuário não precisa imputar nenhum dado, apenas selecionar o ativo desejado e o sistema irá retornar as previsões, o sistema tem a inteligencia de buscar as features contábeis mais recentes em nosso DataLake e concatenar com os indicadores técnicos que representam um fator momentum. Então o modelo tambem tem inteligencia de fazer a inferencia sobre um modelo pré treinado especifico para cada ação da lista, cada Aão tem seu modelo salvo em um bucket S3 responsavel por isso.
                    </li>
                  </ul>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>

          {/* Rodapé com Links dos Repositórios */}
          <CardFooter className="flex flex-wrap justify-center gap-4 mt-4">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/aws-infra-tc4" target="_blank" rel="noopener noreferrer">
                <FaGithub /> Infraestrutura AWS
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/b3-trading-tc4" target="_blank" rel="noopener noreferrer">
                <FaGithub /> Laboratório de Modelagem e Treinamento
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/FastAPI-tc4" target="_blank" rel="noopener noreferrer">
                <FaGithub /> FastAPI API do Projeto
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <a href="https://github.com/Renatmf5/webapp-tc4" target="_blank" rel="noopener noreferrer">
                <FaGithub /> Plataforma Web
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}