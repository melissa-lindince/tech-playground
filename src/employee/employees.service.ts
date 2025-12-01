import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    return this.prisma.employees.create({ 
      data:{
        ...dto,
        data_resposta: new Date(),
      }
    });
  }

  findAll() {
    return this.prisma.employees.findMany();
  }

  findOne(id: string) {
    return this.prisma.employees.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateEmployeeDto) {
    return this.prisma.employees.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.employees.delete({
      where: { id },
    });
  }
}
