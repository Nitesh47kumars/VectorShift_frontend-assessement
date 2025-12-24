// src/nodes/ConditionNode.jsx
import { CreateNode } from './CreateNode';
import { useState, useEffect } from 'react';

export const ConditionNode = CreateNode({
  label: 'Condition',
  inputs: ['value'],
  outputs: ['true', 'false'],
  render: ({ data }) => {
    const [conditionType, setConditionType] = useState(
      data?.conditionType || 'Equals'
    );
    const [compareValue, setCompareValue] = useState(
      data?.compareValue || ''
    );

    // Persist values into node data (MVP approach)
    useEffect(() => {
      data.conditionType = conditionType;
      data.compareValue = compareValue;
    }, [conditionType, compareValue, data]);

    return (
      <div className="flex flex-col gap-2">
        {/* Condition selector */}
        <select
          className="
            border border-gray-600
            rounded-md
            px-2 py-1
            text-sm
            bg-transparent
            text-white
            outline-none
            focus:outline-none
            focus:ring-0
          "
          value={conditionType}
          onChange={(e) => setConditionType(e.target.value)}
        >
          <option className="bg-[#0b1220]">Equals</option>
          <option className="bg-[#0b1220]">Greater Than</option>
          <option className="bg-[#0b1220]">Less Than</option>
        </select>

        <input
          type="text"
          placeholder="Compare value"
          className="
            border border-gray-600
            rounded-md
            px-2 py-1
            text-sm
            bg-transparent
            text-white
            placeholder:text-gray-400
            outline-none
            focus:outline-none
            focus:ring-0
          "
          value={compareValue}
          onChange={(e) => setCompareValue(e.target.value)}
        />

      </div>
    );
  },
});
