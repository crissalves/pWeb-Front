import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Bell, Calendar, Wrench, Users, TrendingUp, UserCheck, LayoutDashboard, Building2 } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  // Dashboard for Resident
  if (user?.role === 'resident') {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo, {user?.name}! 👋
          </h1>
          <p className="text-gray-500">
            Apartamento {user.apartment}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/chamados">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Meus Chamados
                </CardTitle>
                <div className="p-2 rounded-lg bg-yellow-50">
                  <Wrench className="size-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">2</div>
                <p className="text-xs text-gray-500">1 pendente, 1 em andamento</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/reservas">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Minhas Reservas
                </CardTitle>
                <div className="p-2 rounded-lg bg-blue-50">
                  <Calendar className="size-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">1</div>
                <p className="text-xs text-gray-500">Próxima: Churrasqueira 08/03</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/visitantes">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Visitantes Cadastrados
                </CardTitle>
                <div className="p-2 rounded-lg bg-green-50">
                  <UserCheck className="size-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">2</div>
                <p className="text-xs text-gray-500">Pré-autorizados</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <Link to="/chamados">
              <Button className="w-full h-auto py-4 flex-col gap-2">
                <Wrench className="size-6" />
                Abrir Chamado
              </Button>
            </Link>
            <Link to="/reservas">
              <Button className="w-full h-auto py-4 flex-col gap-2" variant="outline">
                <Calendar className="size-6" />
                Fazer Reserva
              </Button>
            </Link>
            <Link to="/visitantes">
              <Button className="w-full h-auto py-4 flex-col gap-2" variant="outline">
                <UserCheck className="size-6" />
                Cadastrar Visitante
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard for Gate Employee
  if (user?.role === 'gate') {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Portaria - {user?.name} 🚪
          </h1>
          <p className="text-gray-500">
            Controle de acesso e segurança
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/acesso">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Controle de Acesso
                </CardTitle>
                <div className="p-2 rounded-lg bg-blue-50">
                  <UserCheck className="size-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">Registrar Entrada</div>
                <p className="text-xs text-gray-500">Visitantes e prestadores de serviço</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/ativos">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Painel de Ativos
                </CardTitle>
                <div className="p-2 rounded-lg bg-green-50">
                  <Users className="size-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">3</div>
                <p className="text-xs text-gray-500">Pessoas no condomínio agora</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas de Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-600">Entradas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Saídas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">10</div>
                <div className="text-sm text-gray-600">Visitas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">5</div>
                <div className="text-sm text-gray-600">Serviços</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard for Maintenance
  if (user?.role === 'maintenance') {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Manutenção - {user?.name} 🔧
          </h1>
          <p className="text-gray-500">
            Gerencie os chamados de serviço
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="p-3 bg-yellow-50 rounded-lg inline-block mb-3">
                  <Wrench className="size-8 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                <p className="text-4xl font-bold text-yellow-600">2</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="p-3 bg-blue-50 rounded-lg inline-block mb-3">
                  <LayoutDashboard className="size-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Em Progresso</p>
                <p className="text-4xl font-bold text-blue-600">1</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="p-3 bg-green-50 rounded-lg inline-block mb-3">
                  <Wrench className="size-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Concluídos Hoje</p>
                <p className="text-4xl font-bold text-green-600">1</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Acesso Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/servicos">
              <Button className="w-full h-auto py-6 text-lg">
                <LayoutDashboard className="size-6 mr-2" />
                Abrir Kanban de Serviços
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard for Manager
  if (user?.role === 'manager') {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Painel de Gestão - {user?.name} 👔
          </h1>
          <p className="text-gray-500">
            Visão geral do condomínio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Lotes
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-50">
                <Building2 className="size-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">4</div>
              <p className="text-xs text-gray-500">75% ocupados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Moradores
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-50">
                <Users className="size-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">5</div>
              <p className="text-xs text-gray-500">Cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Chamados Abertos
              </CardTitle>
              <div className="p-2 rounded-lg bg-yellow-50">
                <Wrench className="size-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">3</div>
              <p className="text-xs text-gray-500">2 pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Reservas Mês
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-50">
                <Calendar className="size-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">12</div>
              <p className="text-xs text-gray-500">+20% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <Link to="/lotes">
              <Button className="w-full h-auto py-4 flex-col gap-2">
                <Building2 className="size-6" />
                Gestão de Lotes
              </Button>
            </Link>
            <Button className="w-full h-auto py-4 flex-col gap-2" variant="outline">
              <Users className="size-6" />
              Funcionários
            </Button>
            <Button className="w-full h-auto py-4 flex-col gap-2" variant="outline">
              <Calendar className="size-6" />
              Áreas de Lazer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { text: 'Morador adicionado ao Apt 101', time: '10 min atrás', badge: 'Gestão' },
                { text: 'Nova reserva da churrasqueira', time: '1 hora atrás', badge: 'Reserva' },
                { text: 'Chamado #123 concluído', time: '2 horas atrás', badge: 'Manutenção' },
                { text: 'Visitante autorizado para Apt 204', time: '3 horas atrás', badge: 'Portaria' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge variant="secondary">{activity.badge}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo, {user?.name}! 👋
        </h1>
        <p className="text-gray-500">
          Dashboard do Condomínio Manager
        </p>
      </div>
    </div>
  );
}