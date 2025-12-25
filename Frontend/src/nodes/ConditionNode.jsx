import { useState } from 'react';
import BaseNode from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [title, setTitle] = useState(data?.label || 'Condition');
  const [conditionType, setConditionType] = useState(data?.conditionType || 'Equals');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');

  data.label = title;
  data.conditionType = conditionType;
  data.compareValue = compareValue;

  return (
    <BaseNode
      id={id}
      label={title}
      inputs={[{ id: `${id}-value` }]}
      outputs={[{ id: `${id}-true` }, { id: `${id}-false` }]}
    >
      <div className="flex flex-col gap-2">
        <input 
          className="nodrag bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white/50 outline-none focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Rename Node..."
        />
        <select
          className="nodrag border border-gray-600 rounded-md px-2 py-1 text-sm bg-transparent text-white outline-none"
          value={conditionType}
          onChange={(e) => setConditionType(e.target.value)}
        >
          <option className='bg-[#001f63]'>Equals</option>
          <option className='bg-[#001f63]'>Greater Than</option>
          <option className='bg-[#001f63]'>Less Than</option>
        </select>
        <input
          className="nodrag border border-gray-600 rounded-md px-2 py-1 text-sm bg-transparent text-white outline-none"
          type="text"
          value={compareValue}
          onChange={(e) => setCompareValue(e.target.value)}
          placeholder="Value"
        />
      </div>
    </BaseNode>
  );
};