export interface StatusNode {
  typology_node_id: string;
  id: string;
  order: number;
  planned: boolean;
}

export enum StatusNodeType {
  FinalOkNode = 'final_ok_node',
  FinalNotOkNode = 'final_not_ok_node',
  MiddleNode = 'middle_node',
  InitialNode = 'initial_node',
}

export const statusNodeImage: { [key in StatusNodeType]: string } = {
  [StatusNodeType.FinalOkNode]: 'assets/images/nodes/final_ok_node.png',
  [StatusNodeType.FinalNotOkNode]: 'assets/images/nodes/final_not_ok_node.png',
  [StatusNodeType.MiddleNode]: 'assets/images/nodes/middle_node.png',
  [StatusNodeType.InitialNode]: 'assets/images/nodes/initial_node.png',
};
