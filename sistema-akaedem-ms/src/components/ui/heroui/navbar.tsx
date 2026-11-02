"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/getInitials";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavbarH() {
  const { user, schoolProfile, logout } = useAuth();

  const displayName =
    schoolProfile?.name || user?.school?.name || user?.name || "Instituição";
  const displayEmail = user?.email || "";
  const avatarSrc = schoolProfile?.logo_path || user?.school?.logo_path || undefined;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Navbar maxWidth="full" className="border-b border-border/60 bg-background/80 backdrop-blur">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit ml-2 truncate max-w-[240px]">
          {displayName}
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={getInitials(displayName)}
              size="sm"
              src={avatarSrc}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Acções do perfil">
            <DropdownItem key="profile" className="h-14 gap-2" textValue={displayEmail}>
              <p className="font-semibold">Sessão</p>
              <p className="font-semibold text-default-500 truncate">{displayEmail}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
              Terminar sessão
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
