import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Building2, Plus, UserMinus, Crown, History } from 'lucide-react';
import { toast } from 'sonner';

interface Resident {
  id: string;
  name: string;
  cpf: string;
  isOwner: boolean;
}

interface Lot {
  id: string;
  number: string;
  block?: string;
  residents: Resident[];
}

interface LotHistoric {
  id: string;
  lotId: string;
  action: string;
  performedBy: string;
  performedByRole: string;
  targetName: string;
  date: string;
}

const mockLots: Lot[] = [
  {
    id: '1',
    number: '101',
    residents: [
      { id: '1', name: 'João Silva', cpf: '111.111.111-11', isOwner: true },
      { id: '2', name: 'Maria Silva', cpf: '222.222.222-22', isOwner: false }
    ]
  },
  {
    id: '2',
    number: '102',
    residents: [
      { id: '3', name: 'Pedro Costa', cpf: '333.333.333-33', isOwner: true }
    ]
  },
  {
    id: '3',
    number: '201',
    residents: []
  },
  {
    id: '4',
    number: '202',
    residents: [
      { id: '4', name: 'Ana Santos', cpf: '444.444.444-44', isOwner: true }
    ]
  }
];

const mockHistoric: LotHistoric[] = [
  {
    id: '1',
    lotId: '1',
    action: 'adicionou',
    performedBy: 'Caio (Gestão)',
    performedByRole: 'manager',
    targetName: 'Cris (Morador)',
    date: '2026-03-05'
  },
  {
    id: '2',
    lotId: '1',
    action: 'definiu como titular',
    performedBy: 'Caio (Gestão)',
    performedByRole: 'manager',
    targetName: 'João Silva',
    date: '2026-03-01'
  }
];

export default function GestaoLotes() {
  const [lots, setLots] = useState<Lot[]>(mockLots);
  const [historic, setHistoric] = useState<LotHistoric[]>(mockHistoric);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openHistoric, setOpenHistoric] = useState(false);
  const [newResident, setNewResident] = useState({ name: '', cpf: '' });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleAddResident = () => {
    if (!selectedLot || !newResident.name.trim() || !newResident.cpf.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }

    const resident: Resident = {
      id: String(Date.now()),
      name: newResident.name,
      cpf: newResident.cpf,
      isOwner: false
    };

    setLots(lots.map(lot =>
      lot.id === selectedLot.id
        ? { ...lot, residents: [...lot.residents, resident] }
        : lot
    ));

    // Add to historic
    const historyEntry: LotHistoric = {
      id: String(Date.now()),
      lotId: selectedLot.id,
      action: 'adicionou',
      performedBy: 'Carlos Oliveira (Gestão)',
      performedByRole: 'manager',
      targetName: newResident.name,
      date: new Date().toISOString().split('T')[0]
    };
    setHistoric([historyEntry, ...historic]);

    setNewResident({ name: '', cpf: '' });
    setOpenAdd(false);
    toast.success('Morador adicionado com sucesso!');
  };

  const handleRemoveResident = (lotId: string, residentId: string) => {
    const lot = lots.find(l => l.id === lotId);
    const resident = lot?.residents.find(r => r.id === residentId);

    setLots(lots.map(lot =>
      lot.id === lotId
        ? { ...lot, residents: lot.residents.filter(r => r.id !== residentId) }
        : lot
    ));

    if (resident) {
      const historyEntry: LotHistoric = {
        id: String(Date.now()),
        lotId,
        action: 'removeu',
        performedBy: 'Carlos Oliveira (Gestão)',
        performedByRole: 'manager',
        targetName: resident.name,
        date: new Date().toISOString().split('T')[0]
      };
      setHistoric([historyEntry, ...historic]);
    }

    toast.success('Morador removido');
  };

  const handleSetOwner = (lotId: string, residentId: string) => {
    const lot = lots.find(l => l.id === lotId);
    const resident = lot?.residents.find(r => r.id === residentId);

    setLots(lots.map(lot =>
      lot.id === lotId
        ? {
            ...lot,
            residents: lot.residents.map(r => ({
              ...r,
              isOwner: r.id === residentId
            }))
          }
        : lot
    ));

    if (resident) {
      const historyEntry: LotHistoric = {
        id: String(Date.now()),
        lotId,
        action: 'definiu como titular',
        performedBy: 'Carlos Oliveira (Gestão)',
        performedByRole: 'manager',
        targetName: resident.name,
        date: new Date().toISOString().split('T')[0]
      };
      setHistoric([historyEntry, ...historic]);
    }

    toast.success('Titular responsável definido');
  };

  const showHistoric = (lot: Lot) => {
    setSelectedLot(lot);
    setOpenHistoric(true);
  };

  const lotHistoric = selectedLot
    ? historic.filter(h => h.lotId === selectedLot.id)
    : [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Building2 className="size-8" />
          Gestão de Lotes e Moradores
        </h1>
        <p className="text-gray-500">
          Gerencie os apartamentos e seus moradores
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total de Lotes</p>
              <p className="text-3xl font-bold text-blue-600">{lots.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Ocupados</p>
              <p className="text-3xl font-bold text-green-600">
                {lots.filter(l => l.residents.length > 0).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Vagos</p>
              <p className="text-3xl font-bold text-gray-600">
                {lots.filter(l => l.residents.length === 0).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Moradores</p>
              <p className="text-3xl font-bold text-purple-600">
                {lots.reduce((acc, lot) => acc + lot.residents.length, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lotes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lots.map((lot) => (
          <Card key={lot.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Apt {lot.number}
                    {lot.residents.length === 0 && (
                      <Badge variant="secondary">Vago</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {lot.residents.length} {lot.residents.length === 1 ? 'morador' : 'moradores'}
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => showHistoric(lot)}
                >
                  <History className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {lot.residents.map((resident) => (
                  <div
                    key={resident.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {resident.isOwner && (
                        <Crown className="size-4 text-yellow-600 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{resident.name}</p>
                        <p className="text-xs text-gray-500">{resident.cpf}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!resident.isOwner && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetOwner(lot.id, resident.id)}
                          title="Definir como titular"
                        >
                          <Crown className="size-4 text-gray-400" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveResident(lot.id, resident.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <UserMinus className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  setSelectedLot(lot);
                  setOpenAdd(true);
                }}
              >
                <Plus className="size-4 mr-1" />
                Vincular Morador
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Resident Dialog */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vincular Morador ao Apt {selectedLot?.number}</DialogTitle>
            <DialogDescription>
              Adicione um novo morador a este apartamento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Nome do morador"
                value={newResident.name}
                onChange={(e) => setNewResident({ ...newResident, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={newResident.cpf}
                onChange={(e) => setNewResident({ ...newResident, cpf: formatCPF(e.target.value) })}
                maxLength={14}
              />
            </div>
            <Button className="w-full" onClick={handleAddResident}>
              Adicionar Morador
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Historic Dialog */}
      <Dialog open={openHistoric} onOpenChange={setOpenHistoric}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Histórico do Apt {selectedLot?.number}</DialogTitle>
            <DialogDescription>
              Timeline de todas as alterações neste lote
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {lotHistoric.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <History className="size-12 mx-auto mb-3 text-gray-400" />
                <p>Nenhum histórico registrado</p>
              </div>
            ) : (
              lotHistoric.map((entry) => (
                <div key={entry.id} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <History className="size-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{entry.performedBy}</span>{' '}
                      {entry.action}{' '}
                      <span className="font-medium">{entry.targetName}</span>{' '}
                      ao Lote {selectedLot?.number}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
