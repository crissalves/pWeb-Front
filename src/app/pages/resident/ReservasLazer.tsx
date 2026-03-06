import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Calendar } from '../../components/ui/calendar';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Calendar as CalendarIcon, Plus, Clock, AlertCircle, Users } from 'lucide-react';
import { toast } from 'sonner';

interface LeisureArea {
  id: string;
  name: string;
  capacity: number;
  openTime: string;
  closeTime: string;
  currentBookings: number;
}

interface Reservation {
  id: string;
  areaId: string;
  areaName: string;
  date: string;
  startTime: string;
  endTime: string;
  apartment: string;
}

const leisureAreas: LeisureArea[] = [
  { id: '1', name: 'Salão de Festas', capacity: 50, openTime: '08:00', closeTime: '23:00', currentBookings: 2 },
  { id: '2', name: 'Churrasqueira 1', capacity: 15, openTime: '10:00', closeTime: '22:00', currentBookings: 5 },
  { id: '3', name: 'Churrasqueira 2', capacity: 15, openTime: '10:00', closeTime: '22:00', currentBookings: 1 },
  { id: '4', name: 'Quadra Esportiva', capacity: 20, openTime: '06:00', closeTime: '22:00', currentBookings: 8 },
  { id: '5', name: 'Piscina', capacity: 30, openTime: '08:00', closeTime: '20:00', currentBookings: 12 }
];

const mockReservations: Reservation[] = [
  {
    id: '1',
    areaId: '2',
    areaName: 'Churrasqueira 1',
    date: '2026-03-08',
    startTime: '12:00',
    endTime: '18:00',
    apartment: '101'
  }
];

const timeSlots = [
  { value: '08:00', label: '08:00' },
  { value: '10:00', label: '10:00' },
  { value: '12:00', label: '12:00' },
  { value: '14:00', label: '14:00' },
  { value: '16:00', label: '16:00' },
  { value: '18:00', label: '18:00' },
  { value: '20:00', label: '20:00' }
];

export default function ReservasLazer() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedArea, setSelectedArea] = useState('1');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('18:00');

  const handleCreateReservation = () => {
    if (!selectedDate) {
      toast.error('Selecione uma data');
      return;
    }

    const area = leisureAreas.find(a => a.id === selectedArea);
    if (!area) return;

    // Validar horário de funcionamento
    if (startTime < area.openTime || endTime > area.closeTime) {
      toast.error(`${area.name} funciona de ${area.openTime} às ${area.closeTime}`);
      return;
    }

    // Validar capacidade
    if (area.currentBookings >= area.capacity) {
      toast.error('Capacidade máxima atingida para este horário');
      return;
    }

    const newReservation: Reservation = {
      id: String(Date.now()),
      areaId: area.id,
      areaName: area.name,
      date: selectedDate.toISOString().split('T')[0],
      startTime,
      endTime,
      apartment: '101'
    };

    setReservations([...reservations, newReservation]);
    setOpen(false);
    toast.success('Reserva realizada com sucesso!');
  };

  const getCapacityBadge = (area: LeisureArea) => {
    const percentage = (area.currentBookings / area.capacity) * 100;
    if (percentage >= 90) {
      return <Badge variant="destructive">Quase Lotado</Badge>;
    } else if (percentage >= 60) {
      return <Badge className="bg-orange-500">Moderado</Badge>;
    }
    return <Badge className="bg-green-500">Disponível</Badge>;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <CalendarIcon className="size-8" />
            Reservas de Lazer
          </h1>
          <p className="text-gray-500">
            Reserve áreas comuns do condomínio
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" size="lg">
              <Plus className="size-5" />
              Nova Reserva
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Fazer Reserva</DialogTitle>
              <DialogDescription>
                Escolha a área, data e horário desejados
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Área de Lazer</Label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    {leisureAreas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.name} (Cap: {area.capacity})
                      </option>
                    ))}
                  </select>
                  {leisureAreas.find(a => a.id === selectedArea) && (
                    <p className="text-xs text-gray-500 mt-1">
                      <Clock className="size-3 inline mr-1" />
                      Funcionamento: {leisureAreas.find(a => a.id === selectedArea)?.openTime} - {leisureAreas.find(a => a.id === selectedArea)?.closeTime}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Hora Inicial</Label>
                    <select 
                      className="w-full mt-1 p-2 border rounded-md"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Hora Final</Label>
                    <select 
                      className="w-full mt-1 p-2 border rounded-md"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    >
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button className="w-full" onClick={handleCreateReservation}>
                  Confirmar Reserva
                </Button>
              </div>
              <div>
                <Label className="mb-2 block">Selecione a Data</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Áreas Disponíveis */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Áreas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leisureAreas.map((area) => (
            <Card key={area.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {area.name}
                  {getCapacityBadge(area)}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="size-4" />
                    {area.openTime} - {area.closeTime}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="size-4 text-gray-600" />
                    <span className="text-gray-600">Capacidade: {area.capacity}</span>
                  </div>
                  <span className="font-medium">{area.currentBookings}/{area.capacity}</span>
                </div>
                {area.currentBookings >= area.capacity * 0.9 && (
                  <div className="mt-2 flex items-start gap-2 text-xs text-orange-600">
                    <AlertCircle className="size-4 mt-0.5" />
                    <span>Capacidade quase atingida</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Minhas Reservas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Minhas Reservas</h2>
        {reservations.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Você ainda não tem reservas
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{reservation.areaName}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-4" />
                          {new Date(reservation.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {reservation.startTime} - {reservation.endTime}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500">Confirmada</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
