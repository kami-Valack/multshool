/**
 * Exemplo de Consumer para eventos de usuário verificado
 * 
 * Para usar:
 * 1. npm install amqplib
 * 2. node exemplo-consumer.js
 */

const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const EXCHANGE = 'user_events';
const ROUTING_KEY = 'user.verified';
const QUEUE = 'user_replication_queue';

async function startConsumer() {
  try {
    console.log('🔌 Conectando ao RabbitMQ...');
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    console.log('✅ Conectado ao RabbitMQ');
    
    // Nota: A fila já é criada automaticamente pela API
    // Apenas verificamos que ela existe
    await channel.assertQueue(QUEUE, { durable: true });
    console.log(`📬 Fila '${QUEUE}' verificada (já criada automaticamente pela API)`);
    
    console.log('\n⏳ Aguardando eventos de usuário verificado...\n');
    
    // Consumir mensagens
    channel.consume(QUEUE, (msg) => {
      if (msg) {
        try {
          const event = JSON.parse(msg.content.toString());
          
          console.log('═══════════════════════════════════════════════════');
          console.log('📨 EVENTO RECEBIDO');
          console.log('═══════════════════════════════════════════════════');
          console.log('Tipo:', event.type);
          console.log('Timestamp:', event.metadata.timestamp);
          console.log('Source:', event.metadata.source);
          console.log('\n👤 DADOS DO USUÁRIO:');
          console.log('  ID:', event.data.id);
          console.log('  Email:', event.data.email);
          console.log('  Nome:', event.data.name);
          console.log('  Role:', event.data.role);
          console.log('  Email Verificado:', event.data.emailVerified);
          console.log('  Ativo:', event.data.isActive);
          console.log('  Criado em:', event.data.createdAt);
          console.log('  Atualizado em:', event.data.updatedAt);
          console.log('═══════════════════════════════════════════════════\n');
          
          // Aqui você pode adicionar sua lógica para replicar o usuário
          // Exemplo:
          // await replicateUserInYourService(event.data);
          
          // Confirmar processamento
          channel.ack(msg);
          console.log('✅ Evento processado e confirmado\n');
        } catch (error) {
          console.error('❌ Erro ao processar evento:', error);
          // Rejeitar mensagem e não reenviar
          channel.nack(msg, false, false);
        }
      }
    }, { 
      noAck: false // Confirmação manual
    });
    
    // Tratamento de erros
    channel.on('error', (err) => {
      console.error('❌ Erro no canal:', err);
    });
    
    connection.on('error', (err) => {
      console.error('❌ Erro na conexão:', err);
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Encerrando consumer...');
      await channel.close();
      await connection.close();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erro ao iniciar consumer:', error);
    process.exit(1);
  }
}

// Iniciar consumer
startConsumer();

