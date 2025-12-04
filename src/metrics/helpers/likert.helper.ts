import { PrismaService } from 'src/prisma/prisma.service';
import { roundToTwoDecimals } from 'src/common/utils/number-utils';

export interface LikertAverages {
  interesse_no_cargo: number;
  contribuicao: number;
  aprendizado_desenvolvimento: number;
  feedback: number;
  interacao_gestor: number;
  clareza_carreira: number;
  expectativa_permanencia: number;
}

export class LikertHelper {
  constructor(private readonly prisma: PrismaService) {}

  async calculateLikertAverages(whereClause?: any): Promise<LikertAverages> {
    const where = whereClause || {};

    const avgFields = await this.prisma.employees.aggregate({
      _avg: {
        interesse_no_cargo: true,
        contribuicao: true,
        aprendizado_desenvolvimento: true,
        feedback: true,
        interacao_gestor: true,
        clareza_carreira: true,
        expectativa_permanencia: true,
      },
      where,
    });

    return {
      interesse_no_cargo: roundToTwoDecimals(avgFields._avg.interesse_no_cargo ?? 0),
      contribuicao: roundToTwoDecimals(avgFields._avg.contribuicao ?? 0),
      aprendizado_desenvolvimento: roundToTwoDecimals(
        avgFields._avg.aprendizado_desenvolvimento ?? 0,
      ),
      feedback: roundToTwoDecimals(avgFields._avg.feedback ?? 0),
      interacao_gestor: roundToTwoDecimals(avgFields._avg.interacao_gestor ?? 0),
      clareza_carreira: roundToTwoDecimals(avgFields._avg.clareza_carreira ?? 0),
      expectativa_permanencia: roundToTwoDecimals(
        avgFields._avg.expectativa_permanencia ?? 0,
      ),
    };
  }
}
