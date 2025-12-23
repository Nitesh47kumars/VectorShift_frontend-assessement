// src/nodes/LoggerNode.jsx
import { CreateNode } from './CreateNode';

export const LoggerNode = CreateNode({
  label: 'Logger',
  inputs: ['input'],
  render: () => (
    <div className="text-xs text-gray-500">
      Logs incoming data
    </div>
  ),
});
