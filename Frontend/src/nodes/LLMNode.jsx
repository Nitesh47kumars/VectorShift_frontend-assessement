import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const LLMNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.label || 'LLM Engine');
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temp, setTemp] = useState(data?.temp || 0.7);

  data.label = currName;
  data.model = model;
  data.temp = temp;

  return (
    <BaseNode 
      id={id} 
      label={currName}
      onNameChange={setCurrName}
      inputs={[{ id: `${id}-system`, label: 'system' }, { id: `${id}-prompt`, label: 'prompt' }]} 
      outputs={[{ id: `${id}-response`, label: 'response' }]}
    >
      <div className="flex flex-col gap-3 mt-2">

        <label className="flex flex-col text-[10px] uppercase tracking-wider text-white/50 font-semibold">
          Model
          <select 
            className="nodrag mt-1 px-2 py-1.5 border border-white/10 rounded text-white text-xs outline-none cursor-pointer focus:border-blue-500" 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
          >
            <option className='bg-[#001f63]' value="gpt-4o">GPT-4o</option>
            <option className='bg-[#001f63]' value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option className='bg-[#001f63]' value="claude-3-sonnet">Claude 3 Sonnet</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};