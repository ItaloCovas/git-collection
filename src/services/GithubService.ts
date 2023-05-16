import { AxiosResponse } from 'axios';
import { HttpClient } from './utils/HttpClient';

export interface GithubRepository {
  full_name: string;
  description: string;
  forks_count?: number;
  open_issues_count?: number;
  stargazers_count?: number;
  html_url?: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

class GithubService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('https://api.github.com');
  }

  public async getRepository(url: string): Promise<AxiosResponse<GithubRepository>> {
    return await this.httpClient.get<GithubRepository>(url);
  }

  public async getIssues(url: string): Promise<AxiosResponse<Array<GithubIssue>>> {
    return await this.httpClient.get<Array<GithubIssue>>(url);
  }
}

export default new GithubService();
