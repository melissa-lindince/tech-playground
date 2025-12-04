import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { EmployeesModule } from 'src/employee/employees.module';
import { EmployeesService } from 'src/employee/employees.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [EmployeesModule],
  providers: [MetricsService, EmployeesService, PrismaService],
  controllers: [MetricsController],
})
export class MetricsModule {}
