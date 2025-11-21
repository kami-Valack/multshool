import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { RefreshTokenUseCase } from '../../application/use-cases/RefreshTokenUseCase';
import { RequestPasswordResetUseCase } from '../../application/use-cases/RequestPasswordResetUseCase';
import { ResetPasswordUseCase } from '../../application/use-cases/ResetPasswordUseCase';
import { LogoutUseCase } from '../../application/use-cases/LogoutUseCase';
import { LogoutAllDevicesUseCase } from '../../application/use-cases/LogoutAllDevicesUseCase';
import { VerifyEmailUseCase } from '../../application/use-cases/VerifyEmailUseCase';

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUseCase: LoginUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private logoutUseCase: LogoutUseCase,
    private logoutAllDevicesUseCase: LogoutAllDevicesUseCase,
    private verifyEmailUseCase: VerifyEmailUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      // DTO já foi validado pelo middleware
      const { email, password, name } = req.body;

      const result = await this.registerUserUseCase.execute({
        email,
        password,
        name,
      });

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: result,
      });
    } catch (error: any) {
      if (error.message === 'Email já está em uso') {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      // DTO já foi validado pelo middleware
      const { email, password } = req.body;
      const deviceInfo = req.headers['user-agent'] || 'unknown';

      const result = await this.loginUseCase.execute({
        email,
        password,
        deviceInfo: deviceInfo as string,
      });

      res.json({
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
        expiresIn: result.tokens.expiresIn,
        user: result.user,
      });
    } catch (error: any) {
      if (error.message === 'Credenciais inválidas' || error.message === 'Email não verificado') {
        res.status(401).json({ error: error.message });
      } else {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
      }
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      // DTO já foi validado pelo middleware
      const { refreshToken } = req.body;
      const deviceInfo = req.headers['user-agent'] || 'unknown';

      const tokenPair = await this.refreshTokenUseCase.execute(
        refreshToken,
        deviceInfo as string
      );

      res.json({
        accessToken: tokenPair.accessToken,
        refreshToken: tokenPair.refreshToken,
        expiresIn: tokenPair.expiresIn,
      });
    } catch (error: any) {
      if (error.message === 'Refresh token inválido' || error.message === 'Refresh token expirado') {
        res.status(401).json({ error: error.message });
      } else {
        console.error('Erro ao renovar token:', error);
        res.status(500).json({ error: 'Erro ao renovar token' });
      }
    }
  }

  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      // DTO já foi validado pelo middleware
      const { email } = req.body;

      await this.requestPasswordResetUseCase.execute(email);

      // Sempre retorna sucesso por segurança
      res.json({
        message: 'Se o email existir, um link de recuperação foi enviado',
      });
    } catch (error: any) {
      // Sempre retorna sucesso para não revelar se o email existe
      res.json({
        message: 'Se o email existir, um link de recuperação foi enviado',
      });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      // DTO já foi validado pelo middleware
      const { token, newPassword } = req.body;

      await this.resetPasswordUseCase.execute({
        token,
        newPassword,
      });

      res.json({
        message: 'Senha alterada com sucesso',
      });
    } catch (error: any) {
      if (error.message === 'Token inválido' || error.message === 'Token expirado' || error.message === 'Token já foi usado') {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).json({ error: 'Erro ao redefinir senha' });
      }
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // DTO já foi validado pelo middleware
      const { refreshToken } = req.body;

      await this.logoutUseCase.execute(refreshToken);

      res.json({
        message: 'Logout realizado com sucesso',
      });
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      res.status(400).json({ error: error.message || 'Erro ao fazer logout' });
    }
  }

  async logoutAllDevices(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      await this.logoutAllDevicesUseCase.execute(userId);

      res.json({
        message: 'Logout realizado em todos os dispositivos',
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      // DTO já foi validado pelo middleware
      const { token } = req.body;

      await this.verifyEmailUseCase.execute(token);

      res.json({
        message: 'Email verificado com sucesso',
      });
    } catch (error: any) {
      if (error.message === 'Token inválido' || error.message === 'Token expirado' || error.message === 'Token já foi usado') {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Erro ao verificar email:', error);
        res.status(500).json({ error: 'Erro ao verificar email' });
      }
    }
  }
}

