import { useStore } from "./Store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      // Send pipeline data to backend
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      console.error("Error submitting pipeline:", err);
      alert("Failed to submit pipeline. Check console for details.");
    }
  };

  return (
    <div className="flex justify-center mt-4">
  <button
    onClick={handleSubmit}
    className="
      px-10 py-3
      rounded-xl
      font-semibold
      text-white
      bg-linear-to-r from-blue-700 via-blue-500 to-blue-700
      shadow-lg
      transition-all duration-200
      hover:brightness-110 hover:shadow-xl
      active:scale-95
      focus:outline-none focus:ring-4 focus:ring-blue-300
    "
  >
    Submit
  </button>
</div>

  );
};
