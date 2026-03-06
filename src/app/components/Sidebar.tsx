import { Link, useLocation } from 'react-router';
import { useAuth, UserRole } from '../context/AuthContext';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  Home,
  Wrench,
  Calendar,
  Users,
  UserCheck,
  Building2,
  LogOut,
  ClipboardList,
  Settings,
  LayoutDashboard
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/',
    roles: ['resident', 'gate', 'manager', 'maintenance']
  },
  {
    title: 'Meus Chamados',
    icon: Wrench,
    path: '/chamados',
    roles: ['resident']
  },
  {
    title: 'Reservas de Lazer',
    icon: Calendar,
    path: '/reservas',
    roles: ['resident']
  },
  {
    title: 'Meus Visitantes',
    icon: UserCheck,
    path: '/visitantes',
    roles: ['resident']
  },
  {
    title: 'Controle de Acesso',
    icon: UserCheck,
    path: '/acesso',
    roles: ['gate']
  },
  {
    title: 'Painel de Ativos',
    icon: ClipboardList,
    path: '/ativos',
    roles: ['gate']
  },
  {
    title: 'Fila de Serviços',
    icon: LayoutDashboard,
    path: '/servicos',
    roles: ['maintenance']
  },
  {
    title: 'Gestão de Lotes',
    icon: Building2,
    path: '/lotes',
    roles: ['manager']
  },
  {
    title: 'Funcionários',
    icon: Users,
    path: '/funcionarios',
    roles: ['manager']
  },
  {
    title: 'Áreas de Lazer',
    icon: Calendar,
    path: '/areas',
    roles: ['manager']
  },
  {
    title: 'Configurações',
    icon: Settings,
    path: '/configuracoes',
    roles: ['manager']
  }
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const availableItems = menuItems.filter(item => item.roles.includes(user.role));

  const getRoleName = (role: UserRole): string => {
    const roleNames: Record<UserRole, string> = {
      resident: 'Morador',
      gate: 'Portaria',
      manager: 'Síndico/Gestão',
      maintenance: 'Manutenção'
    };
    return roleNames[role];
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Building2 className="size-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Condomínio</h1>
            <p className="text-xs text-gray-500">Manager Pro</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{getRoleName(user.role)}</p>
          {user.apartment && (
            <p className="text-xs text-gray-500 mt-1">Apt. {user.apartment}</p>
          )}
        </div>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {availableItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3 ${
                    isActive ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  <Icon className="size-4" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}