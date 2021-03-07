import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((resp) => {
      setRepositories(resp.data);
    });

  }, []);

  async function handleAddRepository() {
    const data = {
      title: "Desafio ReactJS",
      url: "htpps://github.com/josepholiveira",
      techs: ["React", "NodeJS"]
    };

    await api.post('repositories', data).then((resp) => {
      setRepositories([...repositories, resp.data]);
    });
  }

  async function handleRemoveRepository(id) {
    const repoWithoutDeleted = repositories.filter(repo => repo.id !== id);

    setRepositories(repoWithoutDeleted);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
