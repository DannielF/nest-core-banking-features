export class SearchFilter {
  filterCriteria: FilterCriterion[];
  sortingCriteria: SortingCriteria;
}

class FilterCriterion {
  field: string;
  operator: string;
  secondValue?: string;
  value: string;
  values?: string[];
}

class SortingCriteria {
  field: string;
  order: string;
}
