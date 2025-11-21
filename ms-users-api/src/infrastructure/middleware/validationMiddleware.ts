import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function validateDTO<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Converter o body para instância da classe DTO
    const dto = plainToInstance(dtoClass, req.body);

    // Validar
    const errors: ValidationError[] = await validate(dto, {
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Rejeita propriedades não permitidas
      forbidUnknownValues: true, // Rejeita valores desconhecidos
      stopAtFirstError: false, // Coleta todos os erros
    });

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => {
        if (error.constraints) {
          return Object.values(error.constraints);
        }
        return [`${error.property}: valor inválido`];
      }).flat();

      return res.status(400).json({
        error: 'Dados inválidos',
        details: errorMessages,
      });
    }

    // Substituir req.body pelo DTO validado e sanitizado
    req.body = dto;
    next();
  };
}

