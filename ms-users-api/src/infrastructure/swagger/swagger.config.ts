import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MS Users API - API de Autenticação',
    version: '1.0.0',
    description: `
      API de autenticação robusta construída com arquitetura hexagonal.
      
      ## Funcionalidades
      - ✅ Registro de usuários com role padrão "student"
      - ✅ Autenticação com JWT (Access Token + Refresh Token)
      - ✅ Verificação de email obrigatória
      - ✅ Recuperação de senha
      - ✅ Logout e logout de todos os dispositivos
      - ✅ Rate limiting e validação rigorosa de entrada
      
      ## Autenticação
      Para endpoints protegidos, inclua o token no header:
      \`\`\`
      Authorization: Bearer <access_token>
      \`\`\`
      
      ## Segurança
      - Validação rigorosa de entrada com DTOs
      - Sanitização de dados
      - Rate limiting por endpoint
      - Senhas devem conter: maiúscula, minúscula, número e caractere especial
    `,
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
    {
      url: 'http://ec2-54-164-91-182.compute-1.amazonaws.com',
      description: 'Servidor VPS (Produção)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT obtido no endpoint de login',
      },
    },
    schemas: {
      RegisterRequest: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
            description: 'Email do usuário (máximo 255 caracteres)',
          },
          password: {
            type: 'string',
            minLength: 8,
            maxLength: 100,
            example: 'Senha123!@#',
            description: 'Senha deve conter: maiúscula, minúscula, número e caractere especial',
          },
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'João Silva',
            description: 'Nome completo (apenas letras e espaços)',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
          },
          password: {
            type: 'string',
            example: 'Senha123!@#',
          },
        },
      },
      RefreshTokenRequest: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
      },
      RequestPasswordResetRequest: {
        type: 'object',
        required: ['email'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
          },
        },
      },
      ResetPasswordRequest: {
        type: 'object',
        required: ['token', 'newPassword'],
        properties: {
          token: {
            type: 'string',
            example: 'abc123def456...',
            description: 'Token de recuperação de senha',
          },
          newPassword: {
            type: 'string',
            minLength: 8,
            maxLength: 100,
            example: 'NovaSenha123!@#',
            description: 'Nova senha (deve conter: maiúscula, minúscula, número e caractere especial)',
          },
        },
      },
      VerifyEmailRequest: {
        type: 'object',
        required: ['token'],
        properties: {
          token: {
            type: 'string',
            example: 'abc123def456...',
            description: 'Token de verificação de email',
          },
        },
      },
      UserResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
          },
          name: {
            type: 'string',
            example: 'João Silva',
          },
          role: {
            type: 'string',
            example: 'student',
            description: 'Role do usuário (sempre "student" para usuários criados via API)',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'Token JWT de acesso (expira em 15 minutos)',
          },
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'Token JWT de refresh (expira em 7 dias)',
          },
          expiresIn: {
            type: 'number',
            example: 900,
            description: 'Tempo de expiração do access token em segundos',
          },
          user: {
            $ref: '#/components/schemas/UserResponse',
          },
        },
      },
      RegisterResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Usuário criado com sucesso',
          },
          user: {
            $ref: '#/components/schemas/UserResponse',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Mensagem de erro',
          },
          details: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Detalhes dos erros de validação (quando aplicável)',
          },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Operação realizada com sucesso',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Autenticação',
      description: 'Endpoints de autenticação e gerenciamento de usuários',
    },
    {
      name: 'Health',
      description: 'Verificação de saúde da API',
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: [
    './src/infrastructure/routes/*.ts',
    './src/infrastructure/routes/*.swagger.ts',
    './src/infrastructure/controllers/*.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

