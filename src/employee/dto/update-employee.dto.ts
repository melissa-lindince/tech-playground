import { IntersectionType, PartialType } from '@nestjs/swagger';
import { EmployeeBaseDto } from './employee-base.dto';
import { EmployeeEvaluationDto } from './employee-evaluation.dto';


const UpdateEmployeeBase = IntersectionType(
  EmployeeBaseDto,
  EmployeeEvaluationDto,
);

export class UpdateEmployeeDto extends PartialType(UpdateEmployeeBase) {}
