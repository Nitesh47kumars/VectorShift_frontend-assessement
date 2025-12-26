import { useState } from 'react';
import BaseNode from './BaseNode.jsx';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  data.label = currName;
  data.outputName = currName;
  data.outputType = outputType;

  return (
    <BaseNode
      id={id}
      label={currName}
      onNameChange={setCurrName}
      inputs={[{ id: `${id}-value`, label: 'value' }]}
    >
      <div className="flex flex-col gap-3 mt-2">

        <label className="flex flex-col text-[10px] uppercase tracking-wider text-white/50 font-semibold">
          Output Format
          <select 
            className="nodrag mt-1 px-2 py-1.5 border border-white/10 rounded bg-[#1a1a1a] text-white text-xs outline-none cursor-pointer focus:border-blue-500" 
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text Response</option>
            <option value="Image">Image Result</option>
          </select>
        </label>

        <div className="pt-2 border-t border-white/5">
          {outputType === 'Image' ? (
            <div className="w-full h-24 rounded bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center gap-1 text-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              <span className="text-[9px]">Image Output Placeholder</span>
            </div>
          ) : (
            <div className="w-full h-12 rounded bg-white/5 border border-white/10 p-2 text-[10px] text-white/40 italic flex items-center">
              System will output text here...
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};