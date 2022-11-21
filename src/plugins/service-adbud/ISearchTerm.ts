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
  customer_id: string;
  term: string;
}

export enum ISearchTermCategory {
  None = "none"
}

export interface ISearchTermMeta {
  page: number;
  pages: number;
  records: number;
  summary: any[];
}
