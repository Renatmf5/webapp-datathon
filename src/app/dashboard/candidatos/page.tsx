'use client'
import { useEffect, useState, useReducer, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchDataCandidatos } from '../../../services/api';
import CandidatoCard from '@/components/candidato-card';

// Interfaces para o candidate
interface Candidate {
  codigo_profissional: number;
  telefone: string;
  objetivo_profissional: string;
  data_atualizacao: string;
  local: string;
  nome: string;
  email: string;
  telefone_recado: string;
  data_criacao: string;
  inserido_por: string;
  sabendo_de_nos_por: string;
}

interface CandidateResponse {
  total: number;
  offset: number;
  limit: number;
  data: Candidate[];
}

// Estrutura do estado centralizado
interface CandidatesState {
  candidates: Candidate[];
  total: number;
  isLoading: boolean;
  pagesCache: Record<number, Candidate[]>;
  error: string | null;
}

// Ações para o reducer
type Action =
  | { type: 'FETCH_START' }
  | { type: 'USE_CACHE'; payload: Candidate[] }
  | { type: 'FETCH_SUCCESS'; payload: { data: Candidate[]; total: number; page: number } }
  | { type: 'FETCH_FAILURE'; payload: string };

// Estado inicial
const initialState: CandidatesState = {
  candidates: [],
  total: 0,
  isLoading: true,
  pagesCache: {},
  error: null,
};

// Função reducer
function candidatesReducer(state: CandidatesState, action: Action): CandidatesState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'USE_CACHE':
      return {
        ...state,
        candidates: action.payload,
        isLoading: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        candidates: action.payload.data,
        total: state.total === 0 ? action.payload.total : state.total,
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

export default function CandidatesDashboard() {
  const [state, dispatch] = useReducer(candidatesReducer, initialState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchCode, setSearchCode] = useState<string>('');
  const limit = 9;
  const router = useRouter();

  useEffect(() => {
    const fetchCandidates = async () => {
      if (state.pagesCache[currentPage]) {
        dispatch({ type: 'USE_CACHE', payload: state.pagesCache[currentPage] });
        return;
      }

      dispatch({ type: 'FETCH_START' });
      try {
        const offset = (currentPage - 1) * limit;
        const result: CandidateResponse = await fetchDataCandidatos(offset, limit);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: { data: result.data, total: result.total, page: currentPage }
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
        dispatch({ type: 'FETCH_FAILURE', payload: errorMessage });
      }
    };

    fetchCandidates();
  }, [currentPage, state.pagesCache]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      router.push(`/dashboard/candidatos/${searchCode}`);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <Input
          type="number"
          placeholder="Código do candidato"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <Button type="submit">Buscar</Button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {state.isLoading ? (
          <p>Carregando candidatos...</p>
        ) : state.error ? (
          <p className="text-red-500">Erro: {state.error}</p>
        ) : (
          state.candidates.map((candidate) => (
            <Link key={candidate.codigo_profissional} href={`/dashboard/candidatos/${candidate.codigo_profissional}`}>
              <CandidatoCard
                nome={candidate.nome}
                objetivo_profissional={candidate.objetivo_profissional}
                email={candidate.email}
                local={candidate.local}
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
        <span>Página {currentPage}</span>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}