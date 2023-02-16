export interface BaseType {
  id: number;
  name: string;
}
export interface IResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
}
