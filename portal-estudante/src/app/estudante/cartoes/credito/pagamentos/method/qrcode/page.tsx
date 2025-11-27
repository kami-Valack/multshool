"use client";

import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import { useNavigation } from "@/hooks/navigation";
import { useQRScanner } from "@/hooks/useQRScanner";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  min-height: 100vh;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const InstructionText = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.4;
`;

const CameraContainer = styled.div`
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #6c5f8d 0%, #6c5f8d 100%);
  border-radius: 24px;
  padding: 8px;
  margin-bottom: 32px;
  position: relative;
`;

const CameraFrame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
`;

const CanvasElement = styled.canvas`
  display: none;
`;

const TargetFrame = styled.div`
  position: absolute;
  width: 60%;
  height: 60%;
  border: 3px solid #fff;
  border-radius: 16px;
  z-index: 2;
  
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    border: 3px solid #4caf50;
  }

  &::before {
    top: -3px;
    left: -3px;
    border-right: none;
    border-bottom: none;
    border-top-left-radius: 16px;
  }

  &::after {
    top: -3px;
    right: -3px;
    border-left: none;
    border-bottom: none;
    border-top-right-radius: 16px;
  }
`;

const TargetCorners = styled.div`
  position: absolute;
  width: 60%;
  height: 60%;
  z-index: 2;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    border: 3px solid #4caf50;
  }

  &::before {
    bottom: -3px;
    left: -3px;
    border-right: none;
    border-top: none;
    border-bottom-left-radius: 16px;
  }

  &::after {
    bottom: -3px;
    right: -3px;
    border-left: none;
    border-top: none;
    border-bottom-right-radius: 16px;
  }
`;

const CameraPlaceholder = styled.div`
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 20px;
`;

const PaymentText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 24px;
`;

const ReferenceLink = styled.a`
  font-size: 16px;
  color: #6c5f8d;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
  padding-bottom: 80px;
  margin-bottom: 10px;

  &:hover {
    color: #5a4d73;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  padding: 10px;
`;

const SuccessMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(76, 175, 80, 0.95);
  color: white;
  padding: 20px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
`;

const CheckIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

const TestButton = styled.button`
  margin-top: 16px;
  padding: 12px 24px;
  background: #6c5f8d;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #5a4d73;
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  z-index: 3;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ScanningDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4caf50;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.8);
    }
  }
`;

export default function PaymentQRScreen() {
  const { navigateTo } = useNavigation();
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleQRCodeDetected = (data: string) => {
    setScannedData(data);
    console.log("QR Code detectado:", data);

    setTimeout(() => {
      navigateTo(
        `/estudante/cartoes/credito/pagamentos/confirmar?code=${data}`
      );
    }, 1500);
  };

  const { videoRef, canvasRef, error, isActive } = useQRScanner({
    onScan: handleQRCodeDetected,
    enabled: true,
    scanInterval: 300,
    facingMode: 'environment',
  });

  const handleTestScan = (code: string) => {
    navigateTo(`/estudante/cartoes/credito/pagamentos/confirmar?code=${code}`);
  };

  return (
    <>
      <Header variant="withBack" title="Pagamentos" />
      <Container>
        <InstructionText>
          Aponte a câmara para o
          <br />
          código QR do produto
        </InstructionText>

        <CameraContainer>
          <CameraFrame>
            {error ? (
              <CameraPlaceholder>
                <ErrorMessage>{error}</ErrorMessage>
              </CameraPlaceholder>
            ) : (
              <>
                <VideoElement ref={videoRef} playsInline />
                <CanvasElement ref={canvasRef} />
                
                {isActive && !scannedData && (
                  <>
                    <StatusIndicator>
                      <ScanningDot />
                      A procurar QR Code
                    </StatusIndicator>
                    <TargetFrame />
                    <TargetCorners />
                  </>
                )}

                {scannedData && (
                  <SuccessMessage>
                    <CheckIcon>✓</CheckIcon>
                    QR Code detectado!
                  </SuccessMessage>
                )}
              </>
            )}
          </CameraFrame>
        </CameraContainer>

        <PaymentText>para efectuar o pagamento</PaymentText>
        
        <ReferenceLink
          onClick={() => {
            navigateTo(`/estudante/cartoes/credito/pagamentos/method/ref`);
          }}
        >
          Efectuar pagamento por referência
        </ReferenceLink>
        <BottomMenu />
      </Container>
    </>
  );
}