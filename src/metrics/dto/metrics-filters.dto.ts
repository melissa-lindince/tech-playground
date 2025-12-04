import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class MetricsFiltersDto {
  @ApiPropertyOptional({ example: 'financeiro', description: 'Filter by area/department' })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiPropertyOptional({ example: 'analista', description: 'Filter by position' })
  @IsString()
  @IsOptional()
  cargo?: string;

  @ApiPropertyOptional({ example: 'recife', description: 'Filter by location' })
  @IsString()
  @IsOptional()
  localidade?: string;

  @ApiPropertyOptional({ example: 'outro', description: 'Filter by gender' })
  @IsString()
  @IsOptional()
  genero?: string;

  @ApiPropertyOptional({ example: 'geração y', description: 'Filter by generation' })
  @IsString()
  @IsOptional()
  geracao?: string;

  @ApiPropertyOptional({ example: 'empresa b', description: 'Filter by company' })
  @IsString()
  @IsOptional()
  n0_empresa?: string;

  @ApiPropertyOptional({ example: 'diretoria a', description: 'Filter by directorate' })
  @IsString()
  @IsOptional()
  n1_diretoria?: string;

  @ApiPropertyOptional({ example: 'gerência b1', description: 'Filter by management' })
  @IsString()
  @IsOptional()
  n2_gerencia?: string;
}