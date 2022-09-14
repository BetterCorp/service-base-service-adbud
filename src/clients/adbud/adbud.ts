import { ICustomerSuggestionData } from "../../plugins/adbud/ICustomerSuggestion";
import { IAdBudRequestAuth } from "../../plugins/adbud/IAdBudRequest";
import {
  ICustomerData,
  ICustomerUpdateData,
} from "../../plugins/adbud/ICustomer";
import { MyPluginConfig } from "../../plugins/adbud/sec.config";
import { ISearchTermDatum } from "../../plugins/adbud/ISearchTerm";
import {
  IDashboardData,
  IDashboardSelector,
} from "../../plugins/adbud/IDashboard";
import { ISetTermData } from "../../plugins/adbud/ISetTerm";
import { IGeoTarget } from "../../plugins/adbud/IGeoTarget";
import {
  ServiceCallable,
  ServicesBase,
  ServicesClient,
} from "@bettercorp/service-base";
import { ADBudReturnable } from "../../plugins/adbud/plugin";

const TIMEOUT_GET = 10000;
const TIMEOUT_SET = 15000;
export class ADBudClient extends ServicesClient<
  ServiceCallable,
  ServiceCallable,
  ADBudReturnable,
  ServiceCallable,
  ServiceCallable,
  MyPluginConfig
> {
  public readonly _pluginName: string = "service-adbud";
  constructor(self: ServicesBase) {
    super(self);
  }
  async getCustomer(
    host: string,
    username: string,
    password: string
  ): Promise<ICustomerData>;
  async getCustomer(
    host: string,
    username: string,
    password: string,
    customerId?: string | undefined
  ): Promise<ICustomerData>;
  async getCustomer(auth: IAdBudRequestAuth): Promise<ICustomerData>;
  async getCustomer(
    hostOrAuth: string | IAdBudRequestAuth,
    username?: string,
    password?: string,
    customerId?: string | undefined
  ): Promise<ICustomerData> {
    let authObject =
      typeof hostOrAuth === "string"
        ? {
            host: hostOrAuth,
            username,
            password,
            customerId,
          }
        : hostOrAuth;
    return await this._plugin.emitEventAndReturnTimed(
      "getCustomer",
      TIMEOUT_GET,
      authObject.host,
      authObject.username!,
      authObject.password!,
      authObject.customerId
    );
  }

  async setCustomer(
    host: string,
    username: string,
    password: string,
    customerId: string,
    customer: ICustomerUpdateData
  ): Promise<ICustomerData>;
  async setCustomer(
    auth: IAdBudRequestAuth,
    customer: ICustomerUpdateData
  ): Promise<ICustomerData>;
  async setCustomer(
    hostOrAuth: string | IAdBudRequestAuth,
    username: string | ICustomerUpdateData,
    password?: string,
    customerId?: string,
    customer?: ICustomerUpdateData
  ): Promise<ICustomerData> {
    let authObject =
      typeof hostOrAuth === "string"
        ? {
            host: hostOrAuth,
            username,
            password,
            customerId,
          }
        : hostOrAuth;
    return await this._plugin.emitEventAndReturnTimed(
      "setCustomer",
      TIMEOUT_SET,
      authObject.host,
      authObject.username as string,
      authObject.password as string,
      authObject.customerId as string,
      typeof hostOrAuth === "string"
        ? (username as ICustomerUpdateData)
        : customer!
    );
  }

  async getSuggestions(
    host: string,
    username: string,
    password: string,
    customerId: string
  ): Promise<ICustomerSuggestionData>;
  async getSuggestions(
    auth: IAdBudRequestAuth
  ): Promise<ICustomerSuggestionData>;
  async getSuggestions(
    hostOrAuth: string | IAdBudRequestAuth,
    username?: string,
    password?: string,
    customerId?: string
  ): Promise<ICustomerSuggestionData> {
    let authObject =
      typeof hostOrAuth === "string"
        ? {
            host: hostOrAuth,
            username,
            password,
            customerId,
          }
        : hostOrAuth;
    return await this._plugin.emitEventAndReturnTimed(
      "getSuggestions",
      TIMEOUT_GET,
      authObject.host,
      authObject.username as string,
      authObject.password as string,
      authObject.customerId as string
    );
  }

  async getSearchTerms(
    host: string,
    username: string,
    password: string,
    customerId: string
  ): Promise<ISearchTermDatum[]>;
  async getSearchTerms(auth: IAdBudRequestAuth): Promise<ISearchTermDatum[]>;
  async getSearchTerms(
    hostOrAuth: string | IAdBudRequestAuth,
    username?: string,
    password?: string,
    customerId?: string
  ): Promise<ISearchTermDatum[]> {
    let authObject =
      typeof hostOrAuth === "string"
        ? {
            host: hostOrAuth,
            username,
            password,
            customerId,
          }
        : hostOrAuth;
    return await this._plugin.emitEventAndReturnTimed(
      "getSearchTerms",
      TIMEOUT_GET,
      authObject.host,
      authObject.username as string,
      authObject.password as string,
      authObject.customerId as string
    );
  }

  async setSearchTerms(
    host: string,
    username: string,
    password: string,
    customerId: string,
    term: string,
    wanted: boolean
  ): Promise<ISetTermData>;
  async setSearchTerms(
    auth: IAdBudRequestAuth,
    term: string,
    wanted: boolean
  ): Promise<ISetTermData>;
  async setSearchTerms(
    hostOrAuth: string | IAdBudRequestAuth,
    usernameOrTerm: string,
    passwordOrWanted: string | boolean,
    customerId?: string,
    term?: string,
    wanted?: boolean
  ): Promise<ISetTermData> {
    let authObject =
      typeof hostOrAuth === "string"
        ? {
            host: hostOrAuth,
            username: usernameOrTerm,
            password: passwordOrWanted,
            customerId,
          }
        : hostOrAuth;
    return await this._plugin.emitEventAndReturnTimed(
      "setSearchTerms",
      TIMEOUT_SET,
      authObject.host,
      authObject.username,
      authObject.password as string,
      authObject.customerId as string,
      typeof hostOrAuth === "string"
        ? (term as string)
        : (usernameOrTerm as string),
      typeof hostOrAuth === "string"
        ? (wanted as boolean)
        : (passwordOrWanted as boolean)
    );
  }

  async getStats(
    host: string,
    username: string,
    password: string,
    customerId: string,
    startDate: number,
    endDate: number,
    selectors: IDashboardSelector[],
    hideCosts: boolean
  ): Promise<IDashboardData>;
  async getStats(
    auth: IAdBudRequestAuth,
    startDate: number,
    endDate: number,
    selectors: IDashboardSelector[],
    hideCosts: boolean
  ): Promise<IDashboardData>;
  async getStats(
    hostOrAuth: string | IAdBudRequestAuth,
    usernameOrStartDate: string | number,
    passwordOrEndDate: string | number,
    customerIdOrSelectors: string | IDashboardSelector[],
    startDateOrHideCosts: number | boolean,
    endDate?: number,
    selectors?: IDashboardSelector[],
    hideCosts?: boolean
  ): Promise<IDashboardData> {
    let authObject =
      typeof hostOrAuth === "string"
        ? {
            host: hostOrAuth,
            username: usernameOrStartDate as string,
            password: passwordOrEndDate as string,
            customerId: customerIdOrSelectors as string,
          }
        : hostOrAuth;
    return await this._plugin.emitEventAndReturnTimed(
      "getStats",
      TIMEOUT_GET,
      authObject.host,
      authObject.username,
      authObject.password,
      authObject.customerId as string,
      (typeof hostOrAuth === "string"
        ? startDateOrHideCosts
        : usernameOrStartDate) as number,
      (typeof hostOrAuth === "string" ? endDate : passwordOrEndDate) as number,
      (typeof hostOrAuth === "string"
        ? selectors
        : customerIdOrSelectors) as IDashboardSelector[],
      (typeof hostOrAuth === "string"
        ? hideCosts
        : startDateOrHideCosts) as boolean
    );
  }

  async getGeoTargets(
    host: string,
    username: string,
    password: string,
    customerId: string,
    term: string,
    country: string
  ): Promise<IGeoTarget[]>;
  async getGeoTargets(
    auth: IAdBudRequestAuth,
    term: string,
    country: string
  ): Promise<IGeoTarget[]>;
  async getGeoTargets(
    hostOrAuth: string | IAdBudRequestAuth,
    usernameOrTerm: string,
    passwordOrCountry: string,
    customerId?: string,
    term?: string,
    country?: string
  ): Promise<IGeoTarget[]> {
    let authObject =
      typeof hostOrAuth === "string"
        ? {
            host: hostOrAuth,
            username: usernameOrTerm as string,
            password: passwordOrCountry as string,
            customerId: customerId as string,
          }
        : hostOrAuth;
    return await this._plugin.emitEventAndReturnTimed(
      "getGeoTargets",
      TIMEOUT_GET,
      authObject.host,
      authObject.username,
      authObject.password,
      authObject.customerId as string,
      (hostOrAuth === "string" ? term : usernameOrTerm) as string,
      (hostOrAuth === "string" ? country : passwordOrCountry) as string
    );
  }
}
