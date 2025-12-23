import { useStore } from './Store.jsx';

export const SubmitButton = () => {
    const executePipeline = useStore(state => state.executePipeline);

    const handleSubmit = () => {
        const result = executePipeline();
        console.log('Pipeline Execution Result:', result);
        alert('Pipeline executed! Check console for output.');
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px'}}>
            <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </div>
    );
};
