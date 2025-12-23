// src/nodes/NewNode.jsx
import { useState } from 'react';
import BaseNode from './BaseNode';

const NewNode = ({ id, data }) => {
  const [text, setText] = useState(data.config?.text || '');

  const inputs = [{id:`${id}-value`}];
  const outputs =  [{id:`${id}-value`}];

  // 🔁 persist changes into ReactFlow node data
  data.config = {
    ...data.config,
    text,
  };

  return (
    <BaseNode
      id={id}
      label={data.label || 'Custom Node'}
      inputs={inputs}
      outputs={outputs}
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">
          User Instruction
        </label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write instruction here..."
          className="
            w-full
            min-h-18
            resize-none
            rounded-md
            border border-gray-300
            px-2 py-1
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>
    </BaseNode>
  );
};

export default NewNode;
