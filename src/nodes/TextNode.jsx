// src/nodes/TextNode.jsx
import { useMemo, useState } from 'react';
import BaseNode from './BaseNode.jsx';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');

  // Extract unique variable names
  const inputHandles = useMemo(() => {
    const vars = new Set();
    let match;

    while ((match = VARIABLE_REGEX.exec(text)) !== null) {
      vars.add(match[1]);
    }

    return Array.from(vars).map((name) => ({
      id: `${id}-${name}`,
      label: name,
    }));
  }, [text, id]);

  return (
    <BaseNode
      id={id}
      label="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text… use {{variable}}"
        className="
          w-full
          min-h-20
          resize-none
          rounded-md
          border
          border-gray-300
          p-2
          text-sm
          leading-relaxed
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
        style={{
          height: 'auto',
          overflow: 'hidden',
        }}
        onInput={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
    </BaseNode>
  );
};
