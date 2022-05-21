export enum IAdbudTargetingAccuracy {
  high = "high",
  medium = "medium",
  low = "low",
}
export enum IAdbudGeoTargetingAccuracy {
  presence = "presence",
  presence_or_interest = "presence_or_interest"
}

export interface ICustomerUpdateData {
  address?: ICustomerDataAddress;
  name?: string;
  ads?: ICustomerDataAd[];
  call_extension?: ICustomerDataCallExtension;
  competitors?: string[];
  dynamic_content?: boolean;
  geotarget_ids?: number[];
  geotarget_proximities?: ICustomerDataGeotargetProximity[];
  language?: string;
  negative_keywords?: any[];
  site_links?: ICustomerDataSiteLink[];
  targeting_accuracy?: IAdbudTargetingAccuracy;
  url?: string;
  geotargeting_accuracy?: IAdbudGeoTargetingAccuracy;
  country_geo?: ICustomerDataCountryGeo;
  geotargets?: ICustomerDataGeotarget[];
}

export interface ICustomerData {
  _id: string;
  address: ICustomerDataAddress;
  ads: ICustomerDataAd[];
  balance: number;
  budget: number;
  end_date: null;
  call_extension: ICustomerDataCallExtension;
  can_manage: boolean;
  cancelled: boolean;
  cancelled_at: null;
  completed_intro: boolean;
  costs: number;
  costs_synced_at: string;
  competitors: string[];
  currency: string;
  data_assistant_agreement: boolean;
  display_name: string;
  dynamic_content: boolean;
  external_id: null;
  geotarget_ids: number[];
  geotarget_proximities: ICustomerDataGeotargetProximity[];
  google_ads: ICustomerDataGoogleAds;
  hash: string;
  hidden_features: any[];
  language: string;
  manager_id: string;
  manually_paused: boolean;
  max_cpc: number;
  name: string;
  negative_keywords: any[];
  org_number: null;
  payment_methods: any[];
  payment_providers: any[];
  pays: boolean;
  pays_vat: boolean;
  promotion: string;
  referrer: null;
  self_service: boolean;
  site_links: ICustomerDataSiteLink[];
  status: string;
  status_last_active_at: string;
  start_date: null;
  subscription: ICustomerDataSubscription;
  tags: any[];
  targeting_accuracy: IAdbudTargetingAccuracy;
  url: string;
  user_id: string;
  valid_payment: boolean;
  vat_number: null;
  whitelabel: ICustomerDataWhitelabel;
  created_at: string;
  budget_changed_at: string;
  updated_at: string;
  completed_setup: boolean;
  max_cost: number;
  setup_step: string;
  status_reason: string;
  stats: ICustomerDataStats;
  policy_violation: boolean;
  geotargeting_accuracy: IAdbudGeoTargetingAccuracy;
  hide_costs: string;
  fees: ICustomerDataDataFees;
  report_interval: null;
  country_geo: ICustomerDataCountryGeo;
  geotargets: ICustomerDataGeotarget[];
  max_cpc_override: boolean;
  plan: ICustomerDataPlan;
  user: ICustomerDataManager;
  manager: ICustomerDataManager;
  alerts: any[];
  total_costs: number;
}

export interface ICustomerDataAddress {
  address: string;
  city: string;
  country: string;
  postcode: string;
  state: string;
}

export interface ICustomerDataAd {
  active: boolean;
  description1: string;
  description2: string;
  headline1: string;
  headline2: string;
  keywords: string[];
  name: string;
  url: string;
}

export interface ICustomerDataCallExtension {
  country: string;
  number: string;
}

export interface ICustomerDataCountryGeo {
  lat: number;
  lng: number;
}

export interface ICustomerDataDataFees {
  admin_override: boolean;
  admin: number;
  startup_override: boolean;
  startup: number;
  subscription_override: boolean;
  subscription: number;
}

export interface ICustomerDataGeotargetProximity {
  lat: number;
  lng: number;
  radius: number;
}

export interface ICustomerDataGeotarget {
  id: number;
  name: string;
  parent_id: number;
  parent_ids: number[];
  text: string;
  type: string;
  reach: number;
}

export interface ICustomerDataGoogleAds {
  bidding_strategy: string;
  click_bidding_id: string;
  conversion_bidding_id: string;
  budget_account_id: string;
  budget_id: string;
  connected: boolean;
  conversion_tracking: boolean;
  conversion_id: string;
  conversion_label: string;
  call_conversion_id: string;
  call_conversion_label: string;
  customer_id: string;
  last_click_at: string;
  last_conversion_at: string;
  last_impression_at: string;
  started_at: ICustomerDataEdAt;
  status: string;
  status_changed_at: ICustomerDataEdAt;
  show_publishing_notice: boolean;
  publishing: boolean;
  budget_order_adjustments: number;
  budget_order_updated_at: ICustomerDataEdAt;
  last_published_at: ICustomerDataEdAt;
}

export interface ICustomerDataEdAt {
  $date: ICustomerDataDateClass;
}

export interface ICustomerDataDateClass {
  $numberLong: string;
}

export interface ICustomerDataManager {
  _id: string;
  email: string;
  deactivated: boolean;
  first_name: string;
  name: string;
  last_name: string;
  phone: null;
  mobile: null;
  external_id: null;
  avatar: string;
  language: null;
  manager?: boolean;
  updated_at: string;
  created_at: string;
  admin?: boolean;
  password_changed_at: string;
  last_login: string;
  presets?: ICustomerDataPresets;
}

export interface ICustomerDataPresets {
  "customer-grid-filter": ICustomerDataCustomerGridFilter;
}

export interface ICustomerDataCustomerGridFilter {
  manager_id: string;
  tags: any[];
  type: string;
}

export interface ICustomerDataPlan {
  _id: string;
  active: boolean;
  hidden: boolean;
  max_ads: number;
  max_keywords: number;
  fees: ICustomerDataPlanFees;
  updated_at: string;
  created_at: string;
  description: string;
  name: string;
}

export interface ICustomerDataPlanFees {
  ZAR: ICustomerDataZar;
}

export interface ICustomerDataZar {
  admin: number;
  default_budget: number;
  startup: number;
  subscription: number;
}

export interface ICustomerDataSiteLink {
  url: string;
  title: string;
}

export interface ICustomerDataStats {
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface ICustomerDataSubscription {
  selected_plan: string;
  active_plan: string;
  can_change: boolean;
  no_admin_fee_until: null;
  subscribed_until: null;
}

export interface ICustomerDataWhitelabel {
  enabled: boolean;
  logo_dark: null;
  logo_light: null;
  name: null;
}
