export class PaginationParameters {
  page?: number = 1;
  limit?: number = 10;
  sortBy?: string = 'id';
  sortDirection?: 'ASC' | 'DESC' = 'ASC';
  search?: string;
}
