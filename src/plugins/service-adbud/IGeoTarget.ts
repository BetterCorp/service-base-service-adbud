export interface IGeoTarget {
  id: number;
  name: string;
  parent_id: number;
  parent_ids: number[];
  text: string;
  type: string;
  reach: number;
  distance: number;
}

export interface IGeoTargetRequest {
  term: string,
  country: string;
}
