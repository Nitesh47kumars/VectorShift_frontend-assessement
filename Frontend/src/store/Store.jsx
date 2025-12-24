import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

// Helper: resolve node inputs
const resolveNodeInputs = (node, nodeMap) => {
    const inputs = {};
    for (let handle of node.inputs || []) {
        const incomingEdge = Object.values(nodeMap.edges || []).find(
            e => e.target === handle.id
        );
        if (incomingEdge) {
            const sourceNode = nodeMap.nodes.find(n => n.id === incomingEdge.source);
            if (sourceNode) {
                inputs[handle.id] = sourceNode.data?.value ?? sourceNode.data?.text ?? null;
            }
        } else {
            inputs[handle.id] = node.data?.[handle.id] ?? null;
        }
    }
    return inputs;
};

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) newIDs[type] = 0;
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },

    addNode: (node) => set({ nodes: [...get().nodes, node] }),
    onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
    onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
    onConnect: (connection) => set({
        edges: addEdge({
            ...connection,
            type: 'deletable',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 }
        }, get().edges)
    }),
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map(node => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, [fieldName]: fieldValue };
                }
                return node;
            })
        });
    },

    // === New: Execute pipeline ===
    executePipeline: () => {
        const nodes = get().nodes;
        const edges = get().edges;
        const nodeMap = { nodes, edges };

        // Prepare output storage
        const results = {};

        // Simple BFS execution based on edges (topo-ish)
        const executed = new Set();

        const executeNode = (node) => {
            if (executed.has(node.id)) return;
            
            // First execute dependencies
            const incomingEdges = edges.filter(e => e.target.startsWith(node.id));
            incomingEdges.forEach(edge => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                if (sourceNode) executeNode(sourceNode);
            });

            // Gather inputs
            const inputs = {};
            incomingEdges.forEach(edge => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                if (sourceNode) {
                    inputs[edge.target] = sourceNode.data?.value ?? sourceNode.data?.text ?? null;
                }
            });

            // Compute output based on type
            let output = null;
            switch (node.type) {
                case 'customInput':
                    output = node.data?.inputValue ?? null;
                    break;
                case 'text':
                    output = node.data?.text ?? '';
                    // replace {{var}} with resolved input values
                    output = output.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (_, varName) => {
                        return inputs[`${node.id}-${varName}`] ?? '';
                    });
                    break;
                case 'newnode':
                    output = node.data?.text ?? '';
                    break;
                case 'logger':
                    console.log('LoggerNode:', inputs);
                    break;
                case 'condition':
                    const value = inputs[`${node.id}-value`] ?? '';
                    const conditionType = node.data?.conditionType ?? 'Equals';
                    if (conditionType === 'Equals') output = value === node.data?.compareValue;
                    if (conditionType === 'Greater Than') output = value > node.data?.compareValue;
                    if (conditionType === 'Less Than') output = value < node.data?.compareValue;
                    break;
                case 'llm':
                    output = `[LLM Output: "${inputs[`${node.id}-prompt`] || ''}"]`;
                    break;
                case 'customOutput':
                    console.log('OutputNode:', inputs);
                    output = inputs[`${node.id}-value`] ?? null;
                    break;
                default:
                    output = null;
            }

            node.data = { ...node.data, value: output };
            results[node.id] = output;

            executed.add(node.id);
        };

        nodes.forEach(executeNode);

        return results;
    }
}));
