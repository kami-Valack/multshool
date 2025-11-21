import { Request, Response, NextFunction } from 'express';

/**
 * Sanitiza strings removendo caracteres perigosos e normalizando espaços
 */
function sanitizeString(value: any): string {
  if (typeof value !== 'string') {
    return value;
  }

  return value
    .trim() // Remove espaços no início e fim
    .replace(/\s+/g, ' ') // Normaliza espaços múltiplos
    .replace(/[<>]/g, ''); // Remove caracteres HTML perigosos
}

/**
 * Sanitiza objetos recursivamente
 */
function sanitizeObject(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
}

/**
 * Middleware para sanitizar dados de entrada
 */
export function sanitizeMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }

  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }

  next();
}

