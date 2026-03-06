import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MeusChamados from './pages/resident/MeusChamados';
import ReservasLazer from './pages/resident/ReservasLazer';
import MeusVisitantes from './pages/resident/MeusVisitantes';
import ControleAcesso from './pages/gate/ControleAcesso';
import PainelAtivos from './pages/gate/PainelAtivos';
import FilaServicos from './pages/maintenance/FilaServicos';
import GestaoLotes from './pages/manager/GestaoLotes';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      // Resident routes
      {
        path: 'chamados',
        Component: MeusChamados
      },
      {
        path: 'reservas',
        Component: ReservasLazer
      },
      {
        path: 'visitantes',
        Component: MeusVisitantes
      },
      // Gate routes
      {
        path: 'acesso',
        Component: ControleAcesso
      },
      {
        path: 'ativos',
        Component: PainelAtivos
      },
      // Maintenance routes
      {
        path: 'servicos',
        Component: FilaServicos
      },
      // Manager routes
      {
        path: 'lotes',
        Component: GestaoLotes
      }
    ]
  }
]);