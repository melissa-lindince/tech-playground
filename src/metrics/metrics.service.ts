import { Injectable, NotFoundException } from '@nestjs/common';
import { calculatePercentage, roundToTwoDecimals } from 'src/common/utils/number-utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetricsFiltersDto } from './dto/metrics-filters.dto';

import { EnpsHelper } from 'src/metrics/helpers/enps.helper';
import { LikertHelper } from 'src/metrics/helpers/likert.helper';
import { FavorabilityHelper } from 'src/metrics/helpers/favorability.helper';
import { FiltersHelper } from 'src/metrics/helpers/filters.helper';

export type { EnpsMetrics } from './helpers/enps.helper';
export type { LikertAverages } from './helpers/likert.helper';
export type { Favorability } from './helpers/favorability.helper';

@Injectable()
export class MetricsService {
  private readonly enpsHelper: EnpsHelper;
  private readonly likertHelper: LikertHelper;
  private readonly favorabilityHelper: FavorabilityHelper;

  constructor(private readonly prisma: PrismaService) {
    this.enpsHelper = new EnpsHelper(prisma);
    this.likertHelper = new LikertHelper(prisma);
    this.favorabilityHelper = new FavorabilityHelper(prisma);
  }

  async getMetrics(filters?: MetricsFiltersDto) {
    const whereClause = FiltersHelper.getActiveFiltersObject(filters);

    const totalEmployees = await this.prisma.employees.count({ where: whereClause });

    const [enpsMetrics, likertAverages, favorability] = await Promise.all([
      this.enpsHelper.calculateEnpsMetrics(whereClause),
      this.likertHelper.calculateLikertAverages(whereClause),
      this.favorabilityHelper.calculateFavorability(whereClause),
    ]);

    const responseRate = calculatePercentage(
      enpsMetrics.enpsRespondentsCount,
      totalEmployees,
    );

    return {
      filters: filters || {},
      overview: {
        totalEmployees,
        enpsRespondentsCount: enpsMetrics.enpsRespondentsCount,
        responseRate: roundToTwoDecimals(responseRate),
      },
      nps: {
        score: roundToTwoDecimals(enpsMetrics.enpsScore),
        distribution: {
          promoters: {
            count: enpsMetrics.enpsDistribution.promoters.count,
            percentage: roundToTwoDecimals(
              enpsMetrics.enpsDistribution.promoters.percentage,
            ),
          },
          passives: {
            count: enpsMetrics.enpsDistribution.passives.count,
            percentage: roundToTwoDecimals(
              enpsMetrics.enpsDistribution.passives.percentage,
            ),
          },
          detractors: {
            count: enpsMetrics.enpsDistribution.detractors.count,
            percentage: roundToTwoDecimals(
              enpsMetrics.enpsDistribution.detractors.percentage,
            ),
          },
        },
      },
      likertAverages,
      favorability,
    };
  }

  async getCompanyMetrics() {
    return this.getMetrics();
  }

  async getMetricsByArea() {
    const areas = await this.prisma.employees.findMany({
      select: { area: true },
      distinct: ['area'],
    });

    const results = await Promise.all(
      areas.map(async (a) => {
        const metrics = await this.getMetrics({ area: a.area });
        return {
          area: a.area,
          ...metrics,
        };
      }),
    );

    return results;
  }

  async getMetricsBySpecificArea(area: string) {
    const metrics = await this.getMetrics({ area });

    if (metrics.overview.totalEmployees === 0) {
      throw new NotFoundException(`No employees found in area: ${area}`);
    }

    return {
      area,
      ...metrics,
    };
  }
}
