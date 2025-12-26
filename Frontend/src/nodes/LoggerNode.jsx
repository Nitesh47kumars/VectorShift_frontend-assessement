import { useState } from 'react';
import BaseNode from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.label || 'Logger');
  data.label = currName;

  return (
    <BaseNode 
    id={id}
    label={currName}
    onNameChange={setCurrName}
    inputs={[{ id: `${id}-input` }]}>
      <div className="flex flex-col gap-2">
        
        <div className="text-xs text-white/50 italic">Logs incoming data</div>
      </div>
    </BaseNode>
  );
};