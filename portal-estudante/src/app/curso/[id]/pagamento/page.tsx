"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { paymentService, PaymentTokenResponse } from '@/services/paymentService';
import { studentService } from '@/services/studentService';
import { useToast } from '@/hooks/useToast';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const PaymentCard = styled.div`
  max-width: 800px;
  margin: 40px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #718096;
  text-align: center;
  margin-bottom: 30px;
`;

const CourseInfo = styled.div`
  background: #f7fafc;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
`;

const CourseName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
`;

const CourseAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #6b46c1;
`;

const IframeContainer = styled.div`
  width: 100%;
  min-height: 600px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  background: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #718096;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #22543d;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #6b46c1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(107, 70, 193, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 12px;
  background: white;
  color: #6b46c1;
  border: 2px solid #6b46c1;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #f7fafc;
  }
`;

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { showToast, ToastElement } = useToast();
  const courseId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [courseInfo, setCourseInfo] = useState<{ name: string; price: number } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push(`/curso/${courseId}`);
      return;
    }

    initializePayment();
  }, [courseId, user, isAuthenticated]);

  // Listener para postMessage do GPO
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validar origem para garantir segurança
      if (event.origin !== 'https://gpo.emis.co.ao') {
        return;
      }

      console.log('Received message from GPO:', event.data);

      // Processar dados da mensagem
      if (event.data && typeof event.data === 'object') {
        const status = event.data.status || event.data.Status;
        
        if (status === 'completed' || status === 'success' || status === 'paid') {
          handlePaymentSuccess();
        } else if (status === 'failed' || status === 'error' || status === 'cancelled') {
          handlePaymentFailure(event.data.message || 'Pagamento falhou');
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [paymentId]);

  const initializePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar informações do curso
      const course = await studentService.getCourse(courseId);
      setCourseInfo({
        name: course.name,
        price: course.price || 0,
      });

      // Gerar token de pagamento
      const response = await paymentService.generatePurchaseToken(
        courseId,
        user!.id,
        user!.email,
        user!.name
      );

      if (response.status === 'success' && response.iframe_url && response.payment_id) {
        setIframeUrl(response.iframe_url);
        setPaymentId(response.payment_id);
      } else {
        throw new Error(response.message || 'Erro ao gerar token de pagamento');
      }
    } catch (err: any) {
      console.error('Error initializing payment:', err);
      setError(err.message || 'Erro ao inicializar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    showToast('Pagamento realizado com sucesso!', 'success');

    // Verificar status do pagamento após um pequeno delay
    setTimeout(async () => {
      if (paymentId) {
        try {
          const status = await paymentService.checkPaymentStatus(paymentId);
          if (status.status === 'completed') {
            // Redirecionar para a página do curso após 2 segundos
            setTimeout(() => {
              router.push(`/curso/${courseId}`);
            }, 2000);
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
        }
      }
    }, 1000);
  };

  const handlePaymentFailure = (message: string) => {
    setError(message || 'O pagamento falhou. Tente novamente.');
    showToast(message || 'O pagamento falhou. Tente novamente.', 'error');
  };

  const handleRetry = () => {
    setError(null);
    setPaymentCompleted(false);
    initializePayment();
  };

  const handleBack = () => {
    router.push(`/curso/${courseId}`);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Container>
        <PaymentCard>
          <Title>Pagamento do Curso</Title>
          <Subtitle>Complete o pagamento para finalizar sua matrícula</Subtitle>

          {courseInfo && (
            <CourseInfo>
              <CourseName>{courseInfo.name}</CourseName>
              <CourseAmount>
                {new Intl.NumberFormat('pt-AO', {
                  style: 'currency',
                  currency: 'AOA',
                }).format(courseInfo.price)}
              </CourseAmount>
            </CourseInfo>
          )}

          {error && (
            <ErrorMessage>
              {error}
              <Button onClick={handleRetry} style={{ marginTop: '10px' }}>
                Tentar Novamente
              </Button>
            </ErrorMessage>
          )}

          {paymentCompleted && (
            <SuccessMessage>
              Pagamento realizado com sucesso! Redirecionando...
            </SuccessMessage>
          )}

          {loading && (
            <IframeContainer>
              <LoadingMessage>Carregando gateway de pagamento...</LoadingMessage>
            </IframeContainer>
          )}

          {!loading && !error && iframeUrl && !paymentCompleted && (
            <IframeContainer>
              <Iframe
                ref={iframeRef}
                src={iframeUrl}
                title="Gateway de Pagamento GPO"
                allow="payment"
              />
            </IframeContainer>
          )}

          <BackButton onClick={handleBack}>Voltar para o Curso</BackButton>
        </PaymentCard>
      </Container>
      {ToastElement}
    </>
  );
}

