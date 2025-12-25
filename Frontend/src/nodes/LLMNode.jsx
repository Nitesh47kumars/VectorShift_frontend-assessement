import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const LLMNode = ({ id, data }) => {
  const [title, setTitle] = useState(data?.label || 'LLM');
  data.label = title;

  return (
    <BaseNode id={id} label={title} inputs={[{ id: `${id}-system` }, { id: `${id}-prompt` }]} outputs={[{ id: `${id}-response` }]}>
      <div className="flex flex-col gap-2 mt-1">
        <input 
          className="nodrag bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white/50 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-xs text-white/60">Processes logic & prompt</div>
      </div>
    </BaseNode>
  );
};