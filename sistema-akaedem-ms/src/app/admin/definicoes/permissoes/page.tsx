"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  settingsService,
  type PermissionProfile,
} from "@/lib/api/services/settings.service";

const AVAILABLE = [
  "*",
  "finance.*",
  "students.*",
  "enrollments.*",
  "teachers.*",
  "announcements.*",
  "reports.*",
  "settings.*",
];

export default function PermissoesPage() {
  const [profiles, setProfiles] = useState<PermissionProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const load = async () => {
    setLoading(true);
    try {
      setProfiles(await settingsService.listPermissionProfiles());
    } catch (e: any) {
      toast.error(e.message || "Erro ao carregar perfis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const togglePerm = (p: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(p)
        ? prev.permissions.filter((x) => x !== p)
        : [...prev.permissions, p],
    }));
  };

  const handleCreate = async () => {
    if (!form.name.trim() || form.permissions.length === 0) {
      toast.error("Nome e pelo menos uma permissão são obrigatórios");
      return;
    }
    setSaving(true);
    try {
      await settingsService.createPermissionProfile(form);
      toast.success("Perfil criado");
      setOpen(false);
      setForm({ name: "", description: "", permissions: [] });
      await load();
    } catch (e: any) {
      toast.error(e.message || "Erro ao criar perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: PermissionProfile) => {
    if (p.is_system) {
      toast.error("Perfis de sistema não podem ser eliminados");
      return;
    }
    try {
      await settingsService.deletePermissionProfile(p.id);
      toast.success("Perfil eliminado");
      await load();
    } catch (e: any) {
      toast.error(e.message || "Erro ao eliminar");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfis e permissões</h1>
          <p className="text-muted-foreground">
            Defina papéis de acesso para a equipa da instituição
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Novo perfil
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {profiles.map((p) => (
            <Card key={p.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-4 w-4" /> {p.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {p.description || "Sem descrição"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {p.is_system && <Badge variant="secondary">Sistema</Badge>}
                  {!p.is_system && (
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {(p.permissions || []).map((perm) => (
                  <Badge key={perm} variant="outline">
                    {perm}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo perfil de permissões</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Permissões</Label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE.map((p) => (
                  <Button
                    key={p}
                    type="button"
                    size="sm"
                    variant={form.permissions.includes(p) ? "default" : "outline"}
                    onClick={() => togglePerm(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
