import { CPluginClient } from "@bettercorp/service-base/lib/interfaces/plugins";
import { ICustomerSuggestionData } from '../../plugins/adbud/ICustomerSuggestion';
import { IAdBudRequest, IAdBudRequestAuth, IAdBudRequestStats } from '../../plugins/adbud/IAdBudRequest';
import { ICustomerData } from '../../plugins/adbud/ICustomer';
import { MyPluginConfig } from '../../plugins/adbud/sec.config';
import { ISearchTermDatum } from '../../plugins/adbud/ISearchTerm';
import { IDashboardData } from '../../plugins/adbud/IDashboard';

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

  async getStats(config: IAdBudRequestAuth, query: IAdBudRequestStats): Promise<IDashboardData> {
    return await this.emitEventAndReturn<IAdBudRequest<IAdBudRequestStats>, IDashboardData>("get-stats", {
      auth: config,
      data: query
    });
  }
}