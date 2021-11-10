export default interface PaginationContract {
  page: number
  perPage: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
