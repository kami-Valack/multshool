"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/assets/icons/menuLateral/logo.png";
import Consultas from "@/assets/icons/menuLateral/consulta.png";
import Transfers from "@/assets/icons/menuLateral/transfers.png";
import Mensalidades from "@/assets/icons/menuLateral/mensalidades.png";
import Pagamentos from "@/assets/icons/menuLateral/pagamento.png";
import Educacional from "@/assets/icons/menuLateral/educacional.png";
import Definicoes from "@/assets/icons/menuLateral/definicoes.png";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 2000;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: all 0.3s ease-in-out;
`;

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 210px;
  height: 100vh;
  background-color: #fff;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 2100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const MenuHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 20px 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const MenuContent = styled.div`
  flex: 1;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  margin: 0 16px;
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 12px;

  .left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  span {
    font-size: 12px;
    color: ${(props) => props.theme.colors.textBlack};
  }
`;

const MenuFooter = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: transparent;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const menuItems = [
  { icon: Consultas, label: "Consultas", id: "consultas" },
  { icon: Transfers, label: "Transferências", id: "transferencias" },
  { icon: Mensalidades, label: "Mensalidades", id: "mensalidades" },
  { icon: Pagamentos, label: "Pagamentos", id: "pagamentos" },
  { icon: Educacional, label: "Educacional", id: "educacional" },
  { icon: Definicoes, label: "Definições", id: "definicoes" },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleItemClick = (itemId: string) => {
    console.log(`Clicou em: ${itemId}`);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Mesmo com erro, redirecionar para login
      onClose();
      router.push("/login");
    }
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <MenuContainer isOpen={isOpen}>
        <div>
          <MenuHeader>
            <LogoContainer>
              <Image src={Logo.src} alt="" width={98} height={74} />
            </LogoContainer>
          </MenuHeader>

          <MenuContent>
            {menuItems.map((item) => (
              <MenuItem key={item.id} onClick={() => handleItemClick(item.id)}>
                <div className="left">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={12}
                    height={14}
                  />
                  <span>{item.label}</span>
                </div>
              </MenuItem>
            ))}
          </MenuContent>
        </div>

        <MenuFooter>
          <LogoutButton onClick={handleLogout}>Terminar sessão</LogoutButton>
        </MenuFooter>
      </MenuContainer>
    </>
  );
}
