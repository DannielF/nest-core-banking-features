import { ApiProperty } from '@nestjs/swagger';

class FilterCriterion {
  @ApiProperty({ example: 'encodedKey' })
  field: string;
  @ApiProperty({ example: 'EQUALS' })
  operator: string;
  @ApiProperty({ example: 'value' })
  secondValue?: string;
  @ApiProperty({ example: 'value' })
  value: string;
  @ApiProperty({ example: '[value, value]' })
  values?: string[];
}

class SortingCriteria {
  @ApiProperty({ example: 'encodedKey' })
  field: string;
  @ApiProperty({ example: 'ASC' })
  order: string;
}
export class SearchFilterDTO {
  @ApiProperty({ type: [FilterCriterion] })
  filterCriteria: FilterCriterion[];
  @ApiProperty({ type: SortingCriteria })
  sortingCriteria: SortingCriteria;
}
