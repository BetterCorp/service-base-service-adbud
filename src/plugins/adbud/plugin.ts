import { CPlugin } from "@bettercorp/service-base/lib/interfaces/plugins";
import { MyPluginConfig } from './sec.config';
import { Tools } from '@bettercorp/tools/lib/Tools';
import { adbud } from './adbud';
import { IAdBudRequest, IAdBudRequestStats } from './IAdBudRequest';
import { ICustomerData, ICustomerUpdateData } from './ICustomer';
import { ICustomerSuggestionData } from './ICustomerSuggestion';
import { ISearchTermDatum } from './ISearchTerm';
import { IDashboardData } from './IDashboard';
import { ISetTermData } from './ISetTerm';
import { IGeoTarget, IGeoTargetRequest } from './IGeoTarget';

export class Plugin extends CPlugin<MyPluginConfig> {
  async init(): Promise<void> {
    await this.onReturnableEvent<IAdBudRequest<undefined>, ICustomerData>(null, "get-customer", async (data?) => {
      if (Tools.isNullOrUndefined(data)) throw 'Undefined Data!';
      const adbudClient = new adbud(data!.auth.host, data!.auth.username, data!.auth.password, data!.auth.customerId);
      await adbudClient.login();
      return await adbudClient.getCustomer();
    });
    await this.onReturnableEvent<IAdBudRequest<ICustomerUpdateData>, ICustomerData>(null, "set-customer", async (data?) => {
      if (Tools.isNullOrUndefined(data)) throw 'Undefined Data!';
      const adbudClient = new adbud(data!.auth.host, data!.auth.username, data!.auth.password, data!.auth.customerId);
      await adbudClient.login();
      return await adbudClient.setCustomer(data!.data);
    });

    await this.onReturnableEvent<IAdBudRequest<undefined>, ICustomerSuggestionData>(null, "get-suggestions", async (data?) => {
      if (Tools.isNullOrUndefined(data)) throw 'Undefined Data!';
      const adbudClient = new adbud(data!.auth.host, data!.auth.username, data!.auth.password, data!.auth.customerId);
      await adbudClient.login();
      return await adbudClient.getSuggestions();
    });

    await this.onReturnableEvent<IAdBudRequest<undefined>, ISearchTermDatum[]>(null, "get-search-terms", async (data?) => {
      if (Tools.isNullOrUndefined(data)) throw 'Undefined Data!';
      const adbudClient = new adbud(data!.auth.host, data!.auth.username, data!.auth.password, data!.auth.customerId);
      await adbudClient.login();
      return await adbudClient.getSearchTerms();
    });

    await this.onReturnableEvent<IAdBudRequest<{ term: string, wanted: boolean; }>, ISetTermData>(null, "set-search-term", async (data?) => {
      if (Tools.isNullOrUndefined(data)) throw 'Undefined Data!';
      const adbudClient = new adbud(data!.auth.host, data!.auth.username, data!.auth.password, data!.auth.customerId);
      await adbudClient.login();
      return await adbudClient.setSearchTerm(data!.data.term, data!.data.wanted);
    });

    await this.onReturnableEvent<IAdBudRequest<IAdBudRequestStats>, IDashboardData>(null, "get-stats", async (data?) => {
      if (Tools.isNullOrUndefined(data)) throw 'Undefined Data!';
      const adbudClient = new adbud(data!.auth.host, data!.auth.username, data!.auth.password, data!.auth.customerId);
      await adbudClient.login();
      return await adbudClient.getStats(data!.data.startDate, data!.data.endDate, data!.data.selectors, data!.data.hideCosts);
    });

    await this.onReturnableEvent<IAdBudRequest<IGeoTargetRequest>, Array<IGeoTarget>>(null, "get-geo-target", async (data?) => {
      if (Tools.isNullOrUndefined(data)) throw 'Undefined Data!';
      const adbudClient = new adbud(data!.auth.host, data!.auth.username, data!.auth.password, data!.auth.customerId);
      await adbudClient.login();
      return await adbudClient.geoTarget(data!.data.term, data!.data.country);
    });
  }
}
