"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Arrow from "@/assets/icons/arrow_bt.svg";
import Image from "next/image";

// --- Mocked Data ---
const mockedEnrollment = {
  student: { fullName: "João Silva" },
  course: { name: "Engenharia Informática" },
  year: "2025/26",
  semester: "VIº",
  classroom: "BAA3 - 2º andar",
  group: "EINF-VI",
  period: "Manhã",
};

// -----------------------------
// Compact Card Styled Components
// -----------------------------
const CompactCardContainer = styled.div<{ variant?: "white" | "default" }>`
  background: ${(props) =>
    props.variant === "white" ? "#ffffff" : props.theme.colors.background_2};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  width: 90%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  gap: 22px;
  color: ${(props) =>
    props.variant === "white" ? "#111111" : props.theme.colors.foreground};
`;

const CompactRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 24px;
`;

const CompactLabel = styled.span`
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  opacity: 0.8;
`;

const CompactValue = styled.span<{ color?: "primary" | "success" | "default" }>`
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => {
    switch (props.color) {
      case "success":
        return "#16a34a"; // green-600
      case "primary":
        return props.theme.colors.primary;
      default:
        return props.theme.colors.primary;
    }
  }};
`;

// -----------------------------
// Compact Card Component
// -----------------------------
export function ConfirmacaoCardCompacto({
  variant = "default",
}: {
  variant?: "white" | "default";
}) {
  const enrollment = mockedEnrollment; // usando dados mockados

  return (
    <CompactCardContainer variant={variant}>
      <CompactRow>
        <CompactLabel>Ano lectivo</CompactLabel>
        <CompactValue>{enrollment.year}</CompactValue>
      </CompactRow>

      <CompactRow>
        <CompactLabel>Semestre</CompactLabel>
        <CompactValue>{enrollment.semester}</CompactValue>
      </CompactRow>

      <CompactRow>
        <CompactLabel>Sala</CompactLabel>
        <CompactValue>{enrollment.classroom}</CompactValue>
      </CompactRow>

      <CompactRow>
        <CompactLabel>Turma</CompactLabel>
        <CompactValue color="success">{enrollment.group}</CompactValue>
      </CompactRow>

      <CompactRow>
        <CompactLabel>Período</CompactLabel>
        <CompactValue>{enrollment.period}</CompactValue>
      </CompactRow>
    </CompactCardContainer>
  );
}

// -----------------------------
// Full Card (original) - mockado
// -----------------------------
export default function ConfirmacaoCard() {
  const enrollment = mockedEnrollment;
  const [isOpen, setIsOpen] = useState(false);
  const [periodo, setPeriodo] = useState(enrollment.period);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (value: string) => {
    setPeriodo(value);
    setIsOpen(false);
  };

  return (
    <CardContainer>
      <Row>
        <Label>Nome</Label>
        <Value bold>{enrollment.student.fullName}</Value>
      </Row>

      <Row>
        <Label>Ano lectivo</Label>
        <Value bold>{enrollment.year}</Value>
      </Row>

      <Row>
        <Label>Semestre</Label>
        <Value bold>{enrollment.semester}</Value>
      </Row>

      <Row>
        <Label>Ano académico</Label>
        <Value bold>3º</Value>
      </Row>

      <Row>
        <Label>Período</Label>
        <Value bold onClick={toggleDropdown}>
          {periodo} <Image src={Arrow} width={10} height={10} alt="" />
          {isOpen && (
            <Dropdown>
              <DropdownItem onClick={() => handleSelect("Manhã")}>
                Manhã
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect("Tarde")}>
                Tarde
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect("Noite")}>
                Noite
              </DropdownItem>
            </Dropdown>
          )}
        </Value>
      </Row>

      <Row>
        <Label>Turma</Label>
        <Value bold style={{ color: "green" }}>
          {enrollment.group}
        </Value>
      </Row>

      <Row>
        <Label>Curso</Label>
        <Value bold>{enrollment.course.name}</Value>
      </Row>
    </CardContainer>
  );
}

// -----------------------------
// Styled Components originais
// -----------------------------
const CardContainer = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  margin: 30px 0 40px 0;
  gap: 23px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: ${(props) => props.theme.colors.foreground};
  font-size: 14px;
`;

const Value = styled.span<{ bold?: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  position: relative;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 28px;
  right: 0;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 6px 0;
  margin: 0;
  width: 120px;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
