import { PartialType } from '@nestjs/swagger';
import { EmployeeBaseDto } from './employee-base.dto';

export class UpdateEmployeeDto extends PartialType(EmployeeBaseDto) {}
