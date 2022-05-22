import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Tools } from '@bettercorp/tools/lib/Tools';
import { ILoginResponse } from './ILoginResponse';
import { ICustomerData, ICustomerUpdateData } from './ICustomer';
import { ICustomerSuggestionData } from './ICustomerSuggestion';
import { IDashboardData, IDashboardSelector } from './IDashboard';
import { ISearchTermDatum, ISearchTerm } from './ISearchTerm';
import { ISetTermData } from './ISetTerm';
import { IGeoTarget } from './IGeoTarget';
import { IAdbudAxiosResponse, IAdbudResponseStatus } from './IAdbud';

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
    if (loginResp.data.status !== IAdbudResponseStatus.success) throw `Login Failed[]: ${ loginResp.data.status }`;

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
    let customerResp = await this.axios.get<any, IAdbudAxiosResponse<ICustomerData>>(`/customer/${ this.customerId }`);
    if (customerResp.status !== 200) throw `Customer GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== IAdbudResponseStatus.success) throw `Customer GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async setCustomer(data: ICustomerUpdateData): Promise<ICustomerData> {
    let customerResp = await this.axios.patch<any, IAdbudAxiosResponse<ICustomerData>, ICustomerUpdateData>(`/customer/${ this.customerId }`, data);
    if (customerResp.status !== 200) throw `Customer SET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== IAdbudResponseStatus.success) throw `Customer SET Failed[]: ${ customerResp.data.message }`;
    return customerResp.data.data;
  }

  async getSuggestions(): Promise<ICustomerSuggestionData> {
    let customerResp = await this.axios.get<any, IAdbudAxiosResponse<ICustomerSuggestionData>>(`/customer/${ this.customerId }/suggestion`);
    if (customerResp.status !== 200) throw `Customer Suggest GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== IAdbudResponseStatus.success) throw `Customer Suggest GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async getStats(startDate: number, endDate: number, selectors: Array<IDashboardSelector>, hideCosts?: boolean): Promise<IDashboardData> {
    let params: Array<string> = [];
    let start = new Date(startDate);
    let end = new Date(endDate);
    let sMonth = start.getMonth() + 1;
    params.push(`start=${ start.getFullYear() }-${ sMonth.toString().length === 1 ? '0' : '' }${ sMonth }-${ start.getDate().toString().length === 1 ? '0' : '' }${ start.getDate() }`);
    let eMonth = end.getMonth() + 1;
    params.push(`end=${ end.getFullYear() }-${ eMonth.toString().length === 1 ? '0' : '' }${ eMonth }-${ end.getDate().toString().length === 1 ? '0' : '' }${ end.getDate() }`);
    for (let select of selectors) {
      params.push(`selector%5B%5D=${ select }`);
    }
    if (!Tools.isNullOrUndefined(hideCosts)) {
      params.push(`hideCosts=${ hideCosts }`);
    }
    let customerResp = await this.axios.get<any, IAdbudAxiosResponse<IDashboardData>>(`/dashboard/${ this.customerId }/stats?${ params.join('&') }`);
    if (customerResp.status !== 200) throw `Customer Dashboard GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== IAdbudResponseStatus.success) throw `Customer Dashboard GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async getSearchTerms(): Promise<Array<ISearchTermDatum>> {
    let customerResp = await this.axios.get<any, AxiosResponse<ISearchTerm>>(`/customer/searchterm?custom_filters%5Bcategory%5D=none&custom_filters%5Bcustomer_id%5D=${ this.customerId }&grid%5Browset%5D=50`);
    if (customerResp.status !== 200) throw `Customer Suggest GET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== IAdbudResponseStatus.success) throw `Customer Suggest GET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async setSearchTerm(term: string, wanted: boolean): Promise<ISetTermData> {
    let customerResp = await this.axios.post<any, IAdbudAxiosResponse<ISetTermData>>(`/customer/${ this.customerId }/searchterm`, {
      term: term,
      category: wanted ? 'wanted' : 'unwanted'
    });
    if (customerResp.status !== 200) throw `Customer searchTerm SET Failed: ${ customerResp.status }`;
    if (customerResp.data.status !== IAdbudResponseStatus.success) throw `Customer searchTerm SET Failed[]: ${ customerResp.data.status }`;
    return customerResp.data.data;
  }

  async geoTarget(term: string, country: string): Promise<Array<IGeoTarget>> {
    let targetResponse = await this.axios.get(`/geotargets?country=${ encodeURIComponent(country) }&term=${ encodeURIComponent(term) }`);
    if (targetResponse.status !== 200) throw `Search geoTarget Failed: ${ targetResponse.status }`;
    if (targetResponse.data.status !== IAdbudResponseStatus.success) throw `Search geoTarget Failed[]: ${ targetResponse.data.status }`;
    return targetResponse.data.data;
  }
}