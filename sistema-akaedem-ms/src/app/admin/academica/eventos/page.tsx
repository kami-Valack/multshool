"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eventsService, type SchoolEvent } from "@/lib/api/services/events.service";

const vazio = () => ({
  title: "",
  description: "",
  location: "",
  starts_at: "",
  price: "0",
});

export default function EventosEscolaPage() {
  const [items, setItems] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(vazio());

  const load = async () => {
    setLoading(true);
    try {
      setItems(await eventsService.list());
    } catch (e: any) {
      toast.error(e.message || "Erro ao carregar eventos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const criar = async () => {
    if (!form.title.trim() || !form.starts_at) {
      toast.error("Título e data são obrigatórios");
      return;
    }
    setSaving(true);
    try {
      await eventsService.create({
        title: form.title.trim(),
        description: form.description,
        location: form.location,
        starts_at: new Date(form.starts_at).toISOString(),
        price: Number(form.price) || 0,
        is_published: true,
      });
      toast.success("Evento criado");
      setOpen(false);
      setForm(vazio());
      await load();
    } catch (e: any) {
      toast.error(e.message || "Erro ao criar evento");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Eventos</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo evento
        </Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> A carregar...
        </div>
      )}

      {!loading && items.length === 0 && (
        <p className="text-muted-foreground">Ainda não há eventos.</p>
      )}

      <div className="grid gap-3">
        {items.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  try {
                    await eventsService.remove(event.id);
                    toast.success("Evento eliminado");
                    await load();
                  } catch (e: any) {
                    toast.error(e.message || "Erro ao eliminar");
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>
                {new Date(event.starts_at).toLocaleString("pt-PT")}
                {event.location ? ` · ${event.location}` : ""}
              </p>
              {event.description && <p>{event.description}</p>}
              <div className="flex gap-2 pt-1">
                <Badge variant="outline">
                  {Number(event.price) > 0
                    ? `${Number(event.price).toLocaleString("pt-AO")} Kz`
                    : "Gratuito"}
                </Badge>
                <Badge variant="secondary">
                  {event.registrations_count ?? 0} inscrições
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo evento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div>
              <Label>Título</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Local</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div>
              <Label>Início</Label>
              <Input
                type="datetime-local"
                value={form.starts_at}
                onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
              />
            </div>
            <div>
              <Label>Preço (Kz). 0 = gratuito</Label>
              <Input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={criar} disabled={saving}>
              {saving ? "A guardar..." : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
