import { IsInt, IsOptional, IsString } from 'class-validator';

export class EmployeeEvaluationDto {
  @IsInt()
  @IsOptional()
  interesse_no_cargo?: number;

  @IsString()
  @IsOptional()
  comentarios_interesse?: string;

  @IsInt()
  @IsOptional()
  contribuicao?: number;

  @IsString()
  @IsOptional()
  comentarios_contribuicao?: string;

  @IsInt()
  @IsOptional()
  aprendizado_desenvolvimento?: number;

  @IsString()
  @IsOptional()
  comentarios_aprendizado?: string;

  @IsInt()
  @IsOptional()
  feedback?: number;

  @IsString()
  @IsOptional()
  comentarios_feedback?: string;

  @IsInt()
  @IsOptional()
  interacao_gestor?: number;

  @IsString()
  @IsOptional()
  comentarios_interacao?: string;

  @IsInt()
  @IsOptional()
  clareza_carreira?: number;

  @IsString()
  @IsOptional()
  comentarios_carreira?: string;

  @IsInt()
  @IsOptional()
  expectativa_permanencia?: number;

  @IsString()
  @IsOptional()
  comentarios_permanencia?: string;

  @IsInt()
  @IsOptional()
  enps?: number;

  @IsString()
  @IsOptional()
  enps_aberto?: string;
}
