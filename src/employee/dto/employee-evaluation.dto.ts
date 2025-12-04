import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class EmployeeEvaluationDto {
  @ApiProperty({ 
    example: 6, 
    minimum: 1, 
    maximum: 7,
    description: 'Likert scale from 1 to 7',
    required: false 
  })
  @IsInt({ message: 'interesse_no_cargo must be an integer' })
  @Min(1, { message: 'interesse_no_cargo must be at least 1' })
  @Max(7, { message: 'interesse_no_cargo must be at most 7' })
  @IsOptional()
  interesse_no_cargo?: number;
  
  @ApiProperty({ example: 'Gostaria de participar de projetos...', required: false })
  @IsString({ message: 'comentarios_interesse must be a string' })
  @IsOptional()
  comentarios_interesse?: string;


  @ApiProperty({ 
  example: 6, 
  minimum: 1, 
  maximum: 7,
  description: 'Likert scale from 1 to 7',
  required: false 
  })
  @IsInt({ message: 'contribuicao must be an integer' })
  @Min(1, { message: 'contribuicao must be at least 1' })
  @Max(7, { message: 'contribuicao must be at most 7' })
  @IsOptional()
  contribuicao?: number;

  @ApiProperty({ example: 'Estou motivado a contribuir para o sucesso da empresa.', required: false })
  @IsString({ message: 'comentarios_contribuicao must be a string' })
  @IsOptional()
  comentarios_contribuicao?: string;


  @ApiProperty({ 
  example: 7, 
  minimum: 1, 
  maximum: 7,
  description: 'Likert scale from 1 to 7',
  required: false 
  })
  @IsInt({ message: 'aprendizado_desenvolvimento must be an integer' })
  @Min(1, { message: 'aprendizado_desenvolvimento must be at least 1' })
  @Max(7, { message: 'aprendizado_desenvolvimento must be at most 7' })
  @IsOptional()
  aprendizado_desenvolvimento?: number;

  @ApiProperty({ example: 'Estou comprometido em melhorar continuamente minha performance.', required: false })
  @IsString({ message: 'comentarios_aprendizado must be a string' })
  @IsOptional()
  comentarios_aprendizado?: string;


  @ApiProperty({ 
    example: 5, 
    minimum: 1, 
    maximum: 7,
    description: 'Likert scale from 1 to 7',
    required: false 
  })
  @IsInt({ message: 'feedback must be an integer' })
  @Min(1, { message: 'feedback must be at least 1' })
  @Max(7, { message: 'feedback must be at most 7' })
  @IsOptional()
  feedback?: number;

  @ApiProperty({ example: 'Recebo feedbacks construtivos.', required: false })
  @IsString({ message: 'comentarios_feedback must be a string' })
  comentarios_feedback?: string;


  @ApiProperty({ 
    example: 6, 
    minimum: 1, 
    maximum: 7,
    description: 'Likert scale from 1 to 7',
    required: false 
  })
  @IsInt({ message: 'interacao_gestor must be an integer' })
  @Min(1, { message: 'interacao_gestor must be at least 1' })
  @Max(7, { message: 'interacao_gestor must be at most 7' })
  @IsOptional()
  interacao_gestor?: number;

  @ApiProperty({ example: 'Meu gestor é acessível e apoia minha carreira.', required: false })
  @IsString({ message: 'comentarios_interacao must be a string' })
  @IsOptional()
  comentarios_interacao?: string;


  @ApiProperty({ 
    example: 4, 
    minimum: 1, 
    maximum: 7,
    description: 'Likert scale from 1 to 7',
    required: false 
  })
  @IsInt({ message: 'clareza_carreira must be an integer' })
  @Min(1, { message: 'clareza_carreira must be at least 1' })
  @Max(7, { message: 'clareza_carreira must be at most 7' })
  @IsOptional()
  clareza_carreira?: number;

  @ApiProperty({ example: 'Gostaria de entender melhor o plano de carreira disponível.', required: false })
  @IsString({ message: 'comentarios_carreira' })
  @IsOptional()
  comentarios_carreira?: string;


  @ApiProperty({ 
    example: 5, 
    minimum: 1, 
    maximum: 7,
    description: 'Likert scale from 1 to 7',
    required: false 
  })
  @IsInt({ message: 'expectativa_permanencia must be an integer' })
  @Min(1, { message: 'expectativa_permanencia must be at least 1' })
  @Max(7, { message: 'expectativa_permanencia must be at most 7' })
  @IsOptional()
  expectativa_permanencia?: number;

  @ApiProperty({ example: 'Sinto-me motivado a construir minha carreira aqui.', required: false })
  @IsString({ message: 'comentarios_permanencia must be a string' })
  @IsOptional()
  comentarios_permanencia?: string;

  
  @ApiProperty({ 
    example: 8, 
    minimum: 1, 
    maximum: 10,
    description: 'Employee Net Promoter Score from 1 to 10)',
    required: false 
  })
  @IsInt({ message: 'eNPS must be an integer' })
  @Min(0, { message: 'eNPS must be at least 0' })
  @Max(10, { message: 'eNPS must be at most 10' })
  @IsOptional()
  enps?: number;

  @ApiProperty({ example: 'O equilíbrio entre vida pessoal e profissional é respeitado aqui.', required: false })
  @IsString({ message: 'enps_aberto must be a string' })
  @IsOptional()
  enps_aberto?: string;
}
