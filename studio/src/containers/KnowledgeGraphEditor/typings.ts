export type GraphEdge = {
  source_name: string;
  source_id: string;
  source_type: string;
  target_name: string;
  target_id: string;
  target_type: string;
  key_sentence: string;
  relation_type: string;
  relation_id?: string;
  curator?: string;
  created_at?: number;
}

export type OptionType = {
  order: number;
  label: string;
  value: string
}
