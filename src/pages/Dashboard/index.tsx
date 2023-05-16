import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GithubService, { GithubRepository } from '../../services/GithubService';

import logo from '../../assets/github-logo.png';
import './styles.scss';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Array<GithubRepository>>(() => {
    const storedRepos = localStorage.getItem('@GitCollection:repositories');
    if (storedRepos) {
      return JSON.parse(storedRepos);
    }

    return [];
  });
  const [newRepository, setNewRepository] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const formEl = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 400);
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repositories));
  }, [repositories]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewRepository(event.target.value);
  }

  function handleButtonText() {
    if (loading) {
      return <Loader />;
    }

    if (isSmallScreen) {
      return <FiSearch />;
    }

    return 'Buscar';
  }

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepository) {
      toast.error('Informe um usuário/repositório', { position: toast.POSITION.BOTTOM_CENTER });
      return;
    }

    try {
      setLoading(true);
      const response = await GithubService.getRepository(`repos/${newRepository}`);
      setLoading(false);
      const data = response.data;

      setRepositories((prevState) => [...prevState, data]);
      formEl.current?.reset();
      setNewRepository('');
    } catch (err: any) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.request.status === 404) {
        toast.error('Repositório não encontrado!', { position: toast.POSITION.BOTTOM_CENTER });
      } else {
        toast.error('Revise os dados informados e tente novamente.');
      }
      console.log(err, 'erro');
    }
  }

  return (
    <>
      <img src={logo} alt="GitCollection" className="github__logo" />
      <h1 className="dashboard__title">Catálogo de Repositórios do Github</h1>

      <form className="dashboard__form" onSubmit={handleAddRepository} ref={formEl}>
        <input placeholder="username/repository_name" onChange={handleInputChange} />
        <button type="submit">{handleButtonText()}</button>
      </form>

      <ul className="repositories__list">
        {repositories.map((repository, index) => {
          return (
            <li key={repository.full_name + index}>
              <Link to={`/repositories/${encodeURIComponent(repository.full_name)}`}>
                <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size={25} />
              </Link>
            </li>
          );
        })}
      </ul>

      <ToastContainer bodyStyle={{ fontWeight: 'bold', color: '#E74C3C' }} />
    </>
  );
};

export default Dashboard;
