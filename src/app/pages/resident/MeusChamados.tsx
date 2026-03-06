import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Wrench, Plus } from 'lucide-react';
import { toast } from 'sonner';

type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ServiceRequest {
  id: string;
  description: string;
  type: string;
  status: ServiceStatus;
  createdAt: string;
  apartment: string;
}

const mockChamados: ServiceRequest[] = [
  {
    id: '1',
    description: 'Vazamento no banheiro principal, água escorrendo pela parede',
    type: 'Hidráulica',
    status: 'IN_PROGRESS',
    createdAt: '2026-03-05',
    apartment: '101'
  },
  {
    id: '2',
    description: 'Tomada da cozinha não está funcionando',
    type: 'Elétrica',
    status: 'PENDING',
    createdAt: '2026-03-06',
    apartment: '101'
  },
  {
    id: '3',
    description: 'Porta do armário da área de serviço soltou da dobradiça',
    type: 'Marcenaria',
    status: 'COMPLETED',
    createdAt: '2026-03-01',
    apartment: '101'
  }
];

export default function MeusChamados() {
  const [chamados, setChamados] = useState<ServiceRequest[]>(mockChamados);
  const [open, setOpen] = useState(false);
  const [newChamado, setNewChamado] = useState({ description: '', type: 'Hidráulica' });

  const handleCreateChamado = () => {
    if (!newChamado.description.trim()) {
      toast.error('Por favor, descreva o problema');
      return;
    }

    const novoChamado: ServiceRequest = {
      id: String(Date.now()),
      description: newChamado.description,
      type: newChamado.type,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
      apartment: '101'
    };

    setChamados([novoChamado, ...chamados]);
    setNewChamado({ description: '', type: 'Hidráulica' });
    setOpen(false);
    toast.success('Chamado aberto com sucesso!');
  };

  const getStatusBadge = (status: ServiceStatus) => {
    const variants = {
      PENDING: { label: 'PENDENTE', className: 'bg-yellow-500 hover:bg-yellow-600' },
      IN_PROGRESS: { label: 'EM PROGRESSO', className: 'bg-blue-500 hover:bg-blue-600' },
      COMPLETED: { label: 'CONCLUÍDO', className: 'bg-green-500 hover:bg-green-600' }
    };
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const statusCounts = {
    PENDING: chamados.filter(c => c.status === 'PENDING').length,
    IN_PROGRESS: chamados.filter(c => c.status === 'IN_PROGRESS').length,
    COMPLETED: chamados.filter(c => c.status === 'COMPLETED').length
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Wrench className="size-8" />
            Meus Chamados
          </h1>
          <p className="text-gray-500">
            Gerencie suas solicitações de manutenção
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" size="lg">
              <Plus className="size-5" />
              Abrir Novo Chamado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Abrir Novo Chamado</DialogTitle>
              <DialogDescription>
                Descreva o problema que precisa ser resolvido
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Tipo do Problema</Label>
                <select 
                  id="type"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={newChamado.type}
                  onChange={(e) => setNewChamado({ ...newChamado, type: e.target.value })}
                >
                  <option value="Hidráulica">Hidráulica</option>
                  <option value="Elétrica">Elétrica</option>
                  <option value="Marcenaria">Marcenaria</option>
                  <option value="Pintura">Pintura</option>
                  <option value="Serralheria">Serralheria</option>
                  <option value="Limpeza">Limpeza</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div>
                <Label htmlFor="description">Descrição do Problema</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o problema..."
                  rows={5}
                  value={newChamado.description}
                  onChange={(e) => setNewChamado({ ...newChamado, description: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleCreateChamado}>
                Abrir Chamado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">{statusCounts.PENDING}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Wrench className="size-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Progresso</p>
                <p className="text-3xl font-bold text-blue-600">{statusCounts.IN_PROGRESS}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Wrench className="size-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Concluídos</p>
                <p className="text-3xl font-bold text-green-600">{statusCounts.COMPLETED}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Wrench className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Chamados */}
      <div className="space-y-4">
        {chamados.map((chamado) => (
          <Card key={chamado.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">Chamado #{chamado.id}</CardTitle>
                    {getStatusBadge(chamado.status)}
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span>Tipo: {chamado.type}</span>
                    <span>•</span>
                    <span>{new Date(chamado.createdAt).toLocaleDateString('pt-BR')}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{chamado.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
