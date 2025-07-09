'use client'
import { useEffect, useState, useReducer } from 'react';
import { Button } from '@/components/ui/button';
import VagaCard from '@/components/vaga-card';
import { fetchDataVagas } from '../../../services/api';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

// Interfaces (sem mudanças)
interface Vaga {
  codigo_vaga: number;
  titulo_vaga: string;
  objetivo_vaga: string;
  cliente: string;
  analista_responsavel: string;
}

interface VagasResponse {
  total: number;
  offset: number;
  limit: number;
  data: Vaga[];
}

// 1. Definir a estrutura do nosso estado centralizado
interface VagasState {
  vagas: Vaga[];
  total: number;
  isLoading: boolean;
  pagesCache: Record<number, Vaga[]>;
  error: string | null;
}

// 2. Definir as ações que podem alterar nosso estado
type Action =
  | { type: 'FETCH_START' }
  | { type: 'USE_CACHE'; payload: Vaga[] }
  | { type: 'FETCH_SUCCESS'; payload: { data: Vaga[]; total: number; page: number } }
  | { type: 'FETCH_FAILURE'; payload: string };

// 3. Definir o estado inicial
const initialState: VagasState = {
  vagas: [],
  total: 0,
  isLoading: true,
  pagesCache: {},
  error: null,
};

// 4. Criar a função reducer, que contém toda a lógica de atualização
function vagasReducer(state: VagasState, action: Action): VagasState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null, // Limpa erros anteriores ao iniciar uma nova busca
      };
    case 'USE_CACHE':
      return {
        ...state,
        vagas: action.payload,
        isLoading: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        vagas: action.payload.data,
        // Define o total apenas na primeira vez, para não sobrescrever
        total: state.total === 0 ? action.payload.total : state.total,
        // Atualiza o cache
        pagesCache: {
          ...state.pagesCache,
          [action.payload.page]: action.payload.data,
        },
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default function VagasDashboard() {
  // 5. Substituir múltiplos `useState` por um `useReducer`
  const [state, dispatch] = useReducer(vagasReducer, initialState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 9;
  const router = useRouter();
  const [searchCode, setSearchCode] = useState<string>('');


  useEffect(() => {
    const fetchVagas = async () => {
      // Verifica se a página já está em cache no nosso estado central
      if (state.pagesCache[currentPage]) {
        dispatch({ type: 'USE_CACHE', payload: state.pagesCache[currentPage] });
        return;
      }

      // Inicia o processo de busca despachando a ação 'FETCH_START'
      dispatch({ type: 'FETCH_START' });
      try {
        const offset = (currentPage - 1) * limit;
        const result: VagasResponse = await fetchDataVagas(offset, limit);

        // Em caso de sucesso, despacha a ação 'FETCH_SUCCESS' com os dados
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: { data: result.data, total: result.total, page: currentPage }
        });
      } catch (error) {
        // Em caso de erro, despacha a ação 'FETCH_FAILURE'
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
        dispatch({ type: 'FETCH_FAILURE', payload: errorMessage });
      }
    };

    fetchVagas();
    // Usar apenas currentPage como dependência garante que o array de dependências permanece constante
  }, [currentPage, state.pagesCache]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim() === '') {
      // Se o campo de busca estiver vazio, redireciona para a página inicial
      router.push('/dashboard/vagas');
    } else {
      // Se houver um código de vaga, redireciona para a página de detalhes da vaga
      router.push(`/dashboard/vagas/${searchCode}`);
    }
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className='mb-4 flex gap-2'>
        <Input
          type="text"
          placeholder="Buscar por código da vaga"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <Button type="submit" className="ml-2">
          Buscar
        </Button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {state.isLoading ? (
          <p>Carregando vagas...</p>
        ) : state.error ? (
          <p className="text-red-500">Erro: {state.error}</p> // Mostra a mensagem de erro
        ) : (
          state.vagas.map((vaga) => (
            <Link key={vaga.codigo_vaga} href={`/dashboard/vagas/${vaga.codigo_vaga}`}>
              <VagaCard
                titulo_vaga={vaga.titulo_vaga}
                objetivo_vaga={vaga.objetivo_vaga}
                cliente={vaga.cliente}
                analista_responsavel={vaga.analista_responsavel}
              />
            </Link>
          ))
        )}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || state.isLoading}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}