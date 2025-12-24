import { getBezierPath, EdgeLabelRenderer } from "reactflow";
import { useStore } from "../store/Store";

export default function DeletableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { onEdgesChange } = useStore();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const deleteEdge = () => {
    onEdgesChange([{ type: "remove", id }]);
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="edge-delete-wrapper"
        >
          <button
            onClick={deleteEdge}
            className="
              text-red-600 font-bold text-sm
              opacity-70 hover:opacity-100
              transition
              hover:drop-shadow-[0_0_2px_rgba(255,0,0,0.6)]
            "
          >
            X
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
