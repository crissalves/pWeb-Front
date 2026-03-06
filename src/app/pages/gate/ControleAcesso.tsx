import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { UserCheck, Users, Package } from 'lucide-react';
import { toast } from 'sonner';

type EntryType = 'GUEST' | 'SERVICE_PROVIDER';

interface AccessLog {
  id: string;
  cpf: string;
  name: string;
  type: EntryType;
  apartment: string;
  entryTime: string;
  status: 'OPEN';
}

export default function ControleAcesso() {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [apartment, setApartment] = useState('');
  const [logs, setLogs] = useState<AccessLog[]>([]);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleEntry = (type: EntryType) => {
    if (!cpf.trim() || !name.trim() || !apartment.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const log: AccessLog = {
      id: String(Date.now()),
      cpf,
      name,
      type,
      apartment,
      entryTime: timeStr,
      status: 'OPEN'
    };

    setLogs([log, ...logs]);
    setCpf('');
    setName('');
    setApartment('');
    
    const typeLabel = type === 'GUEST' ? 'Visita' : 'Prestador de Serviço';
    toast.success(`${typeLabel} registrado(a) com sucesso!`);
  };

  const quickFill = () => {
    setCpf('123.456.789-00');
    setName('Roberto Silva');
    setApartment('101');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <UserCheck className="size-8" />
          Controle de Acesso
        </h1>
        <p className="text-gray-500">
          Registre entradas de visitantes e prestadores de serviço
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulário de Entrada */}
        <Card>
          <CardHeader>
            <CardTitle>Registrar Entrada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cpf">CPF do Visitante</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  maxLength={14}
                  className="text-lg"
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Nome do visitante"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="apartment">Apartamento de Destino</Label>
                <Input
                  id="apartment"
                  placeholder="Ex: 101"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  size="lg"
                  className="h-20 flex-col gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleEntry('GUEST')}
                >
                  <Users className="size-6" />
                  <span className="text-lg">Entrada Visita</span>
                </Button>
                <Button
                  size="lg"
                  className="h-20 flex-col gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleEntry('SERVICE_PROVIDER')}
                >
                  <Package className="size-6" />
                  <span className="text-lg">Entrada Serviço</span>
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={quickFill}
              >
                Preencher Teste Rápido
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Últimas Entradas */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Entradas Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <UserCheck className="size-12 mx-auto mb-3 text-gray-400" />
                <p>Nenhuma entrada registrada ainda</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {logs.slice(0, 10).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 border rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium">{log.name}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        log.type === 'GUEST' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {log.type === 'GUEST' ? 'Visita' : 'Serviço'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-0.5">
                      <p>CPF: {log.cpf}</p>
                      <p>Destino: Apt {log.apartment}</p>
                      <p>Entrada: {log.entryTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas do Dia */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Hoje</p>
              <p className="text-3xl font-bold text-blue-600">{logs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Visitas</p>
              <p className="text-3xl font-bold text-blue-600">
                {logs.filter(l => l.type === 'GUEST').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Prestadores</p>
              <p className="text-3xl font-bold text-green-600">
                {logs.filter(l => l.type === 'SERVICE_PROVIDER').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
