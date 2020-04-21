import React, { useState, FormEvent, useEffect } from 'react';
// import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Title, Form, Repositories, Error,
} from './styles';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositoryies] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });
  const [newrepo, setNewrepo] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!newrepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newrepo}`);
      console.log(response);
      const repository = response.data;

      setRepositoryies([...repositories, repository]);
      setNewrepo('');
      setInputError('');
    } catch (err) {
      setInputError('erro na busca do repositório');
    }
  }

  return (
    <>
      <img src="" alt="github_explorer" />
      <Title>Explore Repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newrepo}
          onChange={(e) => setNewrepo(e.target.value)}
          placeholder="Digite o nome do repositório"
          type="text"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link key={repository.full_name} to={`repository/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};


export default Dashboard;
