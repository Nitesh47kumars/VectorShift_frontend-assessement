import { PipelineToolbar } from './Toolbar.jsx';
import { PipelineUI } from './Ui.jsx';
import { SubmitButton } from './Submit.jsx';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
