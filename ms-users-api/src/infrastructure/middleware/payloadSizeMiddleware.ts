import { Request, Response, NextFunction } from 'express';

const MAX_PAYLOAD_SIZE = 10 * 1024; // 10KB

/**
 * Middleware para limitar o tamanho do payload
 */
export function payloadSizeMiddleware(req: Request, res: Response, next: NextFunction) {
  const contentLength = req.get('content-length');
  
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    
    if (size > MAX_PAYLOAD_SIZE) {
      return res.status(413).json({
        error: 'Payload muito grande',
        message: `Tamanho máximo permitido: ${MAX_PAYLOAD_SIZE} bytes`,
      });
    }
  }

  next();
}

