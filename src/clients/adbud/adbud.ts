import { CPluginClient } from "@bettercorp/service-base/lib/interfaces/plugins";
import { ICustomerSuggestionData } from '../../plugins/adbud/ICustomerSuggestion';
import { IAdBudRequest, IAdBudRequestAuth, IAdBudRequestStats } from '../../plugins/adbud/IAdBudRequest';
import { ICustomerData } from '../../plugins/adbud/ICustomer';
import { MyPluginConfig } from '../../plugins/adbud/sec.config';
import { ISearchTermDatum } from '../../plugins/adbud/ISearchTerm';
import { IDashboardData } from '../../plugins/adbud/IDashboard';
import { ISetTermData } from '../../plugins/adbud/ISetTerm';

export class adbud extends CPluginClient<MyPluginConfig> {
  public readonly _pluginName: string = "adbud";

  async getCustomer(config: IAdBudRequestAuth): Promise<ICustomerData> {
    return await this.emitEventAndReturn<IAdBudRequest<undefined>, ICustomerData>("get-customer", {
      auth: config,
      data: undefined
    });
  }

  async getSuggestions(config: IAdBudRequestAuth): Promise<ICustomerSuggestionData> {
    return await this.emitEventAndReturn<IAdBudRequest<undefined>, ICustomerSuggestionData>("get-suggestions", {
      auth: config,
      data: undefined
    });
  }

  async getSearchTerms(config: IAdBudRequestAuth): Promise<ISearchTermDatum[]> {
    return await this.emitEventAndReturn<IAdBudRequest<undefined>, ISearchTermDatum[]>("get-suggestions", {
      auth: config,
      data: undefined
    });
  }

  async setSearchTerm(config: IAdBudRequestAuth, term: string, wanted: boolean): Promise<ISetTermData> {
    return await this.emitEventAndReturn<IAdBudRequest<{ term: string, wanted: boolean; }>, ISetTermData>("get-suggestions", {
      auth: config,
      data: { term, wanted }
    });
  }

  async getStats(config: IAdBudRequestAuth, query: IAdBudRequestStats): Promise<IDashboardData> {
    return await this.emitEventAndReturn<IAdBudRequest<IAdBudRequestStats>, IDashboardData>("set-search-term", {
      auth: config,
      data: query
    });
  }
}