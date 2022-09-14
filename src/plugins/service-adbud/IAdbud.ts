import { AxiosResponse } from 'axios';

export enum IAdbudResponseStatus {
  success = "success",
  fail = "fail",
}
export interface IAdbudResponse<T> {
  status: IAdbudResponseStatus;
  message?: string;
  data: T;
}
export interface IAdbudAxiosResponse<T> extends AxiosResponse {
  data: IAdbudResponse<T>;
}