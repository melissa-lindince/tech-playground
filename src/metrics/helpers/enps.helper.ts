import { PrismaService } from 'src/prisma/prisma.service';
import { calculatePercentage } from 'src/common/utils/number-utils';

export interface EnpsMetrics {
  enpsScore: number;
  enpsRespondentsCount: number;
  enpsPromoterPercentage: number;
  enpsDetractorPercentage: number;
  enpsDistribution: {
    promoters: { count: number; percentage: number };
    passives: { count: number; percentage: number };
    detractors: { count: number; percentage: number };
  };
}

export class EnpsHelper {
  constructor(private readonly prisma: PrismaService) {}

  async calculateEnpsMetrics(whereClause?: any): Promise<EnpsMetrics> {
    const where = whereClause || {};

    const enpsRespondentsCount = await this.prisma.employees.count({
      where: { ...where, enps: { not: null } },
    });

    const enpsPromotersCount = await this.prisma.employees.count({
      where: { ...where, enps: { gte: 9 } },
    });

    const enpsPassivesCount = await this.prisma.employees.count({
      where: { ...where, enps: { gte: 7, lte: 8 } },
    });

    const enpsDetractorsCount = await this.prisma.employees.count({
      where: { ...where, enps: { lte: 6 } },
    });

    const enpsPromoterPercentage = calculatePercentage(
      enpsPromotersCount,
      enpsRespondentsCount,
    );
    const enpsDetractorPercentage = calculatePercentage(
      enpsDetractorsCount,
      enpsRespondentsCount,
    );
    const enpsPassivePercentage = calculatePercentage(
      enpsPassivesCount,
      enpsRespondentsCount,
    );

    const enpsScore = enpsPromoterPercentage - enpsDetractorPercentage;

    return {
      enpsScore,
      enpsRespondentsCount,
      enpsPromoterPercentage,
      enpsDetractorPercentage,
      enpsDistribution: {
        promoters: { count: enpsPromotersCount, percentage: enpsPromoterPercentage },
        passives: { count: enpsPassivesCount, percentage: enpsPassivePercentage },
        detractors: { count: enpsDetractorsCount, percentage: enpsDetractorPercentage },
      },
    };
  }

  categorizeNPS(score: number | null): string {
    if (score === null || score === undefined) return 'Not Answered';
    if (score >= 9) return 'Promoter';
    if (score >= 7) return 'Passive';
    return 'Detractor';
  }
}