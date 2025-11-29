"use client"


import Image from "next/image";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import DynamicTable from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import BG from "@/assets/backgrounds/bg.png";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/lib/api/services/profile.service";
import { useEffect, useState } from "react";

import { Data } from "@/mocks/dashboard";
import NavbarH from "@/components/ui/heroui/navbar";

// Dados mock para exemplo
const mockData = [
  {
    id: 1,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    name: "Maria Silva Santos",
    enrollmentNumber: "2024001",
    course: "Engenharia Informática",
    class: "EI-3A",
    enrollmentDate: "2024-11-01",
    status: "Ativa",
    phone: "+244 923 456 789",
    email: "maria.santos@email.com",
  },
  {
    id: 2,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    name: "João Pedro Mendes",
    enrollmentNumber: "2024002",
    course: "Gestão de Empresas",
    class: "GE-2B",
    enrollmentDate: "2024-11-02",
    status: "Pendente",
    phone: "+244 924 567 890",
    email: "joao.mendes@email.com",
  },
  {
    id: 3,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    name: "Ana Carolina Ferreira",
    enrollmentNumber: "2024003",
    course: "Medicina",
    class: "MED-1A",
    enrollmentDate: "2024-11-03",
    status: "Ativa",
    phone: "+244 925 678 901",
    email: "ana.ferreira@email.com",
  },
  {
    id: 4,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    name: "Carlos Alberto Costa",
    enrollmentNumber: "2024004",
    course: "Direito",
    class: "DIR-4C",
    enrollmentDate: "2024-11-03",
    status: "Ativa",
    phone: "+244 926 789 012",
    email: "carlos.costa@email.com",
  },
  {
    id: 5,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
    name: "Patrícia Lopes Oliveira",
    enrollmentNumber: "2024005",
    course: "Arquitectura",
    class: "ARQ-2A",
    enrollmentDate: "2024-11-04",
    status: "Pendente",
    phone: "+244 927 890 123",
    email: "patricia.oliveira@email.com",
  },
];

export default function Page() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.role === 'school') {
        try {
          const profile = await profileService.getProfile();
          setProfileData(profile);
        } catch (error) {
          console.error('Erro ao carregar perfil:', error);
        }
      }
    };

    loadProfile();
  }, [user]);

  const institutionName = profileData?.name || user?.name || 'Instituição';

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />

      <SidebarInset>
        {/* <SiteHeader /> */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <NavbarH />

            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Hero Section with Image Overlay */}
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
                data={mockData}
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
