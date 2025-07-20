const { default: axios, AxiosHeaders } = require('axios');

class PinarkiveClient {
  constructor({ token, apiKey }, baseURL = 'https://api.pinarkive.com/api/v2') {
    this.auth = { token, apiKey };
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
  login(email, password) {
    return this.axios.post('/auth/login', { email, password });
  }
  signup(data, locale, refCode) {
    return this.axios.post('/auth/signup', data, { params: { locale, refCode } });
  }
  logout() {
    return this.axios.post('/auth/logout');
  }

  // --- File Management ---
  uploadFile(file) {
    const form = new FormData();
    form.append('file', file);
    return this.axios.post('/files', form);
  }
  uploadDirectory(dirPath) {
    return this.axios.post('/files/directory', { dirPath });
  }
  pinCid(cid) {
    return this.axios.post(`/files/pin/${cid}`);
  }
  removeFile(cid) {
    return this.axios.delete(`/files/remove/${cid}`);
  }

  // --- User Profile ---
  getProfile() {
    return this.axios.get('/users/me');
  }
  updateProfile(data) {
    return this.axios.put('/users/me', data);
  }
  listUploads(page = 1, limit = 10) {
    return this.axios.get('/users/me/uploads', { params: { page, limit } });
  }
  deleteUpload(cid) {
    return this.axios.delete(`/users/me/uploads/${cid}`);
  }
  getReferrals() {
    return this.axios.get('/users/me/referrals');
  }

  // --- Token Management ---
  generateToken(name, permissions) {
    return this.axios.post('/tokens/generate', { name, permissions });
  }
  listTokens() {
    return this.axios.get('/tokens/list');
  }
  revokeToken(name) {
    return this.axios.delete(`/tokens/revoke/${name}`);
  }

  // --- Status and Monitoring ---
  getStatus(cid) {
    return this.axios.get(`/status/${cid}`);
  }
  getAllocations(cid) {
    return this.axios.get(`/status/allocations/${cid}`);
  }
}

module.exports = PinarkiveClient;