"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserAvatar from "./Avatar";
import SideMenu from "./MenuLateral";
import { useAuth } from "@/contexts/AuthContext";
import { getFirstAndLastName } from "@/utils/cutName";
import ArrowLeft from "@/assets/icons/arrow_left_simple.svg";

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  // background-color: ${(props) => props.theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.family.poppins};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
`;

const Title = styled.h1<{ center?: boolean }>`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin: 0;
  text-align: center;;
`;

const MenuLateral = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.background_2};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    width: 18px;
    height: 2px;
    background: #000;
  }

  span::before,
  span::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 2px;
    background: #666;
  }

  span::before {
    top: -6px;
  }

  span::after {
    top: 6px;
  }
`;

const BackButton = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CircleButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.textBlack || "#000"};
    width: 22px;
    height: 22px;
  }
`;

type HeaderProps = {
  variant?: "default" | "withBack" | "receipt";
  title?: string;
};

export default function Header({ variant = "default", title }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const studentFullName = user ? getFirstAndLastName(user.name) : "Estudante";

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      <HeaderContainer>
        {variant === "default" && (
          <UserInfo>
            <Avatar>
              <UserAvatar size={45} name={user?.name || ""} />
            </Avatar>
            <Title>Olá, {studentFullName}</Title>
            <MenuLateral onClick={handleMenuToggle}>
              <span />
            </MenuLateral>
          </UserInfo>
        )}

        {variant === "withBack" && (
          <UserInfo>
            <BackButton onClick={() => router.back()}>
              <Image src={ArrowLeft} alt="Voltar" width={14} height={14} />
            </BackButton>
            <Title>{title}</Title>
            <MenuLateral onClick={handleMenuToggle}>
              <span />
            </MenuLateral>
          </UserInfo>
        )}

        {variant === "receipt" && (
          <>
            <CircleButton onClick={() => router.back()}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
            </CircleButton>
            <Title center>{title || "Recibo"}</Title>
            <CircleButton onClick={() => console.log("Partilhar")}>
               <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000000"
                d="M11.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 1 1-2 0V5.414L9.707 6.707a1 1 0 0 1-1.414-1.414l3-3zM4 11a2 2 0 0 1 2-2h2a1 1 0 0 1 0 2H6v9h12v-9h-2a1 1 0 1 1 0-2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z"
              ></path>
            </svg>
            </CircleButton>
          </>
        )}
      </HeaderContainer>

      <SideMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}
