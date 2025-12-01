import { IsString, IsNotEmpty } from 'class-validator';

export class EmployeeBaseDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  email_corporativo: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsString()
  @IsNotEmpty()
  funcao: string;

  @IsString()
  @IsNotEmpty()
  localidade: string;

  @IsString()
  @IsNotEmpty()
  tempo_de_empresa: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  n0_empresa: string;

  @IsString()
  @IsNotEmpty()
  n4_area: string;
}
