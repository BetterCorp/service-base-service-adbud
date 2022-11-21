import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Tools } from "@bettercorp/tools/lib/Tools";
import { ILoginResponse } from "./ILoginResponse";
import { ICustomerData, ICustomerUpdateData } from "./ICustomer";
import { ICustomerSuggestionData } from "./ICustomerSuggestion";
import { IDashboardData, IDashboardSelector } from "./IDashboard";
import { ISearchTermDatum, ISearchTerm } from "./ISearchTerm";
import { ISetTermData } from "./ISetTerm";
import { IGeoTarget } from "./IGeoTarget";
import { IAdbudAxiosResponse, IAdbudResponseStatus } from "./IAdbud";

export class adbud {
  private username: string;
  private password: string;
  private customerId?: string;
  private axios: AxiosInstance;

  constructor(
    host: string,
    username: string,
    password: string,
    customerId?: string
  ) {
    this.username = username;
    this.password = password;
    this.customerId = customerId;
    this.axios = axios.create({
      withCredentials: true,
      baseURL: host,
    });
  }

  async login(): Promise<void> {
    let loginResp = await this.axios.post<any, AxiosResponse<ILoginResponse>>(
      "/login",
      {
        email: this.username,
        password: this.password,
        _locale: "",
        redirect: "",
      }
    );

    if (loginResp.status !== 200) throw `Login Failed: ${loginResp.status}`;
    if (loginResp.data.status !== IAdbudResponseStatus.success)
      throw `Login Failed[]: ${loginResp.data.status}`;

    (this.axios.defaults.headers as any)["Cookie"] = (loginResp as any).headers[
      "set-cookie"
    ][0];
    if (Tools.isNullOrUndefined(this.customerId)) {
      let customHtml = await this.axios({
        url: loginResp.data.data.url,
        method: "GET",
      });
      this.customerId = `${customHtml.data}`
        .split('"customer_id":"')[1]
        .split('"')[0]
        .trim();
    }
  }

  async getCustomer(): Promise<ICustomerData> {
    let customerResp = await this.axios.get<
      any,
      IAdbudAxiosResponse<ICustomerData>
    >(`/customer/${this.customerId}`);
    if (customerResp.status !== 200)
      throw `Customer GET Failed: ${customerResp.status}`;
    if (customerResp.data.status !== IAdbudResponseStatus.success)
      throw `Customer GET Failed[]: ${customerResp.data.status}`;
    return customerResp.data.data;
  }

  async setCustomer(data: ICustomerUpdateData): Promise<ICustomerData> {
    let newDataToSend: ICustomerData = {
      google_ads: {
        settings: {},
      },
    } as any;
    if (data.ads !== undefined)
      newDataToSend.google_ads.settings.ads = data.ads;
    if (data.address !== undefined) newDataToSend.address = data.address;
    if (data.name !== undefined) newDataToSend.name = data.name;
    if (data.display_name !== undefined)
      newDataToSend.google_ads.settings.display_name = data.display_name;
    if (data.call_extension !== undefined)
      newDataToSend.google_ads.settings.call_extension = data.call_extension;
    if (data.competitors !== undefined)
      newDataToSend.google_ads.settings.competitors = data.competitors;
    if (data.dynamic_content !== undefined)
      newDataToSend.google_ads.settings.dynamic_content = data.dynamic_content;
    if (data.geotarget_ids !== undefined)
      newDataToSend.google_ads.settings.geotarget_ids = data.geotarget_ids;
    if (data.geotarget_proximities !== undefined)
      newDataToSend.google_ads.settings.geotarget_proximities =
        data.geotarget_proximities;
    if (data.language !== undefined)
      newDataToSend.google_ads.settings.language = data.language;
    if (data.negative_keywords !== undefined)
      newDataToSend.google_ads.settings.negative_keywords =
        data.negative_keywords;
    if (data.site_links !== undefined)
      newDataToSend.google_ads.settings.site_links = data.site_links;
    if (data.targeting_accuracy !== undefined)
      newDataToSend.google_ads.settings.targeting_accuracy =
        data.targeting_accuracy;
    if (data.url !== undefined) newDataToSend.url = data.url;
    if (data.geotargeting_accuracy !== undefined)
      newDataToSend.google_ads.settings.geotargeting_accuracy =
        data.geotargeting_accuracy;
    if (data.country_geo !== undefined)
      newDataToSend.country_geo = data.country_geo;
    if (data.geotargets !== undefined)
      newDataToSend.google_ads.settings.geotargets = data.geotargets;

    let customerResp = await this.axios.patch<
      any,
      IAdbudAxiosResponse<ICustomerData>,
      ICustomerData
    >(`/customer/${this.customerId}`, newDataToSend);
    if (customerResp.status !== 200)
      throw `Customer SET Failed: ${customerResp.status}`;
    if (customerResp.data.status !== IAdbudResponseStatus.success)
      throw `Customer SET Failed[]: ${customerResp.data.message}`;

    // validate changes
    if (data.ads !== undefined) {
      if (
        customerResp.data.data.google_ads.settings.ads.length !==
        newDataToSend.google_ads.settings.ads.length
      )
        throw "ADS NOT UPDATED";
      for (
        let adIndex = 0;
        adIndex < customerResp.data.data.google_ads.settings.ads.length;
        adIndex++
      ) {
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex].active !==
          newDataToSend.google_ads.settings.ads[adIndex].active
        )
          throw `ADS NOT UPDATED [${adIndex}]: active`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex]
            .description1 !==
          newDataToSend.google_ads.settings.ads[adIndex].description1
        )
          throw `ADS NOT UPDATED [${adIndex}]: description1`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex]
            .description2 !==
          newDataToSend.google_ads.settings.ads[adIndex].description2
        )
          throw `ADS NOT UPDATED [${adIndex}]: description2`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex].headline1 !==
          newDataToSend.google_ads.settings.ads[adIndex].headline1
        )
          throw `ADS NOT UPDATED [${adIndex}]: headline1`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex].headline2 !==
          newDataToSend.google_ads.settings.ads[adIndex].headline2
        )
          throw `ADS NOT UPDATED [${adIndex}]: headline2`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex].headline3 !==
          newDataToSend.google_ads.settings.ads[adIndex].headline3
        )
          throw `ADS NOT UPDATED [${adIndex}]: headline3`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex].name !==
          newDataToSend.google_ads.settings.ads[adIndex].name
        )
          throw `ADS NOT UPDATED [${adIndex}]: name`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex].url !==
          newDataToSend.google_ads.settings.ads[adIndex].url
        )
          throw `ADS NOT UPDATED [${adIndex}]: url`;
        if (
          customerResp.data.data.google_ads.settings.ads[adIndex].keywords
            .length !==
          newDataToSend.google_ads.settings.ads[adIndex].keywords.length
        )
          throw `ADS NOT UPDATED [${adIndex}]: keywords length`;
        for (let adKeyword of newDataToSend.google_ads.settings.ads[adIndex]
          .keywords) {
          if (
            customerResp.data.data.google_ads.settings.ads[
              adIndex
            ].keywords.indexOf(adKeyword) < 0
          )
            throw `ADS NOT UPDATED [${adIndex}]: keywords [${adKeyword}]`;
        }
      }
    }
    if (data.address !== undefined) {
      if (
        newDataToSend.address.address !== customerResp.data.data.address.address
      )
        throw "ADS NOT UPDATED: address address";
      if (newDataToSend.address.city !== customerResp.data.data.address.city)
        throw "ADS NOT UPDATED: address city";
      if (
        newDataToSend.address.country !== customerResp.data.data.address.country
      )
        throw "ADS NOT UPDATED: address country";
      if (
        newDataToSend.address.postcode !==
        customerResp.data.data.address.postcode
      )
        throw "ADS NOT UPDATED: address postcode";
      if (newDataToSend.address.state !== customerResp.data.data.address.state)
        throw "ADS NOT UPDATED: address state";
    }
    if (data.name !== undefined) {
      if (newDataToSend.name !== customerResp.data.data.name)
        throw "ADS NOT UPDATED: name";
    }
    if (data.display_name !== undefined) {
      if (
        newDataToSend.google_ads.settings.display_name !==
        customerResp.data.data.google_ads.settings.display_name
      )
        throw "ADS NOT UPDATED: display_name";
    }
    if (data.call_extension !== undefined) {
      if (
        newDataToSend.google_ads.settings.call_extension.country !==
        customerResp.data.data.google_ads.settings.call_extension.country
      )
        throw "ADS NOT UPDATED: call_extension country";
      if (
        newDataToSend.google_ads.settings.call_extension.number !==
        customerResp.data.data.google_ads.settings.call_extension.number
      )
        throw "ADS NOT UPDATED: call_extension number";
    }
    if (data.competitors !== undefined) {
      if (
        newDataToSend.google_ads.settings.competitors.length !==
        customerResp.data.data.google_ads.settings.competitors.length
      )
        throw "ADS NOT UPDATED: competitors length";
      for (let competitorName of newDataToSend.google_ads.settings
        .competitors) {
        if (
          customerResp.data.data.google_ads.settings.competitors.indexOf(
            competitorName
          ) < 0
        )
          throw `ADS NOT UPDATED competitors [${competitorName}]`;
      }
    }
    if (data.dynamic_content !== undefined) {
      if (
        newDataToSend.google_ads.settings.dynamic_content !==
        customerResp.data.data.google_ads.settings.dynamic_content
      )
        throw "ADS NOT UPDATED: dynamic_content";
    }
    if (data.geotarget_ids !== undefined) {
      if (
        newDataToSend.google_ads.settings.geotarget_ids.length !==
        customerResp.data.data.google_ads.settings.geotarget_ids.length
      )
        throw "ADS NOT UPDATED: geotarget_ids length";
      for (let geoTargetId of newDataToSend.google_ads.settings.geotarget_ids) {
        if (
          customerResp.data.data.google_ads.settings.geotarget_ids.indexOf(
            geoTargetId
          ) < 0
        )
          throw `ADS NOT UPDATED geotarget_ids [${geoTargetId}]`;
      }
    }
    if (data.geotarget_proximities !== undefined) {
      if (
        newDataToSend.google_ads.settings.geotarget_proximities.length !==
        customerResp.data.data.google_ads.settings.geotarget_proximities.length
      )
        throw "ADS NOT UPDATED: geotarget_proximities length";
      for (
        let geoProxIndex = 0;
        geoProxIndex <
        customerResp.data.data.google_ads.settings.geotarget_proximities.length;
        geoProxIndex++
      ) {
        if (
          customerResp.data.data.google_ads.settings.geotarget_proximities[
            geoProxIndex
          ].lat !==
          newDataToSend.google_ads.settings.geotarget_proximities[geoProxIndex]
            .lat
        )
          throw `ADS NOT UPDATED geotarget_proximities [${geoProxIndex}] lat`;
        if (
          customerResp.data.data.google_ads.settings.geotarget_proximities[
            geoProxIndex
          ].lng !==
          newDataToSend.google_ads.settings.geotarget_proximities[geoProxIndex]
            .lng
        )
          throw `ADS NOT UPDATED geotarget_proximities [${geoProxIndex}] lng`;
        if (
          customerResp.data.data.google_ads.settings.geotarget_proximities[
            geoProxIndex
          ].radius !==
          newDataToSend.google_ads.settings.geotarget_proximities[geoProxIndex]
            .radius
        )
          throw `ADS NOT UPDATED geotarget_proximities [${geoProxIndex}] radius`;
      }
    }
    if (data.language !== undefined) {
      if (
        newDataToSend.google_ads.settings.language !==
        customerResp.data.data.google_ads.settings.language
      )
        throw "ADS NOT UPDATED: language";
    }
    if (data.negative_keywords !== undefined) {
      if (
        newDataToSend.google_ads.settings.negative_keywords.length !==
        customerResp.data.data.google_ads.settings.negative_keywords.length
      )
        throw "ADS NOT UPDATED: negative_keywords length";
      for (let negKeyword of newDataToSend.google_ads.settings
        .negative_keywords) {
        if (
          customerResp.data.data.google_ads.settings.negative_keywords.indexOf(
            negKeyword
          ) < 0
        )
          throw `ADS NOT UPDATED negative_keywords [${negKeyword}]`;
      }
    }

    if (data.site_links !== undefined) {
      if (
        newDataToSend.google_ads.settings.site_links.length !==
        customerResp.data.data.google_ads.settings.site_links.length
      )
        throw "ADS NOT UPDATED: site_links length";
      for (
        let siteLinkIndex = 0;
        siteLinkIndex <
        customerResp.data.data.google_ads.settings.site_links.length;
        siteLinkIndex++
      ) {
        if (
          customerResp.data.data.google_ads.settings.site_links[siteLinkIndex]
            .title !==
          newDataToSend.google_ads.settings.site_links[siteLinkIndex].title
        )
          throw `ADS NOT UPDATED site_links [${siteLinkIndex}] title`;
        if (
          customerResp.data.data.google_ads.settings.site_links[siteLinkIndex]
            .url !==
          newDataToSend.google_ads.settings.site_links[siteLinkIndex].url
        )
          throw `ADS NOT UPDATED site_links [${siteLinkIndex}] url`;
      }
    }
    if (data.targeting_accuracy !== undefined) {
      if (
        newDataToSend.google_ads.settings.targeting_accuracy !==
        customerResp.data.data.google_ads.settings.targeting_accuracy
      )
        throw "ADS NOT UPDATED: targeting_accuracy";
    }
    if (data.url !== undefined) {
      if (newDataToSend.url !== customerResp.data.data.url)
        throw "ADS NOT UPDATED: url";
    }
    if (data.geotargeting_accuracy !== undefined) {
      if (
        newDataToSend.google_ads.settings.geotargeting_accuracy !==
        customerResp.data.data.google_ads.settings.geotargeting_accuracy
      )
        throw "ADS NOT UPDATED: geotargeting_accuracy";
    }
    if (data.country_geo !== undefined) {
      if (
        newDataToSend.country_geo.lat !== customerResp.data.data.country_geo.lat
      )
        throw "ADS NOT UPDATED: country_geo lat";
      if (
        newDataToSend.country_geo.lng !== customerResp.data.data.country_geo.lng
      )
        throw "ADS NOT UPDATED: country_geo lng";
    }
    if (data.geotargets !== undefined) {
      if (
        newDataToSend.google_ads.settings.geotargets.length !==
        customerResp.data.data.google_ads.settings.geotargets.length
      )
        throw "ADS NOT UPDATED: geotargets length";
      for (
        let geoTargetIndex = 0;
        geoTargetIndex <
        customerResp.data.data.google_ads.settings.geotargets.length;
        geoTargetIndex++
      ) {
        if (
          customerResp.data.data.google_ads.settings.geotargets[geoTargetIndex]
            .id !==
          newDataToSend.google_ads.settings.geotargets[geoTargetIndex].id
        )
          throw `ADS NOT UPDATED geotargets [${geoTargetIndex}] id`;
      }
    }

    return customerResp.data.data;
  }

  async getSuggestions(): Promise<ICustomerSuggestionData> {
    let customerResp = await this.axios.get<
      any,
      IAdbudAxiosResponse<ICustomerSuggestionData>
    >(`/customer/${this.customerId}/suggestion`);
    if (customerResp.status !== 200)
      throw `Customer Suggest GET Failed: ${customerResp.status}`;
    if (customerResp.data.status !== IAdbudResponseStatus.success)
      throw `Customer Suggest GET Failed[]: ${customerResp.data.status}`;
    return customerResp.data.data;
  }

  async getStats(
    startDate: number,
    endDate: number,
    selectors: Array<IDashboardSelector>,
    hideCosts?: boolean
  ): Promise<IDashboardData> {
    let params: Array<string> = [];
    let start = new Date(startDate);
    let end = new Date(endDate);
    let sMonth = start.getMonth() + 1;
    params.push(
      `start=${start.getFullYear()}-${
        sMonth.toString().length === 1 ? "0" : ""
      }${sMonth}-${
        start.getDate().toString().length === 1 ? "0" : ""
      }${start.getDate()}`
    );
    let eMonth = end.getMonth() + 1;
    params.push(
      `end=${end.getFullYear()}-${
        eMonth.toString().length === 1 ? "0" : ""
      }${eMonth}-${
        end.getDate().toString().length === 1 ? "0" : ""
      }${end.getDate()}`
    );
    for (let select of selectors) {
      params.push(`selector%5B%5D=${select}`);
    }
    if (!Tools.isNullOrUndefined(hideCosts)) {
      params.push(`hideCosts=${hideCosts}`);
    }
    let customerResp = await this.axios.get<
      any,
      IAdbudAxiosResponse<IDashboardData>
    >(`/dashboard/${this.customerId}/stats?${params.join("&")}`);
    if (customerResp.status !== 200)
      throw `Customer Dashboard GET Failed: ${customerResp.status}`;
    if (customerResp.data.status !== IAdbudResponseStatus.success)
      throw `Customer Dashboard GET Failed[]: ${customerResp.data.status}`;
    return customerResp.data.data;
  }

  async getSearchTerms(): Promise<Array<ISearchTermDatum>> {
    let customerResp = await this.axios.get<any, AxiosResponse<ISearchTerm>>(
      `/customer/searchterm?custom_filters%5Bcategory%5D=none&custom_filters%5Bcustomer_id%5D=${this.customerId}&grid%5Browset%5D=50`
    );
    if (customerResp.status !== 200)
      throw `Customer Suggest GET Failed: ${customerResp.status}`;
    if (customerResp.data.status !== IAdbudResponseStatus.success)
      throw `Customer Suggest GET Failed[]: ${customerResp.data.status}`;
    return customerResp.data.data;
  }

  async setSearchTerm(term: string, wanted: boolean): Promise<ISetTermData> {
    let customerResp = await this.axios.post<
      any,
      IAdbudAxiosResponse<ISetTermData>
    >(`/customer/${this.customerId}/searchterm`, {
      term: term,
      category: wanted ? "wanted" : "unwanted",
    });
    if (customerResp.status !== 200)
      throw `Customer searchTerm SET Failed: ${customerResp.status}`;
    if (customerResp.data.status !== IAdbudResponseStatus.success)
      throw `Customer searchTerm SET Failed[]: ${customerResp.data.status}`;
    return customerResp.data.data;
  }

  async geoTarget(term: string, country: string): Promise<Array<IGeoTarget>> {
    let targetResponse = await this.axios.get(
      `/geotargets?country=${encodeURIComponent(
        country
      )}&term=${encodeURIComponent(term)}`
    );
    if (targetResponse.status !== 200)
      throw `Search geoTarget Failed: ${targetResponse.status}`;
    if (targetResponse.data.status !== IAdbudResponseStatus.success)
      throw `Search geoTarget Failed[]: ${targetResponse.data.status}`;
    return targetResponse.data.data.map((x: IGeoTarget) => {
      return {
        id: x.id,
        name: x.name,
        parent_id: x.parent_id,
        parent_ids: x.parent_ids,
        text: x.text,
        type: x.type,
        distance: x.distance,
        reach: typeof x.reach === "number" ? x.reach : Number.parseInt(x.reach),
      };
    });
  }
}
