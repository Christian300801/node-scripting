import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useNodesState, useEdgesState, addEdge, ReactFlow } from '@xyflow/react';
import axios from 'axios';
import NodeForm from './NodeForm';

export default function Editor() {
  const { projectId } = useParams(); 
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/nodes/${projectId}`)
      .then((response) => {
        const reactFlowNodes = response.data.map((node) => ({
          id: node._id,
          type: 'default',
          data: { label: node.name },
          position: { x: Math.random() * 500, y: Math.random() * 500 },
        }));
        setNodes(reactFlowNodes);

        axios.get(`http://localhost:5001/api/arrows/${projectId}`)
          .then((arrowResponse) => {
            const reactFlowEdges = arrowResponse.data.map((arrow) => ({
              id: `e${arrow.from}-${arrow.to}`,
              source: arrow.from._id,
              target: arrow.to._id,
              animated: true,
            }));
            setEdges(reactFlowEdges);
          });
      });
  }, [projectId]);

  const addNodeToState = useCallback((newNode) => {
    const updatedNodes = [
      ...nodes,
      {
        id: newNode._id,
        type: 'default',
        data: { label: newNode.name },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      },
    ];
    setNodes(updatedNodes);
  }, [nodes]);

  const onConnect = useCallback((params) => {
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    axios.post('http://localhost:5001/api/arrows/addarrows', {
      projectId,
      from: sourceNode.id,
      to: targetNode.id,
      type: 'default',
      color: 'black',
    }).then((res) => {
      const newArrow = res.data;
      setEdges((eds) => [
        ...eds,
        {
          id: `e${newArrow.from}-${newArrow.to}`,
          source: newArrow.from,
          target: newArrow.to,
          animated: true,
        },
      ]);
    });

    setEdges((eds) => addEdge(params, eds));
  }, [nodes, projectId]);

  const handleNodeClick = (e, node) => setSelectedNode(node);

  const handleNodeNameChange = (e) => {
    const newLabel = e.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { label: newLabel } } : node
      )
    );
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <NodeForm onNodeCreate={(node) => addNodeToState({ ...node, projectId })} projectId={projectId} />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        style={{ width: '100%', height: '100vh' }}
      />

      {selectedNode && (
        <div className="absolute top-5 left-5 bg-white p-4 rounded shadow">
          <input value={selectedNode.data.label} onChange={handleNodeNameChange} />
        </div>
      )}
    </div>
  );
}
