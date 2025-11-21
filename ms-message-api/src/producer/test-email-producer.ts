import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';
import { EmailType } from '../domain/entities/EmailMessage';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'email_queue';
const RABBITMQ_EXCHANGE = process.env.RABBITMQ_EXCHANGE || 'email_exchange';

// Lista de emails para enviar
const TEST_EMAILS = [
  'reduaneamin@gmail.com',
  'djumaamin00@gmail.com',	
  'redwane.jacline@mirantes.io',
  'gualdinomario005@gmail.com'
];

interface EmailEvent {
  type: string;
  to: string;
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

async function publishEmailEvent(
  channel: amqp.Channel,
  event: EmailEvent
): Promise<void> {
  const message = JSON.stringify(event);
  const published = channel.publish(
    RABBITMQ_EXCHANGE,
    RABBITMQ_QUEUE,
    Buffer.from(message),
    { persistent: true }
  );

  if (published) {
    console.log(`✓ Email enviado para fila: ${event.type}`);
    console.log(`  Destinatário: ${event.to}`);
  } else {
    console.error(`✗ Falha ao enviar email: ${event.type}`);
  }
}

async function sendAllEmailTypes(
  channel: amqp.Channel,
  email: string,
  nome: string
): Promise<void> {
  console.log(`\n📧 Enviando emails para: ${email}`);
  console.log('-'.repeat(60));

  // 1. Verificação de Conta
  await publishEmailEvent(channel, {
    type: EmailType.VERIFICACAO_CONTA,
    to: email,
    data: {
      nome: nome,
      linkVerificacao: 'https://example.com/verify?token=abc123xyz789',
      tempoExpiracao: '24 horas',
    },
    metadata: {
      userId: '123',
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  // 2. Notificação
  await publishEmailEvent(channel, {
    type: EmailType.NOTIFICACAO,
    to: email,
    data: {
      nome: nome,
      mensagem: 'Sua solicitação foi processada com sucesso! Obrigado por usar nossos serviços.',
      assunto: 'Solicitação Processada',
      link: 'https://example.com/detalhes/123',
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  // 3. Notificação de Pagamento
  await publishEmailEvent(channel, {
    type: EmailType.NOTIFICACAO_PAGAMENTO,
    to: email,
    data: {
      nome: nome,
      status: 'Aprovado',
      corStatus: '#27ae60',
      valor: '150.00',
      data: new Date().toLocaleDateString('pt-BR'),
      numeroTransacao: 'TXN-' + Date.now(),
      linkDetalhes: 'https://example.com/pagamento/' + Date.now(),
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  // 4. Recuperação de Senha
  await publishEmailEvent(channel, {
    type: EmailType.RECUPERACAO_SENHA,
    to: email,
    data: {
      nome: nome,
      linkRecuperacao: 'https://example.com/reset-password?token=xyz789abc123',
      tempoExpiracao: '1 hora',
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 300));
}

async function main() {
  try {
    console.log('Conectando ao RabbitMQ...');
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await (connection as any).createChannel();

    // Declara o exchange
    await channel.assertExchange(RABBITMQ_EXCHANGE, 'direct', {
      durable: true,
    });

    console.log('Conectado ao RabbitMQ com sucesso!\n');
    console.log('='.repeat(60));
    console.log('Enviando emails de teste para os seguintes destinatários:');
    TEST_EMAILS.forEach((email, index) => {
      console.log(`  ${index + 1}. ${email}`);
    });
    console.log('='.repeat(60));

    // Envia todos os tipos de email para cada destinatário
    for (const email of TEST_EMAILS) {
      // Extrai o nome do email (parte antes do @)
      const nome = email.split('@')[0].split('.').map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      
      await sendAllEmailTypes(channel, email, nome);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✓ Todos os emails foram enviados para a fila!');
    console.log(`  Total: ${TEST_EMAILS.length} destinatários × 4 tipos = ${TEST_EMAILS.length * 4} emails`);
    console.log('\nAguardando 2 segundos antes de fechar a conexão...');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await channel.close();
    await (connection as any).close();

    console.log('Conexão fechada. Encerrando...');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao enviar emails:', error);
    process.exit(1);
  }
}

main();

