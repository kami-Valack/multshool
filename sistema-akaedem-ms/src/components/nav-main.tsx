"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { HomeIcon } from "lucide-react"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: { title: string; url: string }[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname() // pega a rota atual

  // Função para determinar se o item ou algum subitem está ativo
  const isActive = (item: NavItem) => {
    if (item.url === pathname) return true
    if (item.items?.some((sub) => sub.url === pathname)) return true
    return false
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {/* Dashboard */}
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Dashboard"
            className={pathname === "/admin" ? "bg-primary text-primary-foreground" : ""}
          >
            <HomeIcon />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Outros itens */}
        {items.map((item) => {
          const active = isActive(item) // true se item ou subitem ativo
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={active}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={active ? "bg-primary text-primary-foreground" : ""}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.items && item.items.length > 0 && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {/* Subitens */}
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a
                            href={subItem.url}
                            className={
                              pathname === subItem.url
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }
                          >
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
