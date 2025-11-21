import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { createAuthMiddleware } from '../middleware/authMiddleware';
import { ITokenGenerator } from '../../domain/services/ITokenGenerator';
import { validateDTO } from '../middleware/validationMiddleware';
import { sanitizeMiddleware } from '../middleware/sanitizeMiddleware';
import { payloadSizeMiddleware } from '../middleware/payloadSizeMiddleware';
import { RegisterDTO } from '../dto/RegisterDTO';
import { LoginDTO } from '../dto/LoginDTO';
import { RefreshTokenDTO } from '../dto/RefreshTokenDTO';
import { RequestPasswordResetDTO } from '../dto/RequestPasswordResetDTO';
import { ResetPasswordDTO } from '../dto/ResetPasswordDTO';
import { VerifyEmailDTO } from '../dto/VerifyEmailDTO';
import rateLimit from 'express-rate-limit';

export const createAuthRoutes = (
  authController: AuthController,
  tokenGenerator: ITokenGenerator
): Router => {
  const router = Router();
  const authMiddleware = createAuthMiddleware(tokenGenerator);

  // Rate limiting específico por endpoint
  const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 tentativas por IP
    message: 'Muitas tentativas de registro. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // 10 tentativas por IP
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 3, // 3 tentativas por IP
    message: 'Muitas tentativas de recuperação de senha. Tente novamente em 1 hora.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  const verifyEmailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // 10 tentativas por IP
    message: 'Muitas tentativas de verificação. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Aplicar sanitização e validação de tamanho em todas as rotas POST
  router.use(payloadSizeMiddleware);
  router.use(sanitizeMiddleware);

  // Rotas com validação e rate limiting
  router.post('/register', 
    registerLimiter,
    validateDTO(RegisterDTO),
    (req, res) => authController.register(req, res)
  );

  router.post('/login', 
    loginLimiter,
    validateDTO(LoginDTO),
    (req, res) => authController.login(req, res)
  );

  router.post('/refresh-token', 
    validateDTO(RefreshTokenDTO),
    (req, res) => authController.refreshToken(req, res)
  );

  router.post('/password-reset/request', 
    passwordResetLimiter,
    validateDTO(RequestPasswordResetDTO),
    (req, res) => authController.requestPasswordReset(req, res)
  );

  router.post('/password-reset/reset', 
    passwordResetLimiter,
    validateDTO(ResetPasswordDTO),
    (req, res) => authController.resetPassword(req, res)
  );

  router.post('/verify-email', 
    verifyEmailLimiter,
    validateDTO(VerifyEmailDTO),
    (req, res) => authController.verifyEmail(req, res)
  );

  router.post('/logout', 
    validateDTO(RefreshTokenDTO),
    (req, res) => authController.logout(req, res)
  );

  router.post('/logout-all', 
    authMiddleware, 
    (req, res) => authController.logoutAllDevices(req, res)
  );

  return router;
};

