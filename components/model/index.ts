export interface BaseType {
  id: number;
  name: string;
}
export interface IResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
}
export interface Paginator {
  page: number; // start: 1;
  limit: number;
  total?: number;
}
export interface ListResponse {
  total: number;
  paginator?: Paginator;
}
