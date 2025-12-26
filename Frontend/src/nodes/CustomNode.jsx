import { useState, useEffect, useRef } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import BaseNode from './BaseNode';

const CustomNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.label || 'Custom Node');
  const [text, setText] = useState(data.config?.text || '');
  
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  data.label = currName;
  data.config = {
    ...data.config,
    text,
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      updateNodeInternals(id);
    }
  }, [text, id, updateNodeInternals]);

  const inputs = [{ id: `${id}-value` }];
  const outputs = [{ id: `${id}-value` }];

  return (
    <BaseNode
      id={id}
      label={currName}
      onNameChange={setCurrName}
      inputs={inputs}
      outputs={outputs}
    >
      <div className="flex flex-col gap-3">

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">
            User Instruction
          </label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write instruction here..."
            className="
              nodrag nowheel
              w-full
              min-h-18
              resize-none
              rounded-md
              border border-gray-600
              bg-transparent
              px-2 py-1
              text-sm
              text-white
              placeholder:text-gray-400
              outline-none
              overflow-hidden
            "
          />
        </div>

      </div>
    </BaseNode>
  );
};

export default CustomNode;