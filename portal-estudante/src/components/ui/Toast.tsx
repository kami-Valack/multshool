"use client";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0px); }
`;

const ToastContainer = styled.div<{ $type?: "success" | "error" | "info" | "warning" }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => {
    switch (props.$type) {
      case "success":
        return "#0EBC29";
      case "error":
        return "#EC4242";
      case "warning":
        return "#F19E0F";
      default:
        return "#111";
    }
  }};
  color: #fff;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  animation: ${fadeIn} 0.25s ease-out;
  z-index: 9999;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
  type?: "success" | "error" | "info" | "warning";
}

export default function Toast({ message, onClose, duration = 2000, type = "info" }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return <ToastContainer $type={type}>{message}</ToastContainer>;
}
