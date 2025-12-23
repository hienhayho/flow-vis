export interface FlowNode {
  node_name: string;
  input: string;
  output: string;
  time: number;
  reason: string;
}

export interface ConversationTurn {
  user: string;
  asssistant: string; // Keep the typo from the original JSON
  flow: FlowNode[];
}

export type ConversationData = ConversationTurn[];
