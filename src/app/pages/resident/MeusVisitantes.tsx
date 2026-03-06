import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { UserCheck, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Visitor {
  id: string;
  name: string;
  cpf: string;
  relationship: string;
  notes?: string;
  apartment: string;
  status: 'active' | 'expired';
  registeredAt: string;
}

const mockVisitors: Visitor[] = [
  {
    id: '1',
    name: 'Roberto Alves',
    cpf: '123.456.789-00',
    relationship: 'Amigo',
    notes: 'Visita frequente',
    apartment: '101',
    status: 'active',
    registeredAt: '2026-03-01'
  },
  {
    id: '2',
    name: 'Juliana Rocha',
    cpf: '987.654.321-00',
    relationship: 'Familiar',
    apartment: '101',
    status: 'active',
    registeredAt: '2026-02-15'
  }
];

export default function MeusVisitantes() {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [open, setOpen] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    name: '',
    cpf: '',
    relationship: 'Amigo',
    notes: ''
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleCreateVisitor = () => {
    if (!newVisitor.name.trim() || !newVisitor.cpf.trim()) {
      toast.error('Preencha nome e CPF');
      return;
    }

    const visitor: Visitor = {
      id: String(Date.now()),
      name: newVisitor.name,
      cpf: newVisitor.cpf,
      relationship: newVisitor.relationship,
      notes: newVisitor.notes,
      apartment: '101',
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setVisitors([visitor, ...visitors]);
    setNewVisitor({ name: '', cpf: '', relationship: 'Amigo', notes: '' });
    setOpen(false);
    toast.success('Visitante pré-cadastrado com sucesso!');
  };

  const handleDeleteVisitor = (id: string) => {
    setVisitors(visitors.filter(v => v.id !== id));
    toast.success('Visitante removido');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <UserCheck className="size-8" />
            Meus Visitantes
          </h1>
          <p className="text-gray-500">
            Pré-cadastre visitantes para agilizar na portaria
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" size="lg">
              <Plus className="size-5" />
              Cadastrar Visitante
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Visitante</DialogTitle>
              <DialogDescription>
                Informe os dados do visitante para pré-autorização
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Nome do visitante"
                  value={newVisitor.name}
                  onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={newVisitor.cpf}
                  onChange={(e) => setNewVisitor({ ...newVisitor, cpf: formatCPF(e.target.value) })}
                  maxLength={14}
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relacionamento</Label>
                <select
                  id="relationship"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={newVisitor.relationship}
                  onChange={(e) => setNewVisitor({ ...newVisitor, relationship: e.target.value })}
                >
                  <option value="Amigo">Amigo</option>
                  <option value="Familiar">Familiar</option>
                  <option value="Prestador de Serviço">Prestador de Serviço</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div>
                <Label htmlFor="notes">Observações (Opcional)</Label>
                <Input
                  id="notes"
                  placeholder="Ex: Visita frequente, tem acesso à academia..."
                  value={newVisitor.notes}
                  onChange={(e) => setNewVisitor({ ...newVisitor, notes: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleCreateVisitor}>
                Cadastrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Card */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCheck className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-blue-900 mb-1">Pré-cadastro de Visitantes</p>
              <p className="text-sm text-blue-700">
                Cadastre seus visitantes frequentes para que a portaria possa liberá-los mais rapidamente. 
                O visitante precisará apresentar o CPF cadastrado na entrada.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Visitantes */}
      {visitors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <UserCheck className="size-12 mx-auto mb-3 text-gray-400" />
            <p>Nenhum visitante cadastrado</p>
            <p className="text-sm mt-1">Clique em "Cadastrar Visitante" para começar</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {visitors.map((visitor) => (
            <Card key={visitor.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{visitor.name}</CardTitle>
                      <Badge className="bg-green-500">Ativo</Badge>
                    </div>
                    <CardDescription className="grid grid-cols-2 gap-x-6 gap-y-1">
                      <div>
                        <span className="font-medium">CPF:</span> {visitor.cpf}
                      </div>
                      <div>
                        <span className="font-medium">Relação:</span> {visitor.relationship}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Cadastrado em:</span>{' '}
                        {new Date(visitor.registeredAt).toLocaleDateString('pt-BR')}
                      </div>
                      {visitor.notes && (
                        <div className="col-span-2 mt-1">
                          <span className="font-medium">Obs:</span> {visitor.notes}
                        </div>
                      )}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteVisitor(visitor.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
