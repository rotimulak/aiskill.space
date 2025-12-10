"use client";

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type CustomNodeData = {
  name: string;
  prompt?: string;
  echo?: string;
  index: number;
};

interface CustomNodeProps {
  data: CustomNodeData;
}

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className="min-w-[300px] max-w-[400px]">
      <Handle type="target" position={Position.Left} />

      <Card className="shadow-lg border-border/50 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {data.index + 1}
            </span>
            <span className="truncate">{data.name}</span>
          </CardTitle>
          {data.echo && (
            <CardDescription className="text-xs">{data.echo}</CardDescription>
          )}
        </CardHeader>
        {data.prompt && (
          <CardContent className="pt-0">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-muted-foreground">Prompt:</h4>
              <div className="bg-muted p-2 rounded text-xs max-h-[120px] overflow-y-auto">
                <pre className="whitespace-pre-wrap break-words font-mono text-[10px]">
                  {data.prompt.trim()}
                </pre>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(CustomNode);
