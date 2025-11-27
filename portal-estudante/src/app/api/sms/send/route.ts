// app/api/sms/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Função para inicializar o cliente Twilio
const initializeTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  console.log('=== VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE ===');
  console.log('TWILIO_ACCOUNT_SID:', accountSid ? '✓ Definido' : '✗ Não definido');
  console.log('TWILIO_AUTH_TOKEN:', authToken ? '✓ Definido' : '✗ Não definido');
  console.log('TWILIO_PHONE_NUMBER:', twilioPhoneNumber ? `✓ ${twilioPhoneNumber}` : '✗ Não definido');
  console.log('TWILIO_WHATSAPP_NUMBER:', twilioWhatsAppNumber ? `✓ ${twilioWhatsAppNumber}` : '✗ Não definido');

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    const missing = [];
    if (!accountSid) missing.push('TWILIO_ACCOUNT_SID');
    if (!authToken) missing.push('TWILIO_AUTH_TOKEN');
    if (!twilioPhoneNumber) missing.push('TWILIO_PHONE_NUMBER');
    
    throw new Error(`Variáveis de ambiente do Twilio não configuradas: ${missing.join(', ')}`);
  }

  return {
    client: twilio(accountSid, authToken),
    twilioPhoneNumber,
    twilioWhatsAppNumber,
  };
};

// Armazenamento temporário dos códigos
const verificationCodes = new Map<
  string,
  { code: string; expires: number; attempts: number; method?: string }
>();

// Função para gerar código de 4 dígitos
const generateVerificationCode = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Função para validar número de telefone angolano
const validateAngolanPhoneNumber = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/\s+/g, "");
  const isValid = /^\+244\d{9}$/.test(cleanNumber);
  console.log(`Validação do número ${phoneNumber}:`, isValid ? '✓ Válido' : '✗ Inválido');
  return isValid;
};

// Função para formatar número para WhatsApp
const formatWhatsAppNumber = (phoneNumber: string): string => {
  return `whatsapp:${phoneNumber}`;
};

export async function POST(request: NextRequest) {
  console.log('=== NOVA REQUISIÇÃO SMS/WHATSAPP ===');
  
  try {
    // Inicializar cliente Twilio
    const { client, twilioPhoneNumber, twilioWhatsAppNumber } = initializeTwilioClient();

    // Parse do body da requisição
    let body;
    try {
      body = await request.json();
      console.log('Body da requisição:', body);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      return NextResponse.json(
        { success: false, error: "JSON inválido na requisição" },
        { status: 400 }
      );
    }

    const { phoneNumber, action = "send", method = "sms", code } = body;

    // Validações básicas
    if (!phoneNumber) {
      console.log('❌ Número de telefone não fornecido');
      return NextResponse.json(
        { success: false, error: "Número de telefone é obrigatório" },
        { status: 400 }
      );
    }

    if (!["sms", "whatsapp"].includes(method)) {
      console.log('❌ Método inválido:', method);
      return NextResponse.json(
        { success: false, error: 'Método deve ser "sms" ou "whatsapp"' },
        { status: 400 }
      );
    }

    if (!validateAngolanPhoneNumber(phoneNumber)) {
      console.log('❌ Número de telefone inválido:', phoneNumber);
      return NextResponse.json(
        { success: false, error: "Formato de número de telefone inválido. Use o formato: +244XXXXXXXXX" },
        { status: 400 }
      );
    }

    // Verificar se WhatsApp está disponível quando solicitado
    if (method === "whatsapp" && !twilioWhatsAppNumber) {
      console.log('❌ WhatsApp solicitado mas não configurado');
      return NextResponse.json(
        {
          success: false,
          error: "WhatsApp não está configurado. Tente SMS.",
          fallbackToSMS: true,
        },
        { status: 400 }
      );
    }

    if (action === "send") {
      console.log(`📤 Enviando código via ${method.toUpperCase()} para ${phoneNumber}`);

      // Verificar limite de tentativas
      const existing = verificationCodes.get(phoneNumber);
      if (existing && existing.attempts >= 3) {
        const timeLeft = Math.ceil((existing.expires - Date.now()) / 60000);
        console.log('❌ Muitas tentativas para:', phoneNumber);
        return NextResponse.json(
          {
            success: false,
            error: `Muitas tentativas. Tente novamente em ${timeLeft} minutos.`,
          },
          { status: 429 }
        );
      }

      const verificationCode = generateVerificationCode();
      const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutos
      
      console.log('📝 Código gerado:', verificationCode);

      // Armazenar código
      verificationCodes.set(phoneNumber, {
        code: verificationCode,
        expires: expirationTime,
        attempts: existing ? existing.attempts + 1 : 1,
        method: method,
      });

      // Configurar mensagem
      const messageBody = method === "whatsapp"
        ? `🎓 *Multischool Angola* - Verificação da Conta \n\nO seu código de verificação é: *${verificationCode}*\n\n_Este código é válido por 10 minutos (não partilhe com ninguém)._`
        : `O seu código de verificação Multischool é: ${verificationCode}. Válido por 10 minutos.`;

      // Configurar números
      let fromNumber: string;
      let toNumber: string;

      if (method === "whatsapp") {
        const whatsappSender = twilioWhatsAppNumber || twilioPhoneNumber;
        fromNumber = formatWhatsAppNumber(whatsappSender);
        toNumber = formatWhatsAppNumber(phoneNumber);
      } else {
        fromNumber = twilioPhoneNumber;
        toNumber = phoneNumber;
      }

      console.log('=== CONFIGURAÇÃO DA MENSAGEM ===');
      console.log('De:', fromNumber);
      console.log('Para:', toNumber);
      console.log('Método:', method);
      console.log('Mensagem:', messageBody.substring(0, 50) + '...');

      // Enviar mensagem
      try {
        const messageConfig = {
          body: messageBody,
          from: fromNumber,
          to: toNumber,
        };

        console.log('📱 Enviando mensagem via Twilio...');
        const message = await client.messages.create(messageConfig);

        console.log('✅ Mensagem enviada com sucesso!', {
          sid: message.sid,
          status: message.status,
          method: method,
        });

        return NextResponse.json({
          success: true,
          message: `Código de verificação enviado via ${method.toUpperCase()} com sucesso`,
          messageSid: message.sid,
          method: method,
          phoneNumber: phoneNumber,
        });

      } catch (twilioError: any) {
        console.error('❌ Erro do Twilio:', {
          code: twilioError.code,
          message: twilioError.message,
          status: twilioError.status,
          details: twilioError.moreInfo,
          method: method,
        });

        // Tratamento específico para WhatsApp
        if (method === "whatsapp") {
          if (twilioError.code === 63016) {
            return NextResponse.json(
              {
                success: false,
                error: "Este número não está registrado no WhatsApp Business. Tente SMS.",
                fallbackToSMS: true,
              },
              { status: 400 }
            );
          } 
          
          if (twilioError.code === 21211 || twilioError.code === 21212) {
            return NextResponse.json(
              {
                success: false,
                error: "WhatsApp não está configurado corretamente. Tente SMS.",
                fallbackToSMS: true,
              },
              { status: 400 }
            );
          }

          if (twilioError.code === 21614) {
            return NextResponse.json(
              {
                success: false,
                error: "Número de telefone inválido para WhatsApp. Tente SMS.",
                fallbackToSMS: true,
              },
              { status: 400 }
            );
          }
        }

        // Erros gerais
        if (twilioError.code === 21614) {
          return NextResponse.json(
            {
              success: false,
              error: "Número de telefone inválido. Verifique o formato (+244XXXXXXXXX).",
            },
            { status: 400 }
          );
        }

        if (twilioError.code === 20003) {
          return NextResponse.json(
            {
              success: false,
              error: "Credenciais do Twilio inválidas. Verifique a configuração.",
            },
            { status: 500 }
          );
        }

        return NextResponse.json(
          {
            success: false,
            error: `Erro ao enviar ${method.toUpperCase()}: ${twilioError.message}`,
            twilioError: process.env.NODE_ENV === "development" ? {
              code: twilioError.code,
              message: twilioError.message,
              status: twilioError.status
            } : undefined,
          },
          { status: 500 }
        );
      }
    }

    if (action === "verify") {
      console.log(`🔍 Verificando código para ${phoneNumber}`);

      if (!code) {
        console.log('❌ Código não fornecido');
        return NextResponse.json(
          { success: false, error: "Código de verificação é obrigatório" },
          { status: 400 }
        );
      }

      const storedData = verificationCodes.get(phoneNumber);

      if (!storedData) {
        console.log('❌ Código não encontrado para:', phoneNumber);
        return NextResponse.json(
          {
            success: false,
            error: "Código não encontrado. Solicite um novo código.",
          },
          { status: 404 }
        );
      }

      // Verificar expiração
      if (Date.now() > storedData.expires) {
        verificationCodes.delete(phoneNumber);
        console.log('❌ Código expirado para:', phoneNumber);
        return NextResponse.json(
          {
            success: false,
            error: "Código expirado. Solicite um novo código.",
          },
          { status: 410 }
        );
      }

      // Verificar código
      if (storedData.code !== code) {
        console.log('❌ Código inválido:', code, 'esperado:', storedData.code);
        return NextResponse.json(
          { success: false, error: "Código inválido" },
          { status: 400 }
        );
      }

      // Código válido
      verificationCodes.delete(phoneNumber);
      console.log('✅ Código verificado com sucesso para:', phoneNumber);

      return NextResponse.json({
        success: true,
        message: "Código verificado com sucesso",
        method: storedData.method,
      });
    }

    console.log('❌ Ação inválida:', action);
    return NextResponse.json(
      { success: false, error: "Ação inválida" },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('❌ Erro geral na API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Limpeza periódica de códigos expirados
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  let cleanedCount = 0;
  
  verificationCodes.forEach((data, phoneNumber) => {
    if (now > data.expires) {
      verificationCodes.delete(phoneNumber);
      cleanedCount++;
    }
  });
  
  if (cleanedCount > 0) {
    console.log(`🧹 Limpeza: ${cleanedCount} código(s) expirado(s) removido(s)`);
  }
}, 5 * 60 * 1000); // Limpar a cada 5 minutos

// Cleanup quando o processo terminar
process.on('SIGTERM', () => {
  clearInterval(cleanupInterval);
});

process.on('SIGINT', () => {
  clearInterval(cleanupInterval);
});