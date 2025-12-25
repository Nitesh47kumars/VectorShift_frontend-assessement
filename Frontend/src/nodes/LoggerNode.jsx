import { useState } from 'react';
import BaseNode from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  const [title, setTitle] = useState(data?.label || 'Logger');
  data.label = title;

  return (
    <BaseNode id={id} label={title} inputs={[{ id: `${id}-input` }]}>
      <div className="flex flex-col gap-2">
        <input 
          className="nodrag bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white/50 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-xs text-white/50 italic">Logs incoming data</div>
      </div>
    </BaseNode>
  );
};