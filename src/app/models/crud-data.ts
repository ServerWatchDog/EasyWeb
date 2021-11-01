export interface CrudData<T> {
  data: Array<T>,
  pageIndex: number,
  pageCount: number,
  size: number
}
