import { IDashboardSelector } from './IDashboard';


export interface IAdBudRequest<T> {
  data: T;
  auth: IAdBudRequestAuth;
}

export interface IAdBudRequestAuth {
  username: string;
  password: string;
  host: string;
  customerId?: string;
}

export interface IAdBudRequestStats {
  startDate: number;
  endDate: number;
  selectors: Array<IDashboardSelector>;
}
