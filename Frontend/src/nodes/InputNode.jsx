import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const InputNode = ({ id, data }) => {
  const [title, setTitle] = useState(data?.label || 'Input');
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  data.label = title;
  data.inputName = currName;
  data.inputType = inputType;

  return (
    <BaseNode id={id} label={title} outputs={[{ id: `${id}-value` }]}>
      <div className="flex flex-col gap-2 mt-2">
        <input 
          className="nodrag bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white/50 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="flex flex-col text-xs text-white/70">
          Name:
          <input className="nodrag mt-1 px-2 py-1 border border-gray-600 rounded bg-transparent text-white outline-none" value={currName} onChange={(e) => setCurrName(e.target.value)} />
        </label>
        <label className="flex flex-col text-xs text-white/70">
          Type:
          <select className="nodrag mt-1 px-2 py-1 border border-gray-600 rounded bg-transparent text-white outline-none" value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option className='bg-[#001f63]' value="Text">Text</option>
            <option className='bg-[#001f63]' value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};