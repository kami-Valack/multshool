import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class VerifyEmailDTO {
  @IsNotEmpty({ message: 'Token é obrigatório' })
  @IsString({ message: 'Token deve ser uma string' })
  @MaxLength(500, { message: 'Token inválido' })
  token!: string;
}

