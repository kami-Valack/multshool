import { Request, Response, NextFunction } from 'express';
import { ITokenGenerator } from '../../domain/services/ITokenGenerator';

export const createAuthMiddleware = (tokenGenerator: ITokenGenerator) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token não fornecido' });
        return;
      }

      const token = authHeader.substring(7);
      const decoded = tokenGenerator.verifyAccessToken(token);

      if (!decoded) {
        res.status(401).json({ error: 'Token inválido ou expirado' });
        return;
      }

      (req as any).user = {
        userId: decoded.userId,
        email: decoded.email,
      };

      next();
    } catch (error) {
      res.status(401).json({ error: 'Erro ao validar token' });
    }
  };
};

