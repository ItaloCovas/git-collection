import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  // public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  //   return this.client.post<T>(url, config);
  // }

  // public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  //   return this.client.put<T>(url, config);
  // }

  // public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  //   return this.client.delete<T>(url, config);
  // }
}
