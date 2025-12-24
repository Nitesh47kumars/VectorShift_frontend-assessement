export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`
        ${type}
        cursor-grab
        min-w-25
        h-20
        flex
        flex-col
        items-center
        justify-center
        gap-1.5
        rounded-xl
        bg-linear-to-br from-slate-800 to-slate-900
        text-white
        shadow-lg
        transition-all
        hover:shadow-xl
        active:scale-95
      `}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
    >
      <div className="text-2xl">
        {icon}
      </div>

      <span className="font-bold text-sm text-center">
        {label}
      </span>
    </div>
  );
};
