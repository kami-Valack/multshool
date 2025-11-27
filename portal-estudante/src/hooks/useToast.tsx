"use client";
import { useState } from "react";
import Toast from "@/components/ui/Toast";

export type ToastType = "success" | "error" | "info" | "warning";

export function useToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastType>("info");

  const showToast = (message: string, type: ToastType = "info") => {
    setToastMessage(message);
    setToastType(type);
  };

  const ToastElement = toastMessage ? (
    <Toast 
      message={toastMessage} 
      type={toastType}
      onClose={() => setToastMessage(null)} 
    />
  ) : null;

  return { showToast, ToastElement };
}
