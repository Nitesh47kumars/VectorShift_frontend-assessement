import { useStore } from './Store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      // Send pipeline data to backend
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      // Show alert with result
      alert(
        `Pipeline Execution Result:\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag}`
      );
    } catch (err) {
      console.error('Error submitting pipeline:', err);
      alert('Failed to submit pipeline. Check console for details.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
