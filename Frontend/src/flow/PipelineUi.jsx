import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store/Store.jsx';
import { shallow } from 'zustand/shallow';
import { InputNode } from '../nodes/InputNode.jsx';
import { LLMNode } from '../nodes/LLMNode.jsx';
import { OutputNode } from '../nodes/OutputNode.jsx';
import { TextNode } from '../nodes/TextNode.jsx';
import NewNode from '../nodes/NewNode.jsx';
import {LoggerNode} from '../nodes/LoggerNode.jsx';
import {ConditionNode} from '../nodes/ConditionNode.jsx';

import 'reactflow/dist/style.css';
import { SubmitButton } from '../ui/Submit.jsx';


import DeletableEdge from './DeletableEdge.jsx';

const gridSize = 15;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  newnode:NewNode,
  logger: LoggerNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    const edgeTypes = {
      deletable: DeletableEdge,
    };


    return (
        <>
        <div
          ref={reactFlowWrapper}
          className="w-screen h-[84.5vh] bg-neutral-900"
        >
          <ReactFlow
            className="w-full h-full"
            nodes={nodes}
            edges={edges}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            snapGrid={[gridSize, gridSize]}
          >
            <Background color="#999" gap={gridSize} />

            <Controls position="bottom-left"/>

            <MiniMap 
              position="bottom-left" 
              style={{
                left: 50,
                height: 130,
                width: 260,
                borderRadius: '4px',
                backgroundColor: '#333',
                border: '1px solid #555',
              }}
              nodeColor={(n) => {
                switch(n.type){
                  case 'customInput': return '#10B981';    // green
                  case 'customOutput': return '#F00';    // red
                  case 'llm': return '#630000';            // Brown
                  case 'text': return '#FBBF24';           // yellow
                  case 'newnode': return '#8B5CF6';        // purple
                  case 'logger': return '#14B8F6';         // skyblue
                  case 'condition': return '#F97316';      // orange
                  default: return '#9CA3AF';               // gray fallback
                }
              }}
              maskColor="rgba(0,0,0,0.2)"
            />

            <div className="absolute z-10 bottom-4 right-4">
              <SubmitButton />
            </div>
          </ReactFlow>

        </div>
        </>
    )
}
