import { useMemo, useRef } from "react";

export const DraggableNode = ({ type, label, icon }) => {
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
    []
  );

  const draggedRef = useRef(false);

  const handleClick = () => {
    if (!isMobile || draggedRef.current) return;

    window.dispatchEvent(
      new CustomEvent("add-node", { detail: { type } })
    );
  };

  const onDragStart = (event) => {
    if (isMobile) return;

    draggedRef.current = true;

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = () => {
    draggedRef.current = false;
  };

  return (
    <div
      draggable={!isMobile}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
      className="
        cursor-pointer
        shrink-0
        w-28 h-18
        flex flex-col items-center justify-center
        rounded-xl
        bg-linear-to-r from-slate-800 to-slate-900
        text-white
        shadow-lg
        transition
        active:scale-95
        select-none
      "
    >
      <div className="text-xl">{icon}</div>
      <span className="text-xs font-semibold text-center">
        {label}
      </span>
    </div>
  );
};
