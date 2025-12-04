import { IntersectionType } from '@nestjs/swagger';
import { EmployeeBaseDto } from './employee-base.dto';
import { EmployeeEvaluationDto } from './employee-evaluation.dto';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto extends IntersectionType(
  EmployeeBaseDto,
  EmployeeEvaluationDto,
) {
}
