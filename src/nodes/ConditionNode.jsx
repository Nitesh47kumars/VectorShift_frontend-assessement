// src/nodes/ConditionNode.jsx
import { CreateNode } from './CreateNode';

export const ConditionNode = CreateNode({
  label: 'Condition',
  inputs: ['value'],
  outputs: ['true', 'false'],
  render: () => (
    <select className="border rounded px-2 py-1 text-sm bg-white">
      <option>Equals</option>
      <option>Greater Than</option>
      <option>Less Than</option>
    </select>
  ),
});
