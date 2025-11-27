"use client";
import styled from "styled-components";
import BottomMenu from "./BottomMenu";

// Types
export interface Credor {
  id: string;
  nome: string;
  valorMaximo: string;
  logo: string;
  cor: string;
}

interface CredorListProps {
  credores: Credor[];
  labelSelecione?: string;
  labelValorMaximo?: string;
  onCredorSelect?: (credor: Credor) => void;
}

// Styled Components
const ListContainer = styled.div`
  width: 95%;
  padding: 0 16px;
  margin-top: 24px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
`;

const LabelSelecione = styled.span`
  font-size: 13px;
  color: #999;
  font-weight: 400;
`;

const LabelValorMaximo = styled.span`
  font-size: 13px;
  color: #999;
  font-weight: 400;
`;

const CredorItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.background_3};
  border: none;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0eef8;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CredorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoContainer = styled.div<{ $cor: string }>`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: ${(props) => props.$cor};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CredorNome = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
`;

const ValorMaximo = styled.span`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  color: ${(props) => props.theme.colors.textBlack};
`;


// Component
export default function ListCredit({
  credores,
  labelSelecione = "Selecione um credor",
  labelValorMaximo = "Valor máximo",
  onCredorSelect,
}: CredorListProps) {
  return (
    <>
    

      <ListContainer>
        <ListHeader>
          <LabelSelecione>{labelSelecione}</LabelSelecione>
          <LabelValorMaximo>{labelValorMaximo}</LabelValorMaximo>
        </ListHeader>

        {credores.map((credor) => (
          <CredorItem key={credor.id} onClick={() => onCredorSelect?.(credor)}>
            <CredorInfo>
              <LogoContainer $cor={credor.cor}>
                <Logo src={credor.logo} alt={credor.nome} />
              </LogoContainer>
              <CredorNome>{credor.nome}</CredorNome>
            </CredorInfo>
            <ValorMaximo>{credor.valorMaximo}</ValorMaximo>
          </CredorItem>
        ))}
      </ListContainer>
    </>
  );
}
