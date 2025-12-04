import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import {
  ApiCreateEmployee,
  ApiFindAllEmployees,
  ApiFindOneEmployee,
  ApiUpdateEmployee,
  ApiDeleteEmployee,
} from './employees.swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post()
  @ApiCreateEmployee()
  create(@Body() dto: CreateEmployeeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiFindAllEmployees()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiFindOneEmployee()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiUpdateEmployee()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiDeleteEmployee()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}