'use client';

import { useRouter } from 'next/navigation';

type RouteKey =
  | 'adiantamentoPropina'
  | 'movimentosEstudantes'
  | 'pagamentosEstudante'
  | 'creditEstudantes'
  | 'confirmacaoEstudante'
  // adiciona aqui os restantes “atalhos”

export function useRoutes() {
  const router = useRouter();

  const routes: Record<RouteKey, string> = {
    adiantamentoPropina: '/estudante/cartoes/credito/propinas/adiantamento/form',
    movimentosEstudantes: '/estudante/cartoes/credito/movimentos',
    pagamentosEstudante: '/estudante/cartoes/credito/pagamentos',
    creditEstudantes: '/estudante/cartoes/credito/instituicao',
    confirmacaoEstudante: '/estudante/cartoes/credito/confirmacao',
  };

  function goTo(key: RouteKey) {
    router.push(routes[key]);
  }

  function getPath(key: RouteKey) {
    return routes[key];
  }

  return { goTo, getPath };
}
