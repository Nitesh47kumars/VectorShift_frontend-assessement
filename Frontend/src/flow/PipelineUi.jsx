import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store/Store.jsx';
import { shallow } from 'zustand/shallow';
import { InputNode } from '../nodes/InputNode.jsx';
import { LLMNode } from '../nodes/LLMNode.jsx';
import { OutputNode } from '../nodes/OutputNode.jsx';
import { TextNode } from '../nodes/TextNode.jsx';
import CustomNode from '../nodes/CustomNode.jsx';
import {LoggerNode} from '../nodes/LoggerNode.jsx';
import {ConditionNode} from '../nodes/ConditionNode.jsx';

import 'reactflow/dist/style.css';


import DeletableEdge from './DeletableEdge.jsx';
import { PipelineToolbar } from '../toolbar/PipelineToolbar.jsx';

import useMiniMapSize from "./useMiniMapSize.jsx"

const gridSize = 15;
const proOptions = { hideAttribution: true };


const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  custom: CustomNode,
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

  const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

  
  const miniMapSize = useMiniMapSize();

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
        const CustomNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        
        addNode(CustomNode);
      }
    },
    [reactFlowInstance]
  );


  useEffect(() => {
    const handler = (e) => {
      const type = e.detail.type;
      if (!reactFlowInstance) return;
  
      const position = reactFlowInstance.project({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
  
      const nodeID = getNodeID(type);
  
      addNode({
        id: nodeID,
        type,
        position,
        data: { id: nodeID, nodeType: type },
      });
    };
  
    window.addEventListener("add-node", handler);
    return () => window.removeEventListener("add-node", handler);
  }, [reactFlowInstance]);
  
  
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
          className="w-screen h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
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

            panOnDrag={true}
            panOnScroll={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            >
            <PipelineToolbar className="pointer-events-auto"/>
            
            <Background color="#999" gap={gridSize} />

            <Controls position="bottom-left"/>

            <MiniMap
              position={isMobile?"bottom-right":"bottom-left"}
              style={{
                ...(isMobile
                  ? {
                      right: 0,
                      bottom: 0,
                    }
                  : {
                      left: 50,
                }),
                width: miniMapSize.width,
                height: miniMapSize.height,
                borderRadius: 6,
                backgroundColor: "#111827",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }}
              maskColor="rgba(0,0,0,0.25)"
              nodeColor={(n) => {
                switch (n.type) {
                  case 'customInput': return '#10B981';
                  case 'customOutput': return '#EF4444';
                  case 'llm': return '#7C2D12';
                  case 'text': return '#FBBF24';
                  case 'newnode': return '#8B5CF6';
                  case 'logger': return '#38BDF8';
                  case 'condition': return '#F97316';
                  default: return '#9CA3AF';
                }
              }}
            />
          </ReactFlow>

        </div>
        </>
    )
}
