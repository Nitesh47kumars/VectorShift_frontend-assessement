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
import { SubmitButton } from "../ui/Submit.jsx";

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
    <div className="relative min-h-12 w-full z-10 bg-linear-to-r from-[#002f80] via-[#1831b2] to-[#002791] shadow-lg">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          absolute -bottom-6 left-1/2 -translate-x-1/2
          bg-transparent
          border border-white/40
          blur-[1px]
          rounded
          py-0.2 px-8
          text-white
          shadow-md
          hover:bg-slate-800
          transition
        "
      >
        {open ? (
          <HiChevronUp className="text-2xl" />
        ) : (
          <HiChevronDown className="text-2xl" />
        )}
      </button>

      <div className="flex justify-between items-center p-2 shadow-gray-900 shadow">
        <div className="flex items-center gap-3">

          <div className="
            h-10 w-10
            rounded-full
            bg-white/10
            p-0.5
            shadow-inner
            ring-1 ring-white/20
            flex items-center justify-center
          ">
            <img
              src="/Logo.png"
              alt="VectorShift Logo"
              className="h-full w-full rounded-full object-contain"
            />
          </div>
          
          <span className="text-white font-bold text-xl tracking-wide">
            VectorShift
          </span>
        </div>

        <SubmitButton />
      </div>


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
            md:px-5 p-2
            py-4
          "
        >
          {/* Nodes */}
          <div
            className="
              grid
              grid-flow-col
              auto-cols-[120px]
              gap-4
              w-full

              overflow-x-auto
              md:overflow-x-visible

              md:grid-flow-row
              md:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]

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
