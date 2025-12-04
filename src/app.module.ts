import { Module } from '@nestjs/common';
import { EmployeesModule } from './employee/employees.module';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeesModule, 
    MetricsModule
  ],
})

export class AppModule {}
