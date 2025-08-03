import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://192.168.100.8:5124/api',  
      timeout: 10000,                      
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get<T>(path: string, params?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(path, { params });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  public async post<T, U>(path: string, body: T): Promise<U> {
    try {
      const response: AxiosResponse<U> = await this.client.post(path, body);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any) {
    console.error('API error', error.response ?? error.message);
  }
}

export const apiService = new ApiService();
