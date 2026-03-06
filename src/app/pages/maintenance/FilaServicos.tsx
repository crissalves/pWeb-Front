import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { LayoutDashboard } from 'lucide-react';

type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  apartment: string;
  resident: string;
  type: string;
  createdAt: string;
  status: ServiceStatus;
}

const mockServices: ServiceCard[] = [
  {
    id: '1',
    title: 'Vazamento no banheiro',
    description: 'Há um vazamento constante no banheiro do apartamento',
    apartment: '101',
    resident: 'João Silva',
    type: 'Hidráulica',
    createdAt: '2026-03-05',
    status: 'PENDING'
  },
  {
    id: '2',
    title: 'Tomada não funciona',
    description: 'Tomada da cozinha não está funcionando',
    apartment: '101',
    resident: 'João Silva',
    type: 'Elétrica',
    createdAt: '2026-03-06',
    status: 'PENDING'
  },
  {
    id: '3',
    title: 'Porta com problema',
    description: 'Porta da garagem não está fechando completamente',
    apartment: '205',
    resident: 'Maria Santos',
    type: 'Mecânica',
    createdAt: '2026-03-04',
    status: 'IN_PROGRESS'
  },
  {
    id: '4',
    title: 'Lâmpada queimada',
    description: 'A lâmpada do corredor do 3º andar está queimada',
    apartment: '304',
    resident: 'Pedro Costa',
    type: 'Elétrica',
    createdAt: '2026-03-02',
    status: 'COMPLETED'
  }
];

export default function FilaServicos() {
  const [services, setServices] = useState<ServiceCard[]>(mockServices);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: ServiceStatus) => {
    e.preventDefault();
    if (!draggedCard) return;

    setServices(services.map(service =>
      service.id === draggedCard
        ? { ...service, status: newStatus }
        : service
    ));
    setDraggedCard(null);
  };

  const getServicesByStatus = (status: ServiceStatus) => {
    return services.filter(s => s.status === status);
  };

  const Column = ({ status, title, bgColor }: { status: ServiceStatus; title: string; bgColor: string }) => {
    const columnServices = getServicesByStatus(status);
    
    return (
      <div className="flex-1 min-w-[300px]">
        <div className={`${bgColor} p-4 rounded-t-lg`}>
          <h3 className="font-semibold text-lg flex items-center justify-between">
            {title}
            <Badge variant="secondary" className="bg-white/20 text-white">
              {columnServices.length}
            </Badge>
          </h3>
        </div>
        <div
          className="bg-gray-50 p-4 min-h-[500px] rounded-b-lg"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <div className="space-y-3">
            {columnServices.map((service) => (
              <Card
                key={service.id}
                draggable
                onDragStart={(e) => handleDragStart(e, service.id)}
                className="cursor-move hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{service.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {service.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p><span className="font-medium">Morador:</span> {service.resident}</p>
                    <p><span className="font-medium">Apt:</span> {service.apartment}</p>
                    <p><span className="font-medium">Aberto em:</span> {new Date(service.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {columnServices.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <p className="text-sm">Nenhum chamado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <LayoutDashboard className="size-8" />
          Fila de Serviços - Kanban
        </h1>
        <p className="text-gray-500">
          Arraste os cards entre as colunas para atualizar o status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Pendentes</p>
              <p className="text-3xl font-bold text-yellow-600">
                {getServicesByStatus('PENDING').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Em Progresso</p>
              <p className="text-3xl font-bold text-blue-600">
                {getServicesByStatus('IN_PROGRESS').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Concluídos</p>
              <p className="text-3xl font-bold text-green-600">
                {getServicesByStatus('COMPLETED').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        <Column status="PENDING" title="Pendentes" bgColor="bg-yellow-500" />
        <Column status="IN_PROGRESS" title="Fazendo" bgColor="bg-blue-500" />
        <Column status="COMPLETED" title="Concluídos" bgColor="bg-green-500" />
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 Dica:</span> Arraste os cards entre as colunas para atualizar o status do chamado. 
          Isso atualizará automaticamente o status para o morador.
        </p>
      </div>
    </div>
  );
}
