export class CreateInterestAccrualDto {
  filterCriteria: FilterCriterion[];
  sortingCriteria: SortingCriteria;
}

class FilterCriterion {
  field: string;
  operator: string;
  secondValue?: string;
  value: string;
}

class SortingCriteria {
  field: string;
  order: string;
}
