import { useStore } from './Store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    const values = {};

    // 1. Collect Input values
    nodes.forEach((node) => {
      if (node.type === 'customInput') {
        values[node.id] = node.data.inputValue;
      }
    });

    // 2. Execute Text nodes
    nodes.forEach((node) => {
      if (node.type === 'text') {
        let output = node.data.text;

        // find incoming edge
        edges.forEach((edge) => {
          if (edge.target === node.id) {
            const sourceValue = values[edge.source];
            output = output.replace(/\{\{\s*\w+\s*\}\}/g, sourceValue);
          }
        });

        values[node.id] = output;
      }
    });

    // 3. Execute Output nodes
    nodes.forEach((node) => {
      if (node.type === 'customOutput') {
        edges.forEach((edge) => {
          if (edge.target === node.id) {
            values[node.id] = values[edge.source];
          }
        });
      }
    });

    console.log('Pipeline Execution Result:', values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
