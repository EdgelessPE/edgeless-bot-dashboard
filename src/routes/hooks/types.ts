import { SortBy } from '@/routes/utils';

export type URLParams = {
  current: number;
  pageSize: number;
  sortBy: SortBy;
  search?: string;
};
