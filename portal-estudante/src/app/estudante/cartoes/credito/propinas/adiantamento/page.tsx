"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import Button from "@/components/ui/Button";

export default function AdiantamentoRedirect() {
  const router = useRouter();
  return (
    <>
      <Header variant="withBack" title="Propinas" />
      <div style={{ padding: 24, textAlign: "center" }}>
        <p>Para pagar um mês futuro, escolha a propina na lista.</p>
        <div style={{ marginTop: 20 }}>
          <Button
            bgColor="primary"
            textColor="#FFFFFF"
            text="Ver propinas"
            hasBorder={false}
            onClick={() => router.push("/estudante/cartoes/credito/propinas")}
          />
        </div>
      </div>
      <BottomMenu />
    </>
  );
}
