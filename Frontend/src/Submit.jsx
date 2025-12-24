import { useState } from "react";
import { useStore } from "./Store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setError(null);

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error submitting pipeline:", err);
      setError("Failed to submit pipeline. Please try again.");
    }
  };

  return (
    <>
      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="
            px-10 py-3 rounded-xl font-semibold text-white
            bg-linear-to-r from-blue-700 via-blue-500 to-blue-700
            shadow-lg transition-all duration-200
            hover:brightness-110 hover:shadow-xl
            active:scale-95
            focus:outline-none focus:ring-4 focus:ring-blue-300
          "
        >
          Submit
        </button>
      </div>

      {/* Pops-up */}
      {(result || error) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Modal */}
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-scale-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pipeline Result
            </h2>

            {result && (
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Nodes:</span>{" "}
                  {result.num_nodes}
                </p>
                <p>
                  <span className="font-medium">Edges:</span>{" "}
                  {result.num_edges}
                </p>
                <p>
                  <span className="font-medium">Is DAG:</span>{" "}
                  <span
                    className={
                      result.is_dag ? "text-green-600" : "text-red-600"
                    }
                  >
                    {result.is_dag ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            )}

            {error && (
              <p className="text-red-600 font-medium">{error}</p>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setResult(null);
                  setError(null);
                }}
                className="
                  px-5 py-2 rounded-lg font-medium
                  bg-gray-100 text-gray-700
                  hover:bg-gray-200 transition
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
