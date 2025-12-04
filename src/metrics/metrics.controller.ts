import {
  Controller,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { MetricsFiltersDto } from './dto/metrics-filters.dto';
import {
  ApiGetMetrics,
  ApiGetCompanyMetrics,
  ApiGetMetricsByArea,
  ApiGetMetricsBySpecificArea,
} from './metrics.swagger';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Get()
  @ApiGetMetrics()
  getMetrics(@Query() filters: MetricsFiltersDto) {
    return this.service.getMetrics(filters);
  }

  @Get('company')
  @ApiGetCompanyMetrics()
  getCompanyMetrics() {
    return this.service.getCompanyMetrics();
  }

  @Get('by-area')
  @ApiGetMetricsByArea()
  getMetricsByArea() {
    return this.service.getMetricsByArea();
  }

  @Get('by-area/:area')
  @ApiGetMetricsBySpecificArea()
  getMetricsBySpecificArea(@Param('area') area: string) {
    return this.service.getMetricsBySpecificArea(area);
  }
}
