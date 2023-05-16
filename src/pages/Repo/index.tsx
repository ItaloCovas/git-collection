import { Link, useParams } from 'react-router-dom';
import { FiAlertCircle, FiChevronLeft, FiChevronRight, FiGitBranch, FiStar } from 'react-icons/fi';

import GithubService, { GithubIssue, GithubRepository } from '../../services/GithubService';

import logo from '../../assets/github-logo.png';
import './styles.scss';
import { useEffect, useState } from 'react';

type IRepoParams = {
  repository: string;
};

const Repo: React.FC = () => {
  const { repository } = useParams<IRepoParams>();
  const [repositoryInfo, setRepositoryInfo] = useState<GithubRepository | null>(null);
  const [issues, setIssues] = useState<Array<GithubIssue | any>>([]);

  useEffect(() => {
    (async () => {
      const repositoryData = await GithubService.getRepository(`repos/${repository}`);
      setRepositoryInfo(repositoryData.data);

      const repositoryIssues = await GithubService.getIssues(`repos/${repository}/issues`);
      const issuesData = repositoryIssues.data;

      setIssues(issuesData);
    })();
  }, [repository]);

  return (
    <>
      <header className="header">
        <img src={logo} alt="GitCollection" className="github__logo" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </header>

      {repository && (
        <section className="repository__info">
          <header>
            <img src={repositoryInfo?.owner.avatar_url} alt={repositoryInfo?.owner.login} />
            <div className="repository__details">
              <Link to={repositoryInfo?.html_url as string}>{repositoryInfo?.full_name}</Link>
              <p>{repositoryInfo?.description}</p>
            </div>
          </header>
          <ul className="repository__stats">
            <li>
              <strong>{repositoryInfo?.stargazers_count}</strong>
              <a href={`${repositoryInfo?.html_url}/stargazers`}>
                <FiStar color="gold" size={20} />
                Stars
              </a>
            </li>
            <li>
              <strong>{repositoryInfo?.forks_count}</strong>
              <a href={`${repositoryInfo?.html_url}/forks`}>
                <FiGitBranch size={20} />
                Forks
              </a>
            </li>
            <li>
              <strong>{repositoryInfo?.open_issues_count}</strong>
              <a href={`${repositoryInfo?.html_url}/issues`}>
                <FiAlertCircle color="red" size={20} />
                Issues abertas
              </a>
            </li>
          </ul>
        </section>
      )}

      <div className="repository__issues">
        <h2 className="issues__title">Issues:</h2>
        {issues.map((issue) => (
          <a href={issue.html_url} rel="noopener noreferrer" target="_blank" key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </div>
    </>
  );
};

export default Repo;
