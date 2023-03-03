export interface BaseType {
  id: number;
  name: string;
}
//登录login时候
export interface IResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
}

//search查询
export interface QueryParams {
  [key: string]: string | number;
}

//页面信息
export interface Paginator {
  page: number; // start: 1;
  limit: number;
  total?: number;
}
export type RequestOmitPaginator<T> = Omit<T, "page" | "limit">;

export interface ListResponse {
  total: number; //list的total
  paginator?: Paginator;
}

export type DeleteResponse = boolean;
