import { IAdbudResponseStatus } from './IAdbud';

export interface ISearchTerm {
  status: IAdbudResponseStatus;
  data: Array<ISearchTermDatum>;
  meta: ISearchTermMeta;
}

export interface ISearchTermDatum {
  category: ISearchTermCategory;
  created_at: string;
  keyword: string;
  keyword_normalized: string;
  updated_at: string;
  customer_id: ISearchTermCustomerID;
  term: string;
}

export enum ISearchTermCategory {
  None = "none"
}

export enum ISearchTermCustomerID {
  The618E40D276B8Ef1A1D01E815 = "618e40d276b8ef1a1d01e815"
}

export interface ISearchTermMeta {
  page: number;
  pages: number;
  records: number;
  summary: any[];
}
