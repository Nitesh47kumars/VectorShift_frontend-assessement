import { useMemo, useState, useRef, useEffect } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import BaseNode from './BaseNode.jsx';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.label || 'Text');
  const [text, setText] = useState(data?.text || '{{value}}');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  data.label = currName;
  data.text = text;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      updateNodeInternals(id);
    }
  }, [text, id, updateNodeInternals]);

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
      label={currName}
      onNameChange={setCurrName}
      inputs={inputHandles}
      outputs={[{ id: `${id}-value` }]}
     >
      <div className="flex flex-col gap-2">
        
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="nodrag nowheel w-full min-h-20 resize-none rounded-md border border-gray-600 bg-transparent p-2 text-sm text-white outline-none overflow-hidden"
        />
      </div>
    </BaseNode>
  );
};