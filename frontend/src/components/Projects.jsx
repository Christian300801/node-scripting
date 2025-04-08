import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Projects() {
  const navigate = useNavigate();
  const [newProjectName, setNewProjectName] = useState('');
  const [creating, setCreating] = useState(false);
  const [projects, setProjects] = useState([]); // Projektliste im State

  useEffect(() => {
    // Lade alle Projekte von der API
    axios.get('http://localhost:5001/api/projects')
      .then((response) => {
        setProjects(response.data); // Setze die Projekte in den State
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Projekte:", error);
      });
  }, []); // Läuft nur einmal beim ersten Laden der Komponente

  const handleCreateProject = async () => {
    if (!newProjectName) return;

    const res = await axios.post("http://localhost:5001/api/projects", {
      name: newProjectName,
    });

    const project = res.data;
    setNewProjectName("");
    setCreating(false);

    // Navigiere zur Editor-Seite nach erfolgreichem Erstellen des Projekts
    navigate(`/editor/${project._id}`);
  };

  return (
    <div className="projects-container">
      <h1>Projekte</h1>

      {/* Anzeige der erstellten Projekte */}
      <div>
        <h3>Erstellte Projekte:</h3>
        <div className="project-list">
          {projects.map((project) => (
            <div
              key={project._id}
              className="project-item"
              onClick={() => navigate(`/editor/${project._id}`)} // Navigiere zum Editor des Projekts
            >
              {project.name}
            </div>
          ))}
        </div>
      </div>

      {/* Button zum Erstellen eines neuen Projekts */}
      <div
        className="new-project-btn"
        onClick={() => setCreating(true)}
      >
        ➕ Neues Projekt erstellen
      </div>

      {/* Formular zum Erstellen eines neuen Projekts */}
      {creating && (
        <div className="new-project-form">
          <input
            type="text"
            placeholder="Projektname"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="new-project-input"
          />
          <button
            onClick={handleCreateProject}
            className="new-project-button"
          >
            Erstellen
          </button>
        </div>
      )}
    </div>
  );
}
