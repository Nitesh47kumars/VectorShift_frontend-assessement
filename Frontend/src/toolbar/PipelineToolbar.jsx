import { useState } from "react";
import { DraggableNode } from "./draggableNode.jsx";

import { GiLogicGateNor } from "react-icons/gi";
import { MdInput } from "react-icons/md";
import { CiTextAlignCenter } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { FaRobot } from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import { LuFileOutput } from "react-icons/lu";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

export const PipelineToolbar = () => {
  const [open, setOpen] = useState(true);

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
    <div className="relative w-full z-10 bg-linear-to-r from-indigo-700 via-indigo-500 to-indigo-700 shadow-lg">
      
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          absolute -bottom-4 left-1/2 -translate-x-1/2
          z-20
          rounded-full
          bg-slate-900
          border border-white/10
          p-1.5
          text-white
          shadow-md
          hover:bg-slate-800
          transition
        "
      >
        {open ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {/* Toolbar */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        `}
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:justify-between
            md:items-center
            gap-4
            px-2 py-3
          "
        >
          {/* Logo — desktop only */}
          <div className="hidden md:flex items-center shrink-0 pr-4 border-r border-white/20">
            <span className="text-white font-bold text-lg tracking-wide">
              VectorFlow
            </span>
          </div>

          {/* Nodes (mobile = same, desktop = right side) */}
          <div
            className="
              flex
              items-center
              gap-4
              overflow-x-auto
              scrollbar-thin
              scrollbar-thumb-white/20
              scrollbar-track-transparent
            "
          >
            {nodes.map((node) => (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={node.label}
                icon={node.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
