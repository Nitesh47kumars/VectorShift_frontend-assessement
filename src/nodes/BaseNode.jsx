// src/nodes/BaseNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({
  id,
  label,
  inputs = [],
  outputs = [],
  width = 200,
  height = 80,
  children,
}) => {
  return (
    <div
      className="bg-white border border-gray-400 rounded shadow p-2"
      style={{ width, height }}
    >
      {/* Node Title */}
      <div className="font-bold mb-1">{label}</div>

      {/* Custom content passed from wrapper */}
      {children}

      {/* Input Handles */}
      {inputs.map((input, idx) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ top: 20 + idx * 20 }}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, idx) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: 20 + idx * 20 }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
