// src/nodes/TextNode.jsx
import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // detect variables like {{var}}
  const variables = currText.match(/\{\{(.*?)\}\}/g) || [];
  const handles = variables.map((v) => ({ id: v.replace(/[{}]/g, '') }));

  return (
    <BaseNode
      id={id}
      label="Text"
      inputs={handles}
      outputs={[{ id: `${id}-output` }]}
      height={Math.max(100, currText.length * 0.7)}
    >
      <textarea
        className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm"
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        rows={3}
      />
    </BaseNode>
  );
};
