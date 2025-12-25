import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(
    data?.inputType || 'Text'
  );
  const [inputValue, setInputValue] = useState(
    data?.inputValue || ''
  );

  return (
    <BaseNode
      id={id}
      label="Input"
      outputs={[{ id: `${id}-value` }]}
      width={220}
    >
      <div className="flex flex-col gap-2 mt-2">

        {/* Name */}
        <label className="flex flex-col text-sm font-medium">
          Name:
          <input
            className="mt-1 px-2 py-1 border border-gray-500 rounded-md outline-none"
            value={currName}
            onChange={(e) => {
              setCurrName(e.target.value);
              data.inputName = e.target.value;
            }}
            placeholder="Enter input name"
          />
        </label>

        {/* Type */}
        <label className="flex flex-col text-sm font-medium text-white">
          Type:
          <select
            className="mt-1 px-2 py-1 border border-gray-500 rounded-md bg-transparent outline-none"
            value={inputType}
            onChange={(e) => {
              setInputType(e.target.value);
              data.inputType = e.target.value;
            }}
          >
            <option className='bg-[#001f63]' value="Text">Text</option>
            <option className='bg-[#001f63]' value="File">File</option>
          </select>
        </label>

        {/* Value */}
        <label className="flex flex-col text-sm font-medium text-white">
          Value:
          <input
            className="mt-1 px-2 py-1 border border-gray-500 rounded-md outline-none"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              data.inputValue = e.target.value;
            }}
            placeholder="Enter input value"
          />
        </label>

      </div>
    </BaseNode>
  );
};
