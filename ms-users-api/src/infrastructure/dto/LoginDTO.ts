import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(255, { message: 'Email deve ter no máximo 255 caracteres' })
  email!: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString({ message: 'Senha deve ser uma string' })
  @MaxLength(100, { message: 'Senha deve ter no máximo 100 caracteres' })
  password!: string;
}

