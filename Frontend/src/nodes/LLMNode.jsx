// src/nodes/LLMNode.jsx
import BaseNode from './BaseNode.jsx';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` }
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div className="text-sm text-white/70 mt-1">
        LLM Node: process input and generate output
      </div>
    </BaseNode>
  );
};
