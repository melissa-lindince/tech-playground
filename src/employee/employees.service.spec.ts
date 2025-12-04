import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    employees: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const date = new Date();
    const dateString = date.toISOString();

    const createDto: CreateEmployeeDto = {
      nome: 'Anya Forger',
      email: 'anya.forger@email.com',
      email_corporativo: 'anya.forger@empresa.com',
      area: 'tecnologia',
      cargo: 'gerente',
      funcao: 'gestor',
      localidade: 'Fortaleza',
      tempo_de_empresa: 'mais de 5 anos',
      genero: 'feminino',
      geracao: 'geração z',
      n0_empresa: 'Company Spy x family',
      n4_area: 'área a111',
      data_resposta: dateString
    };

    describe('success', () => {
      it('should create an employee successfully', async () => {
        const expectedResult = { id: '1', ...createDto };
        mockPrismaService.employees.findFirst.mockResolvedValue(null);
        mockPrismaService.employees.create.mockResolvedValue(expectedResult);

        const result = await service.create(createDto);

        expect(mockPrismaService.employees.findFirst).toHaveBeenCalledWith({
          where: {
            OR: [
              { email: createDto.email },
              { email_corporativo: createDto.email_corporativo },
            ],
          },
        });

        expect(mockPrismaService.employees.create).toHaveBeenCalledWith({
          data: {
            ...createDto,
            data_resposta: expect.any(Date),
          },
        });

        expect(result).toEqual(expectedResult);
      });
    });

    describe('failure', () => {
      it('should throw ConflictException when email already exists', async () => {
        mockPrismaService.employees.findFirst.mockResolvedValue({ id: '1' });

        await expect(service.create(createDto)).rejects.toThrow(
          new ConflictException(
            'There is already an employee with this email registered.',
          ),
        );
        expect(mockPrismaService.employees.create).not.toHaveBeenCalled();
      });

      it('should throw ConflictException when corporate email already exists', async () => {
        const existingEmployee = {
          id: '1',
          email_corporativo: createDto.email_corporativo,
        };
        mockPrismaService.employees.findFirst.mockResolvedValue(existingEmployee);

        await expect(service.create(createDto)).rejects.toThrow(ConflictException);
      });
    });
});

  describe('findAll', () => {
    it('should return all employees ordered by data_resposta desc', async () => {
      const expectedEmployees = [
        { id: '1', nome: 'Employee 1', data_resposta: new Date() },
        { id: '2', nome: 'Employee 2', data_resposta: new Date() },
      ];
      mockPrismaService.employees.findMany.mockResolvedValue(expectedEmployees);

      const result = await service.findAll();

      expect(mockPrismaService.employees.findMany).toHaveBeenCalledWith({
        orderBy: {
          data_resposta: 'desc',
        },
      });
      expect(result).toEqual(expectedEmployees);
    });

    it('should return empty array when no employees exist', async () => {
      mockPrismaService.employees.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an employee by id', async () => {
      const expectedEmployee = { id: '1', nome: 'Test Employee' };
      mockPrismaService.employees.findUnique.mockResolvedValue(expectedEmployee);

      const result = await service.findOne('1');

      expect(mockPrismaService.employees.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(expectedEmployee);
    });

    it('should throw NotFoundException when employee does not exist', async () => {
      mockPrismaService.employees.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        new NotFoundException('Employee not found'),
      );
    });
  });

  describe('update', () => {
    const updateDto: UpdateEmployeeDto = {
      nome: 'Updated Name',
    };

    it('should update an employee successfully', async () => {
      const existingEmployee = { id: '1', nome: 'Old Name' };
      const updatedEmployee = { id: '1', nome: 'Updated Name' };
      
      mockPrismaService.employees.findUnique.mockResolvedValue(existingEmployee);
      mockPrismaService.employees.update.mockResolvedValue(updatedEmployee);

      const result = await service.update('1', updateDto);

      expect(mockPrismaService.employees.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockPrismaService.employees.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateDto,
      });
      expect(result).toEqual(updatedEmployee);
    });

    it('should throw NotFoundException when employee does not exist', async () => {
      mockPrismaService.employees.findUnique.mockResolvedValue(null);

      await expect(service.update('999', updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.employees.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when trying to update evaluation field', async () => {
      const existingEmployee = { id: '1', nome: 'Test' };
      const invalidUpdateDto = {
        nome: 'Updated Name',
        interesse_no_cargo: 5,
      } as UpdateEmployeeDto;

      mockPrismaService.employees.findUnique.mockResolvedValue(existingEmployee);

      await expect(service.update('1', invalidUpdateDto)).rejects.toThrow(
        new BadRequestException(
          'The interesse_no_cargo field cannot be changed after the survey has been submitted.',
        ),
      );
      expect(mockPrismaService.employees.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for each protected evaluation field', async () => {
      const existingEmployee = { id: '1', nome: 'Test' };
      mockPrismaService.employees.findUnique.mockResolvedValue(existingEmployee);

      const protectedFields = [
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
        'data_resposta',
      ];

      for (const field of protectedFields) {
        const invalidDto = { [field]: 'any value' } as UpdateEmployeeDto;
        
        await expect(service.update('1', invalidDto)).rejects.toThrow(
          new BadRequestException(
            `The ${field} field cannot be changed after the survey has been submitted.`,
          ),
        );
      }
    });
  });

  describe('delete', () => {
    it('should delete an employee successfully', async () => {
      const existingEmployee = { id: '1', nome: 'Test Employee' };
      mockPrismaService.employees.findUnique.mockResolvedValue(existingEmployee);
      mockPrismaService.employees.delete.mockResolvedValue(existingEmployee);

      const result = await service.delete('1');

      expect(mockPrismaService.employees.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockPrismaService.employees.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(existingEmployee);
    });

    it('should throw NotFoundException when employee does not exist', async () => {
      mockPrismaService.employees.findUnique.mockResolvedValue(null);

      await expect(service.delete('999')).rejects.toThrow(
        new NotFoundException('Employee not found'),
      );
      expect(mockPrismaService.employees.delete).not.toHaveBeenCalled();
    });
  });
});