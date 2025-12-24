// src/nodes/OutputNode.jsx
import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      label="Output"
      inputs={[{ id: `${id}-value` }]}
    >
      <div className="flex flex-col gap-2 mt-1">
      <label className="flex flex-col text-sm font-medium text-white/80">
        Name:
        <input
          className="
            mt-1 px-2 py-1
            rounded-md
            border border-gray-600
            bg-transparent
            text-white
            outline-none
            focus:outline-none
            focus:ring-0
          "
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>

      <label className="flex flex-col text-sm font-medium text-white/80">
        Type:
        <select
          className="
            mt-1 px-2 py-1
            rounded-md
            border border-gray-600
            bg-transparent
            text-white
            outline-none
            focus:outline-none
            focus:ring-0
          "
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option className="bg-[#0b1220]" value="Text">Text</option>
          <option className="bg-[#0b1220]" value="File">Image</option>
        </select>
      </label>

      </div>
    </BaseNode>
  );
};
