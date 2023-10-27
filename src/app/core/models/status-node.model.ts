export interface StatusNode {
  typology_node_id: string;
  id: string;
  order: number;
  planned: boolean;
}

export enum StatusNodeType {
  FinalOkNode = 'final_ok_node',
  MiddleNode = 'middle_node',
}
