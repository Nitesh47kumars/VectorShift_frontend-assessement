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
          className="border rounded px-2 py-1 text-sm bg-white"
          value={conditionType}
          onChange={(e) => setConditionType(e.target.value)}
        >
          <option>Equals</option>
          <option>Greater Than</option>
          <option>Less Than</option>
        </select>

        {/* Compare value */}
        <input
          type="text"
          placeholder="Compare value"
          className="border rounded px-2 py-1 text-sm"
          value={compareValue}
          onChange={(e) => setCompareValue(e.target.value)}
        />
      </div>
    );
  },
});
