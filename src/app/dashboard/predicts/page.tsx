/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchDataMetrics, getPredicts } from '../../../../services/api';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';


export default function Backtests() {
  const [data, setData] = useState<{ [key: string]: any[] }>({});
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [predictData, setPredictData] = useState<any[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar o loading
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [loadingTime, setLoadingTime] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchDataMetrics();
        console.log('Fetched data:', result); // Verifica a estrutura exata do retorno

        if (result && typeof result === 'object') {
          setData(result[0]); // Define os dados diretamente
        } else {
          console.error("❌ Unexpected API response:", result);
          setData({});
        }
      } catch (error) {
        console.error('❌ Error fetching data:', error);
        setData({});
      }
    };

    getData();
  }, []);

  const handleKeyChange = (key: string) => {
    setSelectedKey(key);
    setFilteredData(data[key] || []); // Atualiza o filteredData com os valores da chave selecionada
  };

  const handlePredict = async () => {
    if (!selectedKey) {
      console.error("Nenhuma ação selecionada para predição.");
      return;
    }

    setIsLoading(true);
    setPredictData([]);
    setLoadingMessage("Carregando o modelo...");
    setLoadingTime(0);

    const messages = [
      "Carregando o modelo...",
      "Gerando indicadores técnicos do dia...",
      "Lendo indicadores contábeis criado features atualizadas...",

    ];

    let messageIndex = 0;
    const startTime = Date.now();

    // Alterna as mensagens a cada 1 segundo
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
      setLoadingTime(Math.floor((Date.now() - startTime) / 1000));
    }, 5000);

    try {
      const result = await getPredicts(selectedKey);
      console.log("Predict data:", result);

      if (result && result[selectedKey]) {
        setPredictData(result[selectedKey]);
      } else {
        console.error("❌ Unexpected API response:", result);
        setPredictData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching predict data:", error);
      setPredictData([]);
    } finally {
      clearInterval(interval); // Para o intervalo de mensagens
      setIsLoading(false);
      setLoadingMessage(""); // Limpa a mensagem de carregamento
      setLoadingTime(Math.floor((Date.now() - startTime) / 1000)); // Calcula o tempo total
    }
  };

  const keys = Object.keys(data);

  return (
    <>
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-end space-x-2">
          <div className="flex items-end space-x-2">
            <label htmlFor="select-key" className="block mb-1">
              Selecione uma ação para análise e predição:
            </label>
            <Select onValueChange={handleKeyChange}>
              <SelectTrigger id="select-key">
                <SelectValue placeholder="Selecione uma Ação" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {keys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="self-end"
            onClick={handlePredict}
            disabled={isLoading}
          >
            Predict
          </Button>
        </div>
        {isLoading && (
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Carregando Predição...</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{loadingMessage}</p>
                <p>
                  <strong>Tempo decorrido:</strong> {loadingTime}s
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        {predictData.length > 0 && (
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resultado da Predição para {selectedKey}</CardTitle>
              </CardHeader>
              <CardContent>
                {predictData.map((item, index) => {
                  const target = Number(item.target) || 0; // Converte para número ou usa 0 como padrão
                  const variacao = Number(item.variacao) || 0; // Converte para número ou usa 0 como padrão

                  const variacaoAbsoluta = target * (variacao / 100); // Calcula a variação absoluta
                  const precoAlvo = target + variacaoAbsoluta; // Calcula o preço alvo

                  return (
                    <div key={index} className="mb-4">
                      <p>
                        <strong>Data Alvo: </strong> 30 Dias corridos - 1 mês
                      </p>
                      <p>
                        <strong>Último preço de fechamento:</strong> {item.target}
                      </p>
                      <p>
                        <strong>Preço Alvo:</strong> {precoAlvo.toFixed(2)}
                      </p>
                      <p>
                        <strong>Classificação:</strong> {item.classificacao}
                      </p>
                      <p>
                        <strong>Variação Esperada:</strong> {(item.variacao)}%
                      </p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}
        <div className="flex gap-4">
          {filteredData.length > 0 ? (
            filteredData.slice(0, 3).map((item, index) => (
              <div key={index} className="flex flex-col gap-4 w-1/3">
                <div className="aspect-video rounded-xl bg-muted/50">
                  <Card className="flex h-full flex-col">
                    <CardHeader className="items-center pb-0">
                      <CardTitle>Backtest {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <p className="font-bold">
                        Período de Teste: {item.periodo_teste}
                      </p>
                      <p>
                        Test Accuracy Classification:{" "}
                        {item.test_accuracy_classification.toFixed(2)}
                      </p>
                      <p>MAE Regression: {item.mae_regression.toFixed(2)}</p>
                      <p>RMSE Regression: {item.rmse_regression.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground w-full">
              Nenhum dado filtrado disponível.
            </p>
          )}
        </div>
      </div>
    </>
  );
}