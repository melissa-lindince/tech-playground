import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class EmployeeBaseDto {
  @ApiProperty({ example: 'Anya Forger' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  nome: string;

  @ApiProperty({ example: 'anya.forger@email.com'})
  @IsEmail({}, {message: 'Invalid email address'})
  @IsNotEmpty({ message: 'Email is required'})
  email: string;

  @ApiProperty({ example: 'anya.forger@empresa.com'})
  @IsEmail({}, {message: 'Invalid corporate email address'})
  @IsNotEmpty({ message: 'Corporate email is required' })
  email_corporativo: string;

  @ApiProperty({ example: 'tecnologia' })
  @IsString({ message: 'Area must be a string' })
  @IsNotEmpty({ message: 'Area is required' })
  area: string;

  @ApiProperty({ example: 'gerente' })
  @IsString({ message: 'Cargo must be a string' })
  @IsNotEmpty({ message: 'Cargo is required' })
  cargo: string;

  @ApiProperty({ example: 'gestor' })
  @IsString({ message: 'Funcao must be a string' })
  @IsNotEmpty({ message: 'Funcao is required' })
  funcao: string;

  @ApiProperty({ example: 'Fortaleza' })
  @IsString({ message: 'localidade must be a string' })
  @IsNotEmpty({ message: 'localidade is required' })
  localidade: string;

  @ApiProperty({ example: 'mais de 5 anos' })
  @IsString({ message: 'tempo_de_empresa must be a string' })
  @IsNotEmpty({ message: 'tempo_de_empresa is required' })
  tempo_de_empresa: string;

  @ApiProperty({ example: 'feminino', required: false })
  @IsString({ message: 'genero must be a string' })
  @IsNotEmpty({ message: 'genero is required' })
  genero: string;

  @ApiProperty({ example: 'geração z', required: false })
  @IsString()
  geracao: string;

  @ApiProperty({ example: 'Company Spy x family' })
  @IsString({ message: 'n0_empresa must be a string' })
  @IsNotEmpty({ message: 'n0_empresa is required' })
  n0_empresa: string;

  @ApiProperty({ example: 'diretoria a', required: false })
  @IsString({ message: 'n1_diretoria must be a string' })
  @IsOptional()
  n1_diretoria?: string;

  @ApiProperty({ example: 'gerência a1', required: false })
  @IsString({ message: 'n2_gerencia must be a string' })
  @IsOptional()
  n2_gerencia?: string;

  @ApiProperty({ example: 'coordenação a11', required: false })
  @IsString({ message: 'n3_coordenacao must be a string' })
  @IsOptional()
  n3_coordenacao?: string;

  @ApiProperty({ example: 'área a111' })
  @IsString({ message: 'n4_area must be a string' })
  @IsNotEmpty({ message: 'n4_area is required' })
  n4_area: string;
}
