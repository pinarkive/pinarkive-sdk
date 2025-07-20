import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from 'axios';

export type AuthType = { token?: string; apiKey?: string };

export class PinarkiveClient {
  private axios: AxiosInstance;
  private auth: AuthType;

  constructor(auth: AuthType, baseURL = 'https://api.pinarkive.com/api/v2') {
    this.auth = auth;
    this.axios = axios.create({ baseURL });
    this.axios.interceptors.request.use((config) => {
      const headers = new AxiosHeaders(config.headers);
      if (this.auth.token) {
        headers.set('Authorization', `Bearer ${this.auth.token}`);
      } else if (this.auth.apiKey) {
        headers.set('X-API-Key', this.auth.apiKey);
      }
      config.headers = headers;
      return config;
    });
  }

  // --- Authentication ---
  async login(email: string, password: string) {
    return this.axios.post('/auth/login', { email, password });
  }
  async signup(data: any, locale?: string, refCode?: string) {
    return this.axios.post('/auth/signup', data, { params: { locale, refCode } });
  }
  async logout() {
    return this.axios.post('/auth/logout');
  }

  // --- File Management ---
  async uploadFile(file: File | Blob) {
    const form = new FormData();
    form.append('file', file);
    return this.axios.post('/files', form);
  }
  async uploadDirectory(dirPath: string) {
    return this.axios.post('/files/directory', { dirPath });
  }
  async pinCid(cid: string) {
    return this.axios.post(`/files/pin/${cid}`);
  }
  async removeFile(cid: string) {
    return this.axios.delete(`/files/remove/${cid}`);
  }

  // --- User Profile ---
  async getProfile() {
    return this.axios.get('/users/me');
  }
  async updateProfile(data: any) {
    return this.axios.put('/users/me', data);
  }
  async listUploads(page = 1, limit = 10) {
    return this.axios.get('/users/me/uploads', { params: { page, limit } });
  }
  async deleteUpload(cid: string) {
    return this.axios.delete(`/users/me/uploads/${cid}`);
  }
  async getReferrals() {
    return this.axios.get('/users/me/referrals');
  }

  // --- Token Management ---
  async generateToken(label: string, name: string, expiresInDays?: number) {
    return this.axios.post('/tokens/generate', { label, name, expiresInDays });
  }
  async listTokens() {
    return this.axios.get('/tokens/list');
  }
  async revokeToken(name: string) {
    return this.axios.delete(`/tokens/revoke/${name}`);
  }

  // --- Status and Monitoring ---
  async getStatus(cid: string) {
    return this.axios.get(`/status/${cid}`);
  }
  async getAllocations(cid: string) {
    return this.axios.get(`/status/allocations/${cid}`);
  }
}