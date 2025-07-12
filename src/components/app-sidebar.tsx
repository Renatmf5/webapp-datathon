"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Decision Plataform.",
      logo: AudioWaveform,
      plan: "Startup",
    }
  ],
  navMain: [
    {
      title: "Candidatos",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Lista Candidatos",
          url: "/dashboard/candidatos",
        },
        {
          title: "Cadastrar Candidato",
          url: "/dashboard/create-candidato",
        }
      ],
    },
    {
      title: "Vagas",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Lista Vagas",
          url: "/dashboard/vagas",
        },
        {
          title: "Cadastrar Vaga",
          url: "/dashboard/create-vaga",
        },
      ],
    },
    {
      title: "Prospects",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Analise prospects",
          url: "/dashboard/prospects",
        }
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Introduction",
          url: "/documentation/introduction",
        },
        {
          title: "Models Report",
          url: "/documentation/model-report",
        },
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
