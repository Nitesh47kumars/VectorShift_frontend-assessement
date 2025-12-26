import { useState } from "react";
import BaseNode from "./BaseNode.jsx";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  data.label = currName;
  data.inputName = currName;
  data.inputType = inputType;

  return (
    <BaseNode
      id={id}
      label={currName}
      onNameChange={setCurrName}
      outputs={[{ id: `${id}-value` }]}
    >
      <div className="flex flex-col gap-3 mt-2">

        <label className="flex flex-col text-xs text-white/70">
          Type:
          <select
            className="nodrag mt-1 px-2 py-1 border border-gray-600 rounded bg-transparent text-white outline-none cursor-pointer"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option className="bg-[#001f63]" value="Text">
              Text
            </option>
            <option className="bg-[#001f63]" value="File">
              File
            </option>
          </select>
        </label>

        <label className="flex flex-col text-xs text-white/70">
          {inputType === "File" ? "Upload File:" : "Value:"}
          <input
            type={inputType === "File" ? "file" : "text"}
            className="border border-gray-600 rounded nodrag mt-1 px-1 py-1 text-[10px] text-white/80 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </label>
      </div>
    </BaseNode>
  );
};
