export interface ICustomerSuggestionData {
  _id: string;
  customer_id: string;
  suggestion_id: string;
  completed: boolean;
  completed_at: null;
  started_at: string;
  description: string;
  faq: any[];
}
