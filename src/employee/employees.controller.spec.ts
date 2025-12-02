import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const mockEmployeesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an employee', async () => {
    const dto: CreateEmployeeDto = {
      nome: 'Anya',
      email: 'anya@email.com',
      email_corporativo: 'anya@empresa.com',
    } as CreateEmployeeDto;

    const result = { id: 'uuid', ...dto };

    mockEmployeesService.create.mockResolvedValue(result);

    const response = await controller.create(dto);

    expect(response).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return a list of employees', async () => {
    const result = [{ id: '1' }, { id: '2' }];

    mockEmployeesService.findAll.mockResolvedValue(result);

    const response = await controller.findAll();

    expect(response).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one employee by id', async () => {
    const id = 'uuid-valid';
    const result = { id, nome: 'Anya' };

    mockEmployeesService.findOne.mockResolvedValue(result);

    const response = await controller.findOne(id);

    expect(response).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an employee', async () => {
    const id = 'uuid-valid';
    const dto: UpdateEmployeeDto = {
      nome: 'Updated Name',
    } as UpdateEmployeeDto;

    const result = { id, ...dto };

    mockEmployeesService.update.mockResolvedValue(result);

    const response = await controller.update(id, dto);

    expect(response).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should delete an employee', async () => {
    const id = 'uuid-valid';
    const result = { id };

    mockEmployeesService.delete.mockResolvedValue(result);

    const response = await controller.remove(id);

    expect(response).toEqual(result);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
