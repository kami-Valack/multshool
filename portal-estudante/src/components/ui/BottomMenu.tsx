"use client";
import styled from "styled-components";
import HomeSvg from "@/assets/icons/Home.svg";
import CreditCard from "@/assets/icons/creditcard.png";
import Multibot from "@/assets/icons/multiBot.png";
import User from "@/assets/icons/User.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const MenuContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 10px;
  z-index: 1000;
`;

const MenuItem = styled.button<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  transition: all 0.2s ease;
`;

const MenuIconContainer = styled.div<{ $isActive?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isActive ? "#6C5F8D" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  /* Aplicar filtro apenas aos elementos filhos (imagem) */
  img {
    filter: ${(props) =>
      props.$isActive 
        ? "brightness(0) invert(1)" /* Branco quando ativo */
        : "brightness(0.4)"};        /* Cinza escuro quando inativo */
    transition: filter 0.2s ease;
  }
`;

const MenuLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.$isActive ? props.theme.colors.primary : "#666")};
  font-weight: ${(props) => (props.$isActive ? props.theme.fonts.weight.regular : props.theme.fonts.weight.regular)};
  transition: all 0.2s ease;
`;

export default function BottomMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Início", icon: HomeSvg, route: "/estudante/dashboard" },
    { label: "Cartões", icon: CreditCard, route: "/estudante/cartoes" },
    { label: "MultiBot", icon: Multibot, route: "/estudante/multibot" },
    { label: "Perfil", icon: User, route: "/estudante/perfil" },
  ];

  // Função para verificar se a rota está ativa
  const isRouteActive = (route: string) => {
    // Remove a última barra se existir
    const normalizedPathname = pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;
    
    const normalizedRoute = route.endsWith("/") && route.length > 1
      ? route.slice(0, -1)
      : route;

    // Verifica se o pathname começa com a rota (para pegar subpastas também)
    return normalizedPathname === normalizedRoute || 
           normalizedPathname.startsWith(normalizedRoute + "/");
  };

  return (
    <MenuContainer>
      {menuItems.map((item) => {
        const isActive = isRouteActive(item.route);
        
        return (
          <MenuItem
            key={item.label}
            $isActive={isActive}
            onClick={() => router.push(item.route)}
          >
            <MenuIconContainer $isActive={isActive}>
              <Image
                src={item.icon}
                alt={item.label}
                width={18}
                height={18}
              />
            </MenuIconContainer>
            <MenuLabel $isActive={isActive}>{item.label}</MenuLabel>
          </MenuItem>
        );
      })}
    </MenuContainer>
  );
}