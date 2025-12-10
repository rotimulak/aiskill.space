# Workflow Section Implementation Guide

Руководство по интеграции интерактивной визуализации workflow на базе React Flow в Next.js проект с shadcn/ui.

## Обзор

Секция отображает интерактивную карту workflow из YAML-файла с возможностью:
- Панорамирования и масштабирования
- Мини-карты для навигации
- Анимированных связей между узлами
- Кастомных узлов на базе shadcn Card

## Требования

- Next.js 15+ с App Router
- React 19+
- Tailwind CSS 4+
- shadcn/ui (компонент Card)

## Установка зависимостей

```bash
npm install @xyflow/react js-yaml
npm install -D @types/js-yaml
```

## Конфигурация shadcn

### components.json

Добавить AI SDK registry (опционально, для будущих AI-компонентов):

```json
{
  "registries": {
    "@ai-elements": "https://registry.ai-sdk.dev/{name}.json"
  }
}
```

Полный пример `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@ai-elements": "https://registry.ai-sdk.dev/{name}.json"
  }
}
```

### Установка Card компонента

```bash
npx shadcn@latest add card
```

## Структура файлов

```
src/
├── lib/
│   └── workflow-types.ts      # TypeScript типы
├── components/
│   ├── workflow/
│   │   ├── CustomNode.tsx     # Кастомный узел ReactFlow
│   │   └── WorkflowViewer.tsx # Основной компонент визуализации
│   └── sections/
│       └── workflow-section.tsx # Секция для лендинга
public/
└── track.yaml                  # Файл workflow
```

## Реализация

### 1. Типы (src/lib/workflow-types.ts)

```typescript
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
```

### 2. Кастомный узел (src/components/workflow/CustomNode.tsx)

```tsx
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
```

**Кастомизации узла:**
- `min-w-[300px] max-w-[400px]` - ограничение ширины
- `bg-card/95 backdrop-blur-sm` - полупрозрачный фон с блюром
- `border-border/50` - приглушённая граница
- Номер узла в круглом бейдже (`bg-primary`)
- Секция prompt с прокруткой (`max-h-[120px] overflow-y-auto`)

### 3. Визуализатор (src/components/workflow/WorkflowViewer.tsx)

```tsx
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
```

**Ключевые настройки ReactFlow:**
- `connectionMode={ConnectionMode.Loose}` - свободное соединение узлов
- `fitView` + `fitViewOptions={{ padding: 0.2 }}` - автоматическое масштабирование
- `proOptions={{ hideAttribution: true }}` - скрытие водяного знака
- Позиционирование узлов: `x: index * 500, y: 250` (горизонтальная раскладка)

**Стилизация MiniMap:**
- `!bg-background/80` - полупрозрачный фон
- `!border-border` - граница в цвете темы

### 4. Секция лендинга (src/components/sections/workflow-section.tsx)

```tsx
"use client";

import dynamic from "next/dynamic";

const WorkflowViewer = dynamic(
  () => import("@/components/workflow/WorkflowViewer").then((mod) => mod.WorkflowViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-lg text-muted-foreground">Loading workflow...</div>
      </div>
    ),
  }
);

export function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-8 text-center md:mb-12">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            Workflow Visualization
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Interactive visualization of AI-powered workflow pipelines.
            Explore how tasks are orchestrated and executed in sequence.
          </p>
        </div>

        {/* Workflow viewer container */}
        <div className="animate-fade-in-up rounded-xl border bg-card/50 shadow-lg overflow-hidden">
          <div className="h-[600px] w-full">
            <WorkflowViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Важно:** Используется `dynamic` import с `ssr: false`, так как ReactFlow использует браузерные API и не может рендериться на сервере.

### 5. Пример YAML (public/track.yaml)

```yaml
output_format: markdown

variables:
  project_description: "AI-powered task automation system"
  search_query: ""

nodes:
  - name: formulate_query
    type: genText
    echo: "Formulating search query..."
    prompt: |
      На основе описания проекта сформулируй поисковый запрос.
      Описание: {{project_description}}
    model: "gpt-4o-mini"
    save_to_variable: "search_query"

  - name: web_search
    type: genText
    echo: "Searching the web..."
    prompt: |
      Найди информацию по запросу: {{search_query}}
    web_search: true

  - name: save_results
    type: placeholder
    echo: "Saving results..."
    template_content: |
      # Results
      {{search_results}}
    save_to_track: "result/output.md"
```

## Интеграция в проект

### 1. Экспорт секции

В `src/components/sections/index.ts`:

```typescript
export { WorkflowSection } from "./workflow-section";
```

### 2. Использование на странице

```tsx
import { WorkflowSection } from "@/components/sections";

export default function Home() {
  return (
    <main>
      {/* ... другие секции ... */}
      <WorkflowSection />
      {/* ... другие секции ... */}
    </main>
  );
}
```

## Кастомизация

### Изменение раскладки узлов

В `WorkflowViewer.tsx`, функция `loadWorkflow`:

```typescript
// Горизонтальная раскладка (по умолчанию)
position: { x: index * 500, y: 250 }

// Вертикальная раскладка
position: { x: 250, y: index * 300 }

// Сетка 3 колонки
position: {
  x: (index % 3) * 450,
  y: Math.floor(index / 3) * 300
}
```

### Изменение стиля связей

```typescript
flowEdges.push({
  id: `edge-${i}`,
  source: `node-${i}`,
  target: `node-${i + 1}`,
  animated: true,                    // Анимация
  style: {
    stroke: '#888',                  // Цвет
    strokeWidth: 2                   // Толщина
  },
  type: 'smoothstep',               // Тип: default, straight, step, smoothstep
  markerEnd: { type: 'arrowclosed' } // Стрелка на конце
});
```

### Изменение высоты секции

В `workflow-section.tsx`:

```tsx
<div className="h-[600px] w-full">  {/* Высота контейнера */}
```

### Темизация ReactFlow

Добавить в `globals.css`:

```css
.react-flow__background {
  background-color: var(--background);
}

.react-flow__controls button {
  background-color: var(--card);
  border-color: var(--border);
}

.react-flow__controls button:hover {
  background-color: var(--accent);
}
```

## Возможные проблемы

### 1. Ошибка SSR

**Проблема:** `ReferenceError: window is not defined`

**Решение:** Использовать dynamic import с `ssr: false`

### 2. TypeScript ошибки с NodeProps

**Проблема:** `Type 'CustomNodeData' does not satisfy the constraint...`

**Решение:** Использовать собственный интерфейс вместо `NodeProps<T>`:

```typescript
interface CustomNodeProps {
  data: CustomNodeData;
}
```

### 3. Конфликт с другими проектами в монорепо

**Проблема:** TypeScript компилирует файлы из вложенных проектов

**Решение:** Добавить в `tsconfig.json`:

```json
{
  "exclude": [
    "node_modules",
    "other-project-folder"
  ]
}
```

## Ссылки

- [React Flow Documentation](https://reactflow.dev/docs)
- [shadcn/ui Card](https://ui.shadcn.com/docs/components/card)
- [AI SDK Registry](https://sdk.vercel.ai/docs)
- [js-yaml](https://github.com/nodeca/js-yaml)
