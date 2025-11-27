"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import RefreshIcon from "@/assets/icons/refresh-double.png";
import ViewGrid from "@/assets/icons/view-grid.svg";
import GraduationCap from "@/assets/icons/graduation-cap.svg";
import Cash from "@/assets/icons/lot-of-cash.png";
import AlotCash from "@/assets/icons/lot-of-cash.svg";
import Clip from "@/assets/icons/clip.png";
import Image from "next/image";
import { CardType } from "@/components/ui/RecentSection";
import Movimentos from "@/assets/icons/menugrid2/movimentos.svg"
import Pagamentos from "@/assets/icons/menugrid2/pagamentos.png"
import Informacoes from "@/assets/icons/menugrid2/info.png"

export type MenuSection = "recentes" | "pendencias" | "propinas" | "consulta";
export type MenuSectionSimple = "movimentos" | "pagamentos" | "informacoes";

// Nova interface para a variante simples
interface MenuGridSimpleProps {
  variant: "simple";
  activeSection: MenuSectionSimple;
  onSectionChange: (section: MenuSectionSimple) => void;
  routes?: {
    movimentos?: string;
    pagamentos?: string;
    informacoes?: string;
  };
}

// Interface original
interface MenuGridOriginalProps {
  variant?: "original";
  activeSection: MenuSection;
  onSectionChange: (section: MenuSection) => void;
  activeCard?: CardType;
}

type MenuGridProps = MenuGridSimpleProps | MenuGridOriginalProps;

const GridContainer = styled.div<{ $variant?: "original" | "simple" }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$variant === "simple" ? "repeat(3, 1fr)" : "repeat(4, 1fr)"};
  gap: 0px;
  margin: 30px 0;
  justify-content: center;
`;

const MenuItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
`;

const MenuIcon = styled.div<{ $isActive?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary
      : props.theme.colors.primary_600};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  transition: background-color 0.2s ease;
`;

const MenuLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 13px;
  color: ${(props) =>
    props.$isActive ? "#9A7FB8" : props.theme.colors.textBlack};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  text-align: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  transition: color 0.2s ease;
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`;

// Ícones SVG inline para a nova variante
const MovimentosIcon = () => (
  <Image
    src={Movimentos}
    alt={`Ícone de Movimentos`}
    width={20}
    height={20}
  />
);

const PagamentosIcon = () => (
  <Image
    src={Pagamentos}
    alt={`Ícone de Pagamentos`}
    width={20}
    height={20}
  />
);

const InformacoesIcon = () => (
    <Image
    src={Informacoes}
    alt={`Ícone de Informacoes`}
    width={20}
    height={6}
  />
);

export default function MenuGrid(props: MenuGridProps) {
  const router = useRouter();
  const variant = props.variant || "original";

  // Renderização da variante simples
  if (variant === "simple") {
    const { activeSection, onSectionChange, routes } =
      props as MenuGridSimpleProps;

    // Rotas padrão se não forem especificadas
    const defaultRoutes = {
      movimentos: "credito/movimentos",
      pagamentos: "credito/pagamentos",
      informacoes: "credito/informacoes",
    };

    const finalRoutes = { ...defaultRoutes, ...routes };

    const handleSectionClick = (section: MenuSectionSimple) => {
      onSectionChange(section);
      router.push(finalRoutes[section]);
    };

    return (
      <GridContainer $variant="simple">
        {/* Movimentos */}
        <MenuItem onClick={() => handleSectionClick("movimentos")}>
          <MenuIcon >
            <MovimentosIcon />
          </MenuIcon>
          <MenuLabel>
            Movimentos
          </MenuLabel>
        </MenuItem>

        {/* Pagamentos */}
        <MenuItem onClick={() => handleSectionClick("pagamentos")}>
          <MenuIcon $isActive={activeSection === "pagamentos"}>
            <PagamentosIcon />
          </MenuIcon>
          <MenuLabel $isActive={activeSection === "pagamentos"}>
            Pagamentos
          </MenuLabel>
        </MenuItem>

        {/* Informações */}
        <MenuItem onClick={() => handleSectionClick("informacoes")}>
          <MenuIcon $isActive={activeSection === "informacoes"}>
            <InformacoesIcon />
          </MenuIcon>
          <MenuLabel $isActive={activeSection === "informacoes"}>
            Informações
          </MenuLabel>
        </MenuItem>
      </GridContainer>
    );
  }

  // Renderização da variante original
  const {
    activeSection,
    onSectionChange,
    activeCard = "credit",
  } = props as MenuGridOriginalProps;
  const isStudentCard = activeCard === "student";

  // Labels baseados no tipo de cartão
  const getLabels = () => {
    if (isStudentCard) {
      return {
        recentes: "Recentes",
        pendencias: "Pendências",
        propinas: "Movimentos",
        consulta: "Documentos",
      };
    }
    return {
      recentes: "Recentes",
      pendencias: "Pendências",
      propinas: "Propinas",
      consulta: "Consulta",
    };
  };

  const labels = getLabels();

  return (
    <GridContainer $variant="original">
      {/* Recentes */}
      <MenuItem onClick={() => onSectionChange("recentes")}>
        <MenuIcon $isActive={activeSection === "recentes"}>
          <IconWrapper>
            <Image
              src={RefreshIcon}
              alt="Ícone Recentes"
              width={20}
              height={20}
            />
          </IconWrapper>
        </MenuIcon>
        <MenuLabel $isActive={activeSection === "recentes"}>
          {labels.recentes}
        </MenuLabel>
      </MenuItem>

      {/* Pendências */}
      <MenuItem onClick={() => onSectionChange("pendencias")}>
        <MenuIcon $isActive={activeSection === "pendencias"}>
          <IconWrapper>
            <Image
              src={ViewGrid}
              alt="Ícone Pendências"
              width={20}
              height={20}
            />
          </IconWrapper>
        </MenuIcon>
        <MenuLabel $isActive={activeSection === "pendencias"}>
          {labels.pendencias}
        </MenuLabel>
      </MenuItem>

      {/* Propinas / Movimentos */}
      <MenuItem onClick={() => onSectionChange("propinas")}>
        <MenuIcon $isActive={activeSection === "propinas"}>
          <IconWrapper>
            <Image
              src={activeSection === "propinas" ? AlotCash : GraduationCap}
              alt={`Ícone ${labels.propinas}`}
              width={20}
              height={20}
            />
          </IconWrapper>
        </MenuIcon>
        <MenuLabel $isActive={activeSection === "propinas"}>
          {labels.propinas}
        </MenuLabel>
      </MenuItem>

      {/* Consulta / Documentos */}
      <MenuItem onClick={() => onSectionChange("consulta")}>
        <MenuIcon $isActive={activeSection === "consulta"}>
          <IconWrapper>
            <Image
              src={activeSection === "consulta" ? Clip : Cash}
              alt={`Ícone ${labels.consulta}`}
              width={20}
              height={20}
            />
          </IconWrapper>
        </MenuIcon>
        <MenuLabel $isActive={activeSection === "consulta"}>
          {labels.consulta}
        </MenuLabel>
      </MenuItem>
    </GridContainer>
  );
}
