import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const OutputNode = ({ id, data }) => {
  const [title, setTitle] = useState(data?.label || 'Output');
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  data.label = title;
  data.outputName = currName;
  data.outputType = outputType;

  return (
    <BaseNode id={id} label={title} inputs={[{ id: `${id}-value` }]}>
      <div className="flex flex-col gap-2 mt-1">
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
          <select className="nodrag mt-1 px-2 py-1 border border-gray-600 rounded bg-transparent text-white outline-none" value={outputType} onChange={(e) => setOutputType(e.target.value)}>
            <option className='bg-[#001f63]' value="Text">Text</option>
            <option className='bg-[#001f63]' value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};