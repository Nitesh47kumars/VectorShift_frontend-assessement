// toolbar.js

import { DraggableNode } from './draggableNode.jsx';

export const PipelineToolbar = () => {
    const nodes = [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'text', label: 'Text' },
        { type: 'newnode', label: 'New' },
        { type: 'condition', label: 'Condition' },
        { type: 'logger', label: 'Logger' },
        { type: 'customOutput', label: 'Output' },
    ];

    return (
        <div className="w-full h-full p-4 box-border shadow-lg">
            <div className="grid w-full h-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
                {nodes.map((node) => (
                    <div
                        key={node.type}
                        className="
                            transition-all duration-200 ease-in-out
                            hover:bg-gray-100
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >
                        <DraggableNode
                            type={node.type}
                            label={node.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
