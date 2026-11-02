"use client";

import * as React from "react";
import {
 GraduationCapIcon,
  BookOpen,
  User2Icon,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  BotIcon,
  PieChart,
  Settings2,
  Bell,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

const data = {
  navMain: [
    {
      title: "Gestão académica",
      url: "#",
      icon: GraduationCapIcon,
      isActive: true,
      items: [
         {
          title: "Candidaturas",
          url: "/admin/academica/candidaturas",
        },
         {
          title: "Inscrições/matrículas",
          url: "/admin/academica/matriculas",
        },
        {
          title: "Cursos",
          url: "/admin/academica/cursos",
        },
        {
          title: "Turmas",
          url: "/admin/academica/turmas",
        },
        {
          title: "Horários",
          url: "/admin/academica/horarios",
        },
        // {
        //   title: "Presenças",
        //   url: "#",
        // },
        {
          title: "Certificações e diplomas",
          url: "certificacao",
        },
        // {
        //   title: "Calendário académico",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Gestão de docentes",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Gerir",
          url: "/admin/docentes/gerir",
        },
        {
          title: "Turmas e Docentes",
          url: "/admin/docentes/turmas",
        },
        {
          title: "Avaliações e Relatórios",
          url: "/admin/docentes/relatorios",
        },
      ],
    },
    {
      title: "Gestão de estudantes",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Gerir",
          url: "/admin/estudantes/gerir",
        },
        // {
        //   title: "Comunicação",
        //   url: "#",
        // },
        {
          title: "Transferências e recorrências",
          url: "/admin/estudantes/transferencias",
        },
      ],
    },
    {
      title: "Gestão financeira",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Propinas",
          url: "/admin/financeiro/propinas",
        },
        {
          title: "Pagamentos",
          url: "/admin/financeiro/pagamentos",
        },
        {
          title: "Facturas/recibos",
          url: "/admin/financeiro/recibos",
        },
        {
          title: "Débitos e multas",
          url: "/admin/financeiro/debitosemultas",
        },
        {
          title: "Relatórios financeiros",
          url: "/admin/financeiro/relatorios",
        },
      ],
    },
    {
      title: "Relatórios e IA",
      url: "#",
      icon: BotIcon,
      items: [
        {
          title: "Relatórios gerais",
          url: "/admin/relatorios/gerais",
        },
        // {
        //   title: "Financeiros",
        //   url: "#",
        // },
        // {
        //   title: "Docentes",
        //   url: "#",
        // },
        {
          title: "Assistente de IA",
          url: "/admin/relatorios/assistencia",
        },
      ],
    },

    {
      title: "Comunicação e notificações",
      url: "#",
      icon: Bell,
      items: [
        {
          title: "Mensagens internas",
          url: "/admin/comunicacao/mensagens",
        },
        {
          title: "Anúncios e comunicados",
          url: "/admin/comunicacao/anuncios",
        },
      ],
    },
    {
      title: "Definições",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Perfis e permissões",
          url: "/admin/definicoes/permissoes",
        },
        {
          title: "Logs de actividade",
          url: "/admin/definicoes/logs",
        },
      ],
    },
  ],
  atalhos: [
    {
      name: "Assistente de IA",
      url: "/admin/relatorios/assistencia",
      icon: BotIcon,
    },
    {
      name: "Anúncios e comunicados",
      url: "/admin/comunicacao/anuncios",
      icon: Bell,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, schoolProfile } = useAuth();

  const schoolName =
    schoolProfile?.name || user?.school?.name || user?.name || "Instituição";

  const userData = {
    name: schoolName,
    email: user?.email || "",
    avatar: schoolProfile?.logo_path || user?.school?.logo_path || "",
  };

  const company = [
    {
      name: schoolName,
      logo: GalleryVerticalEnd,
      plan: schoolProfile?.acronym || "Instituição",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={company} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects atalhos={data.atalhos} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
