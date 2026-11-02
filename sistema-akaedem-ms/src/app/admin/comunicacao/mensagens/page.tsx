"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function MensagensPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mensagens internas</h1>
        <p className="text-muted-foreground">
          Canal interno entre secretaria, docentes e administração
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> Em preparação
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          As mensagens internas serão ligadas ao serviço de mensagens
          (`ms-message-api`). Por agora use <strong>Anúncios e comunicados</strong>{" "}
          para avisos oficiais à comunidade.
        </CardContent>
      </Card>
    </div>
  );
}
