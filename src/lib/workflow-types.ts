export interface WorkflowNode {
  name: string;
  prompt?: string;
  type?: string;
  echo?: string;
  model?: string;
  web_search?: boolean;
  log?: {
    md?: boolean;
    stdout?: number;
  };
  save_to_variable?: string;
  template_content?: string;
  save_to_track?: string;
}

export interface Workflow {
  output_format?: string;
  variables?: Record<string, string>;
  nodes: WorkflowNode[];
}
