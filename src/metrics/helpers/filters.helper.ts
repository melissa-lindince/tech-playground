import { MetricsFiltersDto } from "src/metrics/dto/metrics-filters.dto";

export class FiltersHelper {
  static getActiveFiltersObject(filters?: MetricsFiltersDto): any {
    if (!filters) return {};

    const filterKeys = [
      'area',
      'cargo',
      'localidade',
      'genero',
      'geracao',
      'n0_empresa',
      'n1_diretoria',
      'n2_gerencia',
    ];

    const where = filterKeys.reduce((activeFilters, filterName) => {
      if (filters[filterName]) {
        activeFilters[filterName] = filters[filterName];
      }
      return activeFilters;
    }, {} as any);

    return where;
  }
}