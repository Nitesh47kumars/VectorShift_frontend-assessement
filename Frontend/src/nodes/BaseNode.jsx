import { Handle, Position, useReactFlow } from "reactflow";

const BaseNode = ({
  id,
  label,
  inputs = [],
  outputs = [],
  width = 200,
  children,
}) => {
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((n) => n.id !== id));
    setEdges((edges) =>
      edges.filter((e) => e.source !== id && e.target !== id)
    );
  };

  return (
    <div
      className="
        relative
        rounded-lg
        border border-white/10
        shadow-[0_8px_24px_rgba(0,0,0,0.6)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)]
        transition-shadow
        flex flex-col
        text-white
        focus:outline-none
        focus:ring-0
      "
      style={{ width }}
      tabIndex={-1}
    >
      {/* HEADER */}
      <div className="relative flex flex-col gap-2 border-b border-white/30 p-3 bg-linear-to-r from-[#002791] to-[#050e3c]">
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          title="Delete node"
          className="
            absolute top-1 right-1
            w-5 h-5
            flex items-center justify-center
            rounded-full
            text-white/60
            hover:text-red-400
            hover:bg-red-500/10
            transition
            text-xs
            font-bold
            focus:outline-none
            focus:ring-0
          "
        >
          ✕
        </button>

        {/* Drag indicator */}
        <div className="w-full flex justify-center">
          <div className="h-1 w-8 rounded bg-white/30" />
        </div>

        {/* Title */}
        <div className="font-semibold uppercase text-md text-white">
          {label}
        </div>
      </div>

      {/* BODY / CHILDREN */}
      <div className="flex flex-col gap-2 text-white p-3 bg-linear-to-r from-[#002355be] to-[#050e3cc1]">
        {children}
      </div>

      {/* Input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            width: 10,
            height: 10,
            background: "#020617",
            border: "1.5px solid #94a3b8",
            top: 50 + index * 24,
          }}
        />
      ))}

      {/* Output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            width: 10,
            height: 10,
            background: "#020617",
            border: "1.5px solid #94a3b8",
            top: 50 + index * 24,
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
