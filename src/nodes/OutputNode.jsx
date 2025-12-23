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
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Name:
          <input
            className="mt-1 px-2 py-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-sm font-medium text-gray-700">
          Type:
          <select
            className="mt-1 px-2 py-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
