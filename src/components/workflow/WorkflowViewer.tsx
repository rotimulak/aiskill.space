"use client";

import { useEffect, useState, useCallback } from "react";
import yaml from "js-yaml";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Workflow } from "@/lib/workflow-types";
import CustomNode, { CustomNodeData } from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

export function WorkflowViewer() {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<CustomNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    async function loadWorkflow() {
      try {
        const response = await fetch("/track.yaml");
        if (!response.ok) {
          throw new Error("Failed to load workflow file");
        }
        const yamlText = await response.text();
        const data = yaml.load(yamlText) as Workflow;
        setWorkflow(data);

        // Convert workflow nodes to ReactFlow nodes
        const flowNodes: Node<CustomNodeData>[] = data.nodes.map((node, index) => ({
          id: `node-${index}`,
          type: 'custom',
          position: { x: index * 500, y: 250 },
          data: {
            name: node.name,
            prompt: node.prompt,
            echo: node.echo,
            index,
          },
        }));

        // Create edges connecting sequential nodes
        const flowEdges: Edge[] = [];
        for (let i = 0; i < data.nodes.length - 1; i++) {
          flowEdges.push({
            id: `edge-${i}`,
            source: `node-${i}`,
            target: `node-${i + 1}`,
            animated: true,
            style: { stroke: '#888', strokeWidth: 2 },
          });
        }

        setNodes(flowNodes);
        setEdges(flowEdges);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadWorkflow();
  }, [setNodes, setEdges]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-muted-foreground">Loading workflow...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-destructive">Error: {error}</div>
      </div>
    );
  }

  if (!workflow || !workflow.nodes) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-muted-foreground">No workflow data found</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <MiniMap
          className="!bg-background/80 !border-border"
          nodeColor="#888"
        />
      </ReactFlow>
    </div>
  );
}
