import { MyPluginConfig } from "./sec.config";
import { adbud } from "./adbud";
import { ICustomerData, ICustomerUpdateData } from "./ICustomer";
import { ICustomerSuggestionData } from "./ICustomerSuggestion";
import { ISearchTermDatum } from "./ISearchTerm";
import { IDashboardData, IDashboardSelector } from "./IDashboard";
import { ISetTermData } from "./ISetTerm";
import { IGeoTarget } from "./IGeoTarget";
import { ServiceCallable, ServicesBase } from "@bettercorp/service-base";

export interface ADBudReturnable extends ServiceCallable {
  getCustomer(
    host: string,
    username: string,
    password: string,
    customerId?: string
  ): Promise<ICustomerData>;
  setCustomer(
    host: string,
    username: string,
    password: string,
    customerId: string,
    customer: ICustomerUpdateData
  ): Promise<ICustomerData>;
  getSuggestions(
    host: string,
    username: string,
    password: string,
    customerId: string
  ): Promise<ICustomerSuggestionData>;
  getSearchTerms(
    host: string,
    username: string,
    password: string,
    customerId: string
  ): Promise<Array<ISearchTermDatum>>;
  setSearchTerms(
    host: string,
    username: string,
    password: string,
    customerId: string,
    term: string,
    wanted: boolean
  ): Promise<ISetTermData>;
  getStats(
    host: string,
    username: string,
    password: string,
    customerId: string,
    startDate: number,
    endDate: number,
    selectors: Array<IDashboardSelector>,
    hideCosts: boolean
  ): Promise<IDashboardData>;
  getGeoTargets(
    host: string,
    username: string,
    password: string,
    customerId: string,
    term: string,
    country: string
  ): Promise<Array<IGeoTarget>>;
}

export class Service extends ServicesBase<
  ServiceCallable,
  ServiceCallable,
  ADBudReturnable,
  ServiceCallable,
  ServiceCallable,
  MyPluginConfig
> {
  async init() {
    this.onReturnableEvent(
      "getCustomer",
      async (
        host: string,
        username: string,
        password: string,
        customerId?: string
      ) => {
        const adbudClient = new adbud(host, username, password, customerId);
        await adbudClient.login();
        return await adbudClient.getCustomer();
      }
    );
    this.onReturnableEvent(
      "setCustomer",
      async (
        host: string,
        username: string,
        password: string,
        customerId: string,
        customer: ICustomerUpdateData
      ) => {
        const adbudClient = new adbud(host, username, password, customerId);
        await adbudClient.login();
        return await adbudClient.setCustomer(customer);
      }
    );
    this.onReturnableEvent(
      "getSuggestions",
      async (
        host: string,
        username: string,
        password: string,
        customerId: string
      ) => {
        const adbudClient = new adbud(host, username, password, customerId);
        await adbudClient.login();
        return await adbudClient.getSuggestions();
      }
    );
    this.onReturnableEvent(
      "getSearchTerms",
      async (
        host: string,
        username: string,
        password: string,
        customerId: string
      ) => {
        const adbudClient = new adbud(host, username, password, customerId);
        await adbudClient.login();
        return await adbudClient.getSearchTerms();
      }
    );
    this.onReturnableEvent(
      "setSearchTerms",
      async (
        host: string,
        username: string,
        password: string,
        customerId: string,
        term: string,
        wanted: boolean
      ) => {
        const adbudClient = new adbud(host, username, password, customerId);
        await adbudClient.login();
        return await adbudClient.setSearchTerm(term, wanted);
      }
    );
    this.onReturnableEvent(
      "getStats",
      async (
        host: string,
        username: string,
        password: string,
        customerId: string,
        startDate: number,
        endDate: number,
        selectors: Array<IDashboardSelector>,
        hideCosts: boolean
      ) => {
        const adbudClient = new adbud(host, username, password, customerId);
        await adbudClient.login();
        return await adbudClient.getStats(
          startDate,
          endDate,
          selectors,
          hideCosts
        );
      }
    );
    this.onReturnableEvent(
      "getGeoTargets",
      async (
        host: string,
        username: string,
        password: string,
        customerId: string,
        term: string,
        country: string
      ) => {
        const adbudClient = new adbud(host, username, password, customerId);
        await adbudClient.login();
        return await adbudClient.geoTarget(term, country);
      }
    );
  }
}
