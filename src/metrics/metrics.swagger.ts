import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

const companyMetricsExample = {
  filters: {},
  overview: {
    totalEmployees: 150,
    enpsRespondentsCount: 142,
    responseRate: 94.67,
  },
  nps: {
    score: 42.25,
    distribution: {
      promoters: { count: 85, percentage: 59.86 },
      passives: { count: 35, percentage: 24.65 },
      detractors: { count: 22, percentage: 15.49 },
    },
  },
  likertAverages: {
    interesse_no_cargo: 4.2,
    contribuicao: 4.5,
    aprendizado_desenvolvimento: 3.8,
    feedback: 3.5,
    interacao_gestor: 4.1,
    clareza_carreira: 3.2,
    expectativa_permanencia: 4.0,
  },
  favorability: {
    interesse_no_cargo: 78.5,
    contribuicao: 85.2,
    aprendizado_desenvolvimento: 68.3,
    feedback: 62.0,
    interacao_gestor: 75.4,
    clareza_carreira: 55.6,
    expectativa_permanencia: 72.1,
  },
};

const areaMetricsExample = {
  area: 'comercial',
  filters: { area: 'comercial' },
  overview: {
    totalEmployees: 45,
    enpsRespondentsCount: 43,
    responseRate: 95.56,
  },
  nps: {
    score: 48.84,
    distribution: {
      promoters: { count: 28, percentage: 65.12 },
      passives: { count: 10, percentage: 23.26 },
      detractors: { count: 5, percentage: 11.63 },
    },
  },
  likertAverages: {
    interesse_no_cargo: 4.3,
    contribuicao: 4.6,
    aprendizado_desenvolvimento: 4.1,
    feedback: 3.8,
    interacao_gestor: 4.2,
    clareza_carreira: 3.5,
    expectativa_permanencia: 4.2,
  },
  favorability: {
    interesse_no_cargo: 82.1,
    contribuicao: 88.4,
    aprendizado_desenvolvimento: 76.7,
    feedback: 69.8,
    interacao_gestor: 79.1,
    clareza_carreira: 60.5,
    expectativa_permanencia: 81.4,
  },
};

export function ApiGetMetrics() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get metrics with flexible filters',
      description:
        'Returns comprehensive metrics with support for multiple optional filters. ' +
        'Can be used to get company-wide metrics (no filters) or filter by area, localidade, genero...' +
        'Supports any combination of filters to create custom views. ' +
        'This is the most flexible endpoint for analytics and dashboards.',
    }),

    ApiQuery({
      name: 'area',
      required: false,
      type: String,
      description: 'Filter by area',
      example: 'tecnologia',
    }),

    ApiQuery({
      name: 'cargo',
      required: false,
      type: String,
      description: 'Filter by cargo',
      example: 'gerente',
    }),

    ApiQuery({
      name: 'localidade',
      required: false,
      type: String,
      description: 'Filter by city',
      example: 'recife',
    }),

    ApiQuery({
      name: 'genero',
      required: false,
      type: String,
      description: 'Filter by gender',
      example: 'feminino',
    }),

    ApiQuery({
      name: 'geracao',
      required: false,
      type: String,
      description: 'Filter by generation',
      example: 'geração z',
    }),

    ApiQuery({
      name: 'n0_empresa',
      required: false,
      type: String,
      description: 'Filter by company',
      example: 'empresa',
    }),

    ApiQuery({
      name: 'n1_diretoria',
      required: false,
      type: String,
      description: 'Filter by n1_diretoria',
      example: 'diretoria c',
    }),

    ApiQuery({
      name: 'n2_gerencia',
      required: false,
      type: String,
      description: 'Filter by n2_gerencia',
      example: 'gerência e1',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Metrics returned successfully',
      schema: {
        examples: {
          'no-filters': {
            summary: 'Company-wide metrics (no filters)',
            value: companyMetricsExample,
          },
          'area-filter': {
            summary: 'Metrics filtered by area',
            value: {
              filters: { area: 'tecnologia' },
              overview: {
                totalEmployees: 45,
                enpsRespondentsCount: 43,
                responseRate: 95.56,
              },
              nps: {
                score: 48.84,
                distribution: {
                  promoters: { count: 28, percentage: 65.12 },
                  passives: { count: 10, percentage: 23.26 },
                  detractors: { count: 5, percentage: 11.63 },
                },
              },
              likertAverages: {
                interesse_no_cargo: 4.3,
                contribuicao: 4.6,
                aprendizado_desenvolvimento: 4.1,
                feedback: 3.8,
                interacao_gestor: 4.2,
                clareza_carreira: 3.5,
                expectativa_permanencia: 4.2,
              },
              favorability: {
                interesse_no_cargo: 82.1,
                contribuicao: 88.4,
                aprendizado_desenvolvimento: 76.7,
                feedback: 69.8,
                interacao_gestor: 79.1,
                clareza_carreira: 60.5,
                expectativa_permanencia: 81.4,
              },
            },
          },
          'multiple-filters': {
            summary: 'Metrics with multiple filters combined',
            value: {
              filters: {
                area: 'tecnologia',
                cargo: 'coordenador',
                localidade: 'recife',
              },
              overview: {
                totalEmployees: 12,
                enpsRespondentsCount: 11,
                responseRate: 91.67,
              },
              nps: {
                score: 54.55,
                distribution: {
                  promoters: { count: 7, percentage: 63.64 },
                  passives: { count: 3, percentage: 27.27 },
                  detractors: { count: 1, percentage: 9.09 },
                },
              },
              likertAverages: {
                interesse_no_cargo: 4.5,
                contribuicao: 4.7,
                aprendizado_desenvolvimento: 4.3,
                feedback: 4.0,
                interacao_gestor: 4.4,
                clareza_carreira: 3.8,
                expectativa_permanencia: 4.5,
              },
              favorability: {
                interesse_no_cargo: 91.7,
                contribuicao: 100.0,
                aprendizado_desenvolvimento: 83.3,
                feedback: 75.0,
                interacao_gestor: 83.3,
                clareza_carreira: 66.7,
                expectativa_permanencia: 91.7,
              },
            },
          },
        },
      },
    }),
  );
}
export function ApiGetCompanyMetrics() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get company-wide metrics',
      description:
        'Returns comprehensive metrics for the entire organization including: ' +
        'NPS score, favorability rates, Likert scale averages, response rates, and distributions. ' +
        'This endpoint provides a high-level overview of employee satisfaction and engagement. ' +
        'Convenience endpoint - same as GET /metrics with no filters.',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Company metrics returned successfully',
      schema: {
        example: companyMetricsExample,
      },
    }),
  );
}

export function ApiGetMetricsByArea() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get metrics grouped by all areas',
      description:
        'Returns metrics for all areas/departments in the organization. ' +
        'Each area includes complete metrics: NPS, averages, favorability, and distributions. ' +
        'Useful for comparing performance and satisfaction across different teams and identifying high/low performing departments.',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Metrics by area returned successfully',
      schema: {
        example: [
          areaMetricsExample,
          {
            area: 'comercial',
            filters: { area: 'comercial' },
            overview: {
              totalEmployees: 28,
              enpsRespondentsCount: 27,
              responseRate: 96.43,
            },
            nps: {
              score: 35.19,
              distribution: {
                promoters: { count: 15, percentage: 55.56 },
                passives: { count: 7, percentage: 25.93 },
                detractors: { count: 5, percentage: 18.52 },
              },
            },
            likertAverages: {
              interesse_no_cargo: 4.0,
              contribuicao: 4.3,
              aprendizado_desenvolvimento: 3.6,
              feedback: 3.3,
              interacao_gestor: 3.9,
              clareza_carreira: 2.9,
              expectativa_permanencia: 3.8,
            },
            favorability: {
              interesse_no_cargo: 74.1,
              contribuicao: 81.5,
              aprendizado_desenvolvimento: 63.0,
              feedback: 55.6,
              interacao_gestor: 70.4,
              clareza_carreira: 48.1,
              expectativa_permanencia: 66.7,
            },
          },
        ],
      },
    }),
  );
}

export function ApiGetMetricsBySpecificArea() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get metrics for a specific area',
      description:
        'Returns detailed metrics for a single area/department. ' +
        'Use this endpoint to deep dive into a specific team\'s performance and satisfaction.',
    }),

    // ApiQuery({
    //   name: 'area',
    //   required: true,
    //   type: String,
    //   description: 'Area/department name',
    //   example: 'financeiro',
    // }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Area metrics returned successfully',
      schema: {
        example: areaMetricsExample,
      },
    }),

    ApiNotFoundResponse({
      description: 'No employees found in specified area',
      schema: {
        example: {
          statusCode: 404,
          message: 'No employees found in area: InvalidArea',
          error: 'Not Found',
        },
      },
    }),
  );
}
