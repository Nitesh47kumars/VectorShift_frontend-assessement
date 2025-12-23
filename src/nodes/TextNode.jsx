import { useMemo, useState, useRef, useEffect } from 'react';
import BaseNode from './BaseNode.jsx';

// Matches valid JS variable names inside {{ }}
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [text]);

  // Extract unique variables → input handles
  const inputHandles = useMemo(() => {
    const variables = new Set();
    let match;

    while ((match = VARIABLE_REGEX.exec(text)) !== null) {
      variables.add(match[1]);
    }

    return Array.from(variables).map((name) => ({
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
        ref={textareaRef}
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
          text-gray-800
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
      />
    </BaseNode>
  );
};
