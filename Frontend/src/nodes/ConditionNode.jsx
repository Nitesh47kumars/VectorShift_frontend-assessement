import { useState } from 'react';
import BaseNode from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  // Merged Title and Variable Name state
  const [currName, setCurrName] = useState(data?.label || 'Condition');
  const [conditionType, setConditionType] = useState(data?.conditionType || '==');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');

  // Sync data for backend
  data.label = currName;
  data.conditionType = conditionType;
  data.compareValue = compareValue;

  return (
    <BaseNode
      id={id}
      label={currName}
      onNameChange={setCurrName}
      inputs={[{ id: `${id}-input`, label: 'in' }]}
      outputs={[
        { id: `${id}-true`, label: 'true', style: { backgroundColor: '#22c55e' } }, // Green handle
        { id: `${id}-false`, label: 'false', style: { backgroundColor: '#ef4444' } } // Red handle
      ]}
    >
      <div className="flex flex-col gap-3 mt-2">

        {/* Operator Selection */}
        <label className="flex flex-col text-[10px] uppercase tracking-wider text-white/50 font-semibold">
          Operator
          <select
            className="nodrag mt-1 px-2 py-1.5 border border-white/10 rounded text-white text-xs outline-none cursor-pointer focus:border-blue-500"
            value={conditionType}
            onChange={(e) => setConditionType(e.target.value)}
          >
            <option value="==">Equals (==)</option>
            <option value="!=">Not Equal (!=)</option>
            <option value=">">Greater Than (&gt;)</option>
            <option value="<">Less Than (&lt;)</option>
            <option value="contains">Contains</option>
          </select>
        </label>

        {/* Comparison Value */}
        <label className="flex flex-col text-[10px] uppercase tracking-wider text-white/50 font-semibold">
          Compare To
          <input
            className="nodrag mt-1 px-2 py-1.5 border border-white/10 rounded bg-white/5 text-white text-xs outline-none focus:border-blue-500 transition-colors"
            type="text"
            value={compareValue}
            onChange={(e) => setCompareValue(e.target.value)}
            placeholder="Value..."
          />
        </label>

        <div className="pt-1 text-[9px] text-white/30 italic">
          If input {conditionType} {compareValue || '...'}
        </div>
      </div>
    </BaseNode>
  );
};