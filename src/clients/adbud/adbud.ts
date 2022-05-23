import { CPluginClient } from "@bettercorp/service-base/lib/interfaces/plugins";
import { ICustomerSuggestionData } from '../../plugins/adbud/ICustomerSuggestion';
import { IAdBudRequest, IAdBudRequestAuth, IAdBudRequestStats } from '../../plugins/adbud/IAdBudRequest';
import { ICustomerData, ICustomerUpdateData } from '../../plugins/adbud/ICustomer';
import { MyPluginConfig } from '../../plugins/adbud/sec.config';
import { ISearchTermDatum } from '../../plugins/adbud/ISearchTerm';
import { IDashboardData } from '../../plugins/adbud/IDashboard';
import { ISetTermData } from '../../plugins/adbud/ISetTerm';
import { IGeoTarget, IGeoTargetRequest } from '../../plugins/adbud/IGeoTarget';

export class adbud extends CPluginClient<MyPluginConfig> {
  public readonly _pluginName: string = "adbud";

  async getCustomer(config: IAdBudRequestAuth): Promise<ICustomerData> {
    return await this.emitEventAndReturn<IAdBudRequest<undefined>, ICustomerData>("get-customer", {
      auth: config,
      data: undefined
    }, 10000);
  }
  async setCustomer(config: IAdBudRequestAuth, data: ICustomerUpdateData): Promise<ICustomerData> {
    return await this.emitEventAndReturn<IAdBudRequest<ICustomerUpdateData>, ICustomerData>("set-customer", {
      auth: config,
      data: data
    }, 15000);
  }

  async getSuggestions(config: IAdBudRequestAuth): Promise<ICustomerSuggestionData> {
    return await this.emitEventAndReturn<IAdBudRequest<undefined>, ICustomerSuggestionData>("get-suggestions", {
      auth: config,
      data: undefined
    }, 10000);
  }

  async getSearchTerms(config: IAdBudRequestAuth): Promise<ISearchTermDatum[]> {
    return await this.emitEventAndReturn<IAdBudRequest<undefined>, ISearchTermDatum[]>("get-search-terms", {
      auth: config,
      data: undefined
    }, 10000);
  }

  async setSearchTerm(config: IAdBudRequestAuth, term: string, wanted: boolean): Promise<ISetTermData> {
    return await this.emitEventAndReturn<IAdBudRequest<{ term: string, wanted: boolean; }>, ISetTermData>("set-search-term", {
      auth: config,
      data: { term, wanted }
    }, 15000);
  }

  async getStats(config: IAdBudRequestAuth, query: IAdBudRequestStats): Promise<IDashboardData> {
    return await this.emitEventAndReturn<IAdBudRequest<IAdBudRequestStats>, IDashboardData>("get-stats", {
      auth: config,
      data: query
    }, 10000);
  }
  async geoTarget(config: IAdBudRequestAuth, term: string, country: string): Promise<Array<IGeoTarget>> {
    return await this.emitEventAndReturn<IAdBudRequest<IGeoTargetRequest>, Array<IGeoTarget>>("get-geo-target", {
      auth: config,
      data: { term, country }
    }, 10000);
  }
}