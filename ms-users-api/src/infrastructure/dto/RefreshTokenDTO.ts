import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class RefreshTokenDTO {
  @IsNotEmpty({ message: 'Refresh token é obrigatório' })
  @IsString({ message: 'Refresh token deve ser uma string' })
  @MaxLength(500, { message: 'Refresh token inválido' })
  refreshToken!: string;
}

