import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export type AuthType = { token?: string; apiKey?: string };

export class PinarkiveClient {
  private axios: AxiosInstance;
  private auth: AuthType;

  constructor(auth: AuthType, baseURL = 'https://api.pinarkive.com') {
    this.auth = auth;
    this.axios = axios.create({ baseURL });
    this.axios.interceptors.request.use((config) => {
      if (this.auth.token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${this.auth.token}` };
      } else if (this.auth.apiKey) {
        config.headers = { ...config.headers, 'X-API-Key': this.auth.apiKey };
      }
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
    return this.axios.post('/file', form);
  }
  async uploadDirectory(dirPath: string) {
    return this.axios.post('/file/directory', { dirPath });
  }
  async pinCid(cid: string) {
    return this.axios.post(`/file/pin/${cid}`);
  }
  async removeFile(cid: string) {
    return this.axios.delete(`/file/remove/${cid}`);
  }

  // --- User Profile ---
  async getProfile() {
    return this.axios.get('/me');
  }
  async updateProfile(data: any) {
    return this.axios.put('/me', data);
  }
  async listUploads(page = 1, limit = 10) {
    return this.axios.get('/me/uploads', { params: { page, limit } });
  }
  async deleteUpload(cid: string) {
    return this.axios.delete(`/me/uploads/${cid}`);
  }
  async getReferrals() {
    return this.axios.get('/me/referrals');
  }

  // --- Token Management ---
  async generateToken(label: string, name: string, expiresInDays?: number) {
    return this.axios.post('/api/tokens/generate', { label, name, expiresInDays });
  }
  async listTokens() {
    return this.axios.get('/api/tokens/list');
  }
  async revokeToken(name: string) {
    return this.axios.delete(`/api/tokens/revoke/${name}`);
  }

  // --- Status and Monitoring ---
  async getStatus(cid: string) {
    return this.axios.get(`/status/${cid}`);
  }
  async getAllocations(cid: string) {
    return this.axios.get(`/status/allocations/${cid}`);
  }
} 