import { PrismaService } from 'src/prisma/prisma.service';
import { calculatePercentage, roundToTwoDecimals } from 'src/common/utils/number-utils';

export interface Favorability {
  interesse_no_cargo: number;
  contribuicao: number;
  aprendizado_desenvolvimento: number;
  feedback: number;
  interacao_gestor: number;
  clareza_carreira: number;
  expectativa_permanencia: number;
}

export class FavorabilityHelper {
  private readonly LIKERT_FIELDS = [
    'interesse_no_cargo',
    'contribuicao',
    'aprendizado_desenvolvimento',
    'feedback',
    'interacao_gestor',
    'clareza_carreira',
    'expectativa_permanencia',
  ];

  constructor(private readonly prisma: PrismaService) {}

  async calculateFavorability(whereClause?: any): Promise<Favorability> {
    const where = whereClause || {};
    const favorability: any = {};

    for (const field of this.LIKERT_FIELDS) {
      const favorableCount = await this.prisma.employees.count({
        where: { ...where, [field]: { gte: 4 } },
      });

      const validResponses = await this.prisma.employees.count({
        where: { ...where, [field]: { not: null } },
      });

      favorability[field] = roundToTwoDecimals(
        calculatePercentage(favorableCount, validResponses),
      );
    }

    return favorability;
  }
}
