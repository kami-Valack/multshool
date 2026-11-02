"use client";

import Image from "next/image";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import DynamicTable from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import BG from "@/assets/backgrounds/bg.png";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { user, schoolProfile } = useAuth();

  const institutionName =
    schoolProfile?.name || user?.school?.name || user?.name || "Instituição";

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="relative h-64 mx-4 lg:mx-6 rounded-lg overflow-hidden">
        <Image
          src={BG.src}
          alt="Welcome"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Bem-vindo de volta, {institutionName}
          </h1>
          <span className="text-lg text-white/90">
            {new Date().toLocaleDateString("pt-PT", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DynamicTable
        title="Candidaturas Recentes"
        description="Gerencie e visualize as candidaturas mais recentes"
        addButtonText="Nova Candidatura"
        searchPlaceholder="Buscar por nome ou candidatura..."
        data={[]}
        fieldLabels={{
          name: "Nome do Candidato",
          enrollmentNumber: "Nº Candidatura",
          course: "Curso",
          class: "Turma",
          enrollmentDate: "Data de Candidatura",
          status: "Estado",
          phone: "Telefone",
          email: "Email de Contacto",
        }}
        onAddNew={() => console.log("Nova candidatura")}
      />
    </div>
  );
}
