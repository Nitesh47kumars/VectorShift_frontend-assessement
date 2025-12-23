import { Handle, Position, useReactFlow } from 'reactflow';

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
      className="relative bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 flex flex-col gap-2"
      style={{ width }}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="
          absolute top-1 right-1
          rounded-full
          w-5 h-5
          flex items-center justify-center
          text-gray-500
          hover:bg-red-100
          hover:text-red-600
          transition
          text-xs
          font-bold
        "
        title="Delete node"
      >
        ✕
      </button>


      {/* Drag indicator */}
      <div className="w-full flex justify-center">
        <div className="h-1 w-8 bg-gray-400 rounded" />
      </div>

      {/* Title */}
      <div className="font-semibold text-gray-800 border-b pb-1">
        {label}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">{children}</div>

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
            background: '#eeeeee',
            border: '2px solid black',
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
            background: '#eeeeee',
            border: '2px solid black',
            top: 50 + index * 24,
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
