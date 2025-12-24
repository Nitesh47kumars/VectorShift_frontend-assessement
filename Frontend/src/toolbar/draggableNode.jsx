export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`
        ${type}
        cursor-grab
        shrink-0
        w-28 sm:w-24
        h-18 sm:h-18
        flex flex-col
        items-center justify-center
        gap-1
        rounded-xl
        bg-linear-to-r from-slate-800 to-slate-900
        text-white
        shadow-lg
        transition-all
        hover:shadow-xl
        active:scale-95
      `}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
    >
      <div className="text-xl sm:text-2xl">
        {icon}
      </div>

      <span className="font-semibold text-xs sm:text-sm text-center">
        {label}
      </span>
    </div>
  );
};
