import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Tools } from '@bettercorp/tools/lib/Tools';
import { ILoginResponse } from './ILoginResponse';
import { ICustomerData, ICustomer } from './ICustomer';
import { ICustomerSuggestionData, ICustomerSuggestion } from './ICustomerSuggestion';
import { IDashboardData, IDashboard, IDashboardSelector } from './IDashboard';
import { ISearchTermDatum, ISearchTerm } from './ISearchTerm';
import { ISetTermData, ISetTerm } from './ISetTerm';

export class adbud {
  private username: string;
  private password: string;
  private customerId?: string;
  private axios: AxiosInstance;

  constructor(host: string, username: string, password: string, customerId?: string) {
    this.username = username;
    this.password = password;
    this.customerId = customerId;
    this.axios = axios.create({
      withCredentials: true,
      baseURL: host
    });
  }

  async login(): Promise<void> {
    let loginResp = await this.axios.post<any, AxiosResponse<ILoginResponse>>('/login', {
      "email": this.username,
      "password": this.password,
      "_locale": "",
      "redirect": ""
    });

    if (loginResp.status !== 200) throw `Login Failed: ${ loginResp.status }`;
    if (loginResp.data.status !== 'success') throw `Login Failed[]: ${ loginResp.data.status }`;

    (this.axios.defaults.headers as any)['Cookie'] = (loginResp as any).headers['set-cookie'][0];
    if (Tools.isNullOrUndefined(this.customerId)) {
      let customHtml = await this.axios({
        url: loginResp.data.data.url,
        method: 'GET'
      });
      this.customerId = `${ customHtml.data }`.split('"customer_id":"')[1].split('"')[0].trim();
    }
  }

  async getCustomer(): Promise<ICustomerData> {
    let customerResp = await this.axios.get<any, AxiosResponse<ICustomer>>(`/customer/${ this.customerId }`);
    if (customerResp.status !== 200) throw `Customer GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== 'success') throw `Customer GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async getSuggestions(): Promise<ICustomerSuggestionData> {
    let customerResp = await this.axios.get<any, AxiosResponse<ICustomerSuggestion>>(`/customer/${ this.customerId }/suggestion`);
    if (customerResp.status !== 200) throw `Customer Suggest GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== 'success') throw `Customer Suggest GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async getStats(startDate: number, endDate: number, selectors: Array<IDashboardSelector>): Promise<IDashboardData> {
    let params: Array<string> = [];
    let start = new Date(startDate);
    let end = new Date(endDate);
    params.push(`start=${ start.getFullYear() }-${start.getMonth().toString().length === 1 ? '0' : ''}${ start.getMonth() }-${start.getDate().toString().length === 1 ? '0' : ''}${ start.getDate() }`);
    params.push(`end=${ end.getFullYear() }-${end.getMonth().toString().length === 1 ? '0' : ''}${ end.getMonth() }-${end.getDate().toString().length === 1 ? '0' : ''}${ end.getDate() }`);
    for (let select of selectors) {
      params.push(`selector%5B%5D=${ select }`);
    }
    let customerResp = await this.axios.get<any, AxiosResponse<IDashboard>>(`/dashboard/${ this.customerId }/stats?${ params.join('&') }`);
    if (customerResp.status !== 200) throw `Customer Dashboard GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== 'success') throw `Customer Dashboard GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async getSearchTerms(): Promise<ISearchTermDatum[]> {
    let customerResp = await this.axios.get<any, AxiosResponse<ISearchTerm>>(`/customer/searchterm?custom_filters%5Bcategory%5D=none&custom_filters%5Bcustomer_id%5D=${this.customerId}&grid%5Browset%5D=50`);
    if (customerResp.status !== 200) throw `Customer Suggest GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== 'success') throw `Customer Suggest GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async setSearchTerm(term: string, wanted: boolean): Promise<ISetTermData> {
    let customerResp = await this.axios.post<any, AxiosResponse<ISetTerm>>(`/customer/${this.customerId}/searchterm`, {
      term: term,
      category: wanted ? 'wanted' : 'unwanted'
    });
    if (customerResp.status !== 200) throw `Customer searchTerm SET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== 'success') throw `Customer searchTerm SET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }
}
