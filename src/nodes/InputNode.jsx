// src/nodes/InputNode.jsx
import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      label="Input"
      outputs={[{ id: `${id}-value` }]}
      width={220} // slightly wider for better input space
      height={100} // taller to fit inputs comfortably
    >
      <div className="flex flex-col gap-2 mt-2">
        {/* Name input */}
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Name:
          <input
            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="Enter input name"
          />
        </label>

        {/* Type selector */}
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Type:
          <select
            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
