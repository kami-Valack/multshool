"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdiantamentoFormRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/estudante/cartoes/credito/propinas");
  }, [router]);
  return null;
}
