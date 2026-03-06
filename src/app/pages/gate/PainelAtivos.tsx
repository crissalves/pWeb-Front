import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Users, LogOut, Search } from 'lucide-react';
import { toast } from 'sonner';

type PersonStatus = 'OPEN' | 'CLOSED';

interface ActivePerson {
  id: string;
  name: string;
  cpf: string;
  type: 'GUEST' | 'SERVICE_PROVIDER';
  apartment: string;
  entryTime: string;
  exitTime?: string;
  status: PersonStatus;
}

const mockActivePeople: ActivePerson[] = [
  {
    id: '1',
    name: 'Roberto Silva',
    cpf: '123.456.789-00',
    type: 'GUEST',
    apartment: '101',
    entryTime: '14:30',
    status: 'OPEN'
  },
  {
    id: '2',
    name: 'Maria Santos',
    cpf: '987.654.321-00',
    type: 'SERVICE_PROVIDER',
    apartment: '205',
    entryTime: '10:15',
    status: 'OPEN'
  },
  {
    id: '3',
    name: 'José Costa',
    cpf: '456.789.123-00',
    type: 'GUEST',
    apartment: '302',
    entryTime: '16:00',
    status: 'OPEN'
  },
  {
    id: '4',
    name: 'Ana Lima',
    cpf: '321.654.987-00',
    type: 'GUEST',
    apartment: '105',
    entryTime: '09:30',
    exitTime: '11:45',
    status: 'CLOSED'
  }
];

export default function PainelAtivos() {
  const [people, setPeople] = useState<ActivePerson[]>(mockActivePeople);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRegisterExit = (id: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setPeople(people.map(person =>
      person.id === id
        ? { ...person, status: 'CLOSED' as const, exitTime: timeStr }
        : person
    ));
    
    const person = people.find(p => p.id === id);
    toast.success(`Saída registrada: ${person?.name}`);
  };

  const activePeople = people.filter(p => p.status === 'OPEN');
  const filteredActivePeople = activePeople.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.cpf.includes(searchTerm) ||
    person.apartment.includes(searchTerm)
  );

  const recentExits = people
    .filter(p => p.status === 'CLOSED')
    .slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Users className="size-8" />
          Painel de Ativos
        </h1>
        <p className="text-gray-500">
          Pessoas atualmente no condomínio
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">No Condomínio</p>
              <p className="text-4xl font-bold text-blue-600">{activePeople.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Visitas</p>
              <p className="text-4xl font-bold text-blue-600">
                {activePeople.filter(p => p.type === 'GUEST').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Prestadores</p>
              <p className="text-4xl font-bold text-green-600">
                {activePeople.filter(p => p.type === 'SERVICE_PROVIDER').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Saídas Hoje</p>
              <p className="text-4xl font-bold text-gray-600">
                {people.filter(p => p.status === 'CLOSED').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pessoas Ativas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pessoas no Condomínio ({activePeople.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, CPF ou apt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredActivePeople.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                {searchTerm ? (
                  <p>Nenhum resultado encontrado</p>
                ) : (
                  <>
                    <Users className="size-12 mx-auto mb-3 text-gray-400" />
                    <p>Nenhuma pessoa no condomínio</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredActivePeople.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-lg">{person.name}</p>
                        <Badge variant={person.type === 'GUEST' ? 'default' : 'secondary'}>
                          {person.type === 'GUEST' ? 'Visita' : 'Serviço'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-0.5">
                        <p>CPF: {person.cpf}</p>
                        <p className="flex items-center gap-4">
                          <span>Apt: {person.apartment}</span>
                          <span>Entrada: {person.entryTime}</span>
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleRegisterExit(person.id)}
                    >
                      <LogOut className="size-4" />
                      Registrar Saída
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saídas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Saídas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentExits.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>Nenhuma saída registrada</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentExits.map((person) => (
                  <div
                    key={person.id}
                    className="p-3 border rounded-lg bg-gray-50"
                  >
                    <p className="font-medium mb-1">{person.name}</p>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <p>Apt {person.apartment}</p>
                      <p>Entrada: {person.entryTime}</p>
                      <p className="text-green-600 font-medium">
                        Saída: {person.exitTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
