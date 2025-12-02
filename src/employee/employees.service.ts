import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

    private readonly EVALUATION_FIELDS = [
    'interesse_no_cargo',
    'comentarios_interesse',
    'contribuicao',
    'comentarios_contribuicao',
    'aprendizado_desenvolvimento',
    'comentarios_aprendizado',
    'feedback',
    'comentarios_feedback',
    'interacao_gestor',
    'comentarios_interacao',
    'clareza_carreira',
    'comentarios_carreira',
    'expectativa_permanencia',
    'comentarios_permanencia',
    'enps',
    'enps_aberto',
    'data_resposta'
  ];

  async create(dto: CreateEmployeeDto) {
    const emailExists = await this.prisma.employees.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { email_corporativo: dto.email_corporativo },
        ],
      },
    });

    if (emailExists) {
      throw new ConflictException(
        'There is already an employee with this email registered.',
      );
    }

    return this.prisma.employees.create({
      data: {
        ...dto,
        data_resposta: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.employees.findMany({
      orderBy: {
        data_resposta: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const employee = await this.prisma.employees.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    await this.findOne(id);

    for (const field of this.EVALUATION_FIELDS) {
      if (field in dto) {
        throw new BadRequestException(
          `The ${field} field cannot be changed after the survey has been submitted.`,
        );
      }
    }

    return this.prisma.employees.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.findOne(id)

    return this.prisma.employees.delete({
      where: { id },
    });
  }
}
