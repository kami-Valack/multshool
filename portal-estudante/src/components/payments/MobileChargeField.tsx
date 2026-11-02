"use client";

import styled from "styled-components";
import { normalizeAngolaMobile } from "@/utils/angolaPhone";

const Wrap = styled.div`
  width: 90%;
  margin-top: 12px;
`;

const Label = styled.p`
  font-size: 13px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.primary};
`;

const Hint = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.foreground};
  margin-top: 6px;
  opacity: 0.85;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 30px;
  padding: 0 16px;
  height: 45px;
`;

const Prefix = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.foreground};
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  color: ${(props) => props.theme.colors.foreground};
`;

type Props = {
  value: string;
  onChange: (nineDigits: string) => void;
  error?: string | null;
};

export function MobileChargeField({ value, onChange, error }: Props) {
  return (
    <Wrap>
      <Label>Telemóvel para receber a cobrança</Label>
      <Row>
        <Prefix>+244</Prefix>
        <Input
          type="tel"
          inputMode="numeric"
          maxLength={9}
          placeholder="923456789"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 9))}
        />
      </Row>
      <Hint>A cobrança GPO será enviada a este número (Multicaixa Express).</Hint>
      {error && (
        <Hint style={{ color: "#dc3545" }}>
          {error}
        </Hint>
      )}
      {value.length === 9 && !normalizeAngolaMobile(value) && (
        <Hint style={{ color: "#dc3545" }}>O número deve começar por 9.</Hint>
      )}
    </Wrap>
  );
}

export function isValidChargeMobile(nineDigits: string): boolean {
  return normalizeAngolaMobile(nineDigits) !== null;
}
