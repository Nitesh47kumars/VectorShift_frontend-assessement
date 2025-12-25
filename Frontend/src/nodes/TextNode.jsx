import { useMemo, useState, useRef, useEffect } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import BaseNode from './BaseNode.jsx';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [title, setTitle] = useState(data?.label || 'Text');
  const [text, setText] = useState(data?.text || '{{value}}');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  data.label = title;
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
    <BaseNode id={id} label={title} inputs={inputHandles} outputs={[{ id: `${id}-value` }]}>
      <div className="flex flex-col gap-2">
        <input 
          className="nodrag bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white/50 outline-none focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Node Title"
        />
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