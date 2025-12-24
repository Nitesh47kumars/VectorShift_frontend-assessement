import { DraggableNode } from "./draggableNode.jsx";

import { GiLogicGateNor } from "react-icons/gi";
import { MdInput } from "react-icons/md";
import { CiTextAlignCenter } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { FaRobot } from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import { LuFileOutput } from "react-icons/lu";

export const PipelineToolbar = () => {
  const nodes = [
    { type: "customInput", label: "Input", icon: <MdInput /> },
    { type: "customOutput", label: "Output", icon: <LuFileOutput /> },
    { type: "llm", label: "LLM", icon: <FaRobot /> },
    { type: "text", label: "Text", icon: <CiTextAlignCenter /> },
    { type: "newnode", label: "New", icon: <TfiWrite /> },
    { type: "condition", label: "Condition", icon: <GiLogicGateNor /> },
    { type: "logger", label: "Logger", icon: <IoIosPrint /> },
  ];

  return (
    <div className="w-full h-full p-4 box-border bg-linear-to-r from-indigo-700 via-indigo-500 to-indigo-700 shadow-lg">
      <div className="grid w-full h-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
        {nodes.map((node) => (
          <div
            key={node.type}
            className="transition-all duration-200 ease-in-out hover:-translate-y-1"
          >
            <DraggableNode
              type={node.type}
              label={node.label}
              icon={node.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
