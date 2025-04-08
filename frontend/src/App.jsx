import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './components/Projects';
import ProjektEditor from './components/ProjektEditor';
import '@xyflow/react/dist/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/editor/:projectId" element={<ProjektEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
