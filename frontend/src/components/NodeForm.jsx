import React, { useState } from 'react';
import axios from 'axios';

function NodeForm({ projectId, onNodeCreate }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funktion zum Erstellen eines neuen Knotens
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNode = {
      projectId,
      name,
      color,
      contents: [],
      attributes: {},
      nodeGroup: 'group1',
    };

    try {
      const response = await axios.post('http://localhost:5001/api/nodes/addnodes', newNode);
      onNodeCreate(response.data); // Erstelle den Knoten und aktualisiere den Zustand
      closeModal(); // Schließe das Modal nach der Erstellung
    } catch (error) {
      console.error('Error creating node:', error);
    }
  };

  // Funktion zum Öffnen des Modals
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Funktion zum Schließen des Modals
  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setColor('');
  };

  return (
    <div>
      {/* Senkrechte Leiste mit dem + Symbol */}
      <div className="toolbox-btn" onClick={openModal}>
        +
      </div>

      {/* Das Modal */}
      <div className={`modal ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <h2>Neuen Knoten erstellen</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Node Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Node Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <button type="submit">Knoten erstellen</button>
          </form>
          <button onClick={closeModal}>Schließen</button>
        </div>
      </div>
    </div>
  );
}

export default NodeForm;
