export enum IDashboardSelector {
  account_daily = "account_daily",
  account = "account",
  ads = "ads",
  campaigns = "campaigns",
  calls = "calls",
  keywords = "keywords",
}

export interface IDashboardData {
  account: IDashboardAccount;
  account_daily: IDashboardAccount[];
  ads: IDashboardAd[];
  calls: IDashboardCall[];
  campaigns: IDashboardAccount[];
  keywords: IDashboardKeyword[];
  hide_costs: boolean;
}

export interface IDashboardAccount {
  impressions: number;
  clicks: number;
  cost: number;
  conversions?: number;
  conversions_calls?: number;
  customer_id?: string;
  cpc: number;
  ctr: number;
  impression_share: number;
  date?: string;
  campaign_name?: string;
}

export interface IDashboardAd {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ad_type: IDashboardAdType;
  headline1: string;
  headline2: string;
  ad_description: string;
  "headline2,description": IDashboardHeadline2Description;
  cpc: number;
  ctr: number;
}

export enum IDashboardAdType {
  ExpandedDynamicSearchAd = "EXPANDED_DYNAMIC_SEARCH_AD",
  ExpandedTextAd = "EXPANDED_TEXT_AD"
}

export interface IDashboardHeadline2Description {
  headline2: string;
  description: string;
}

export interface IDashboardCall {
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  duration: string;
  display_location: string;
  call_status: string;
  call_type: string;
}

export interface IDashboardKeyword {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  first_position_cpc: number;
  first_page_cpc: number;
  quality_score: number;
  keyword_original: string;
  cpc: number;
  ctr: number;
  impression_share: number;
}
