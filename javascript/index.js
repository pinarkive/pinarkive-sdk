const axios = require('axios');

class PinarkiveClient {
  constructor({ token, apiKey }, baseURL = 'https://api.pinarkive.com') {
    this.auth = { token, apiKey };
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
    return this.axios.post('/file', form);
  }
  uploadDirectory(dirPath) {
    return this.axios.post('/file/directory', { dirPath });
  }
  pinCid(cid) {
    return this.axios.post(`/file/pin/${cid}`);
  }
  removeFile(cid) {
    return this.axios.delete(`/file/remove/${cid}`);
  }

  // --- User Profile ---
  getProfile() {
    return this.axios.get('/me');
  }
  updateProfile(data) {
    return this.axios.put('/me', data);
  }
  listUploads(page = 1, limit = 10) {
    return this.axios.get('/me/uploads', { params: { page, limit } });
  }
  deleteUpload(cid) {
    return this.axios.delete(`/me/uploads/${cid}`);
  }
  getReferrals() {
    return this.axios.get('/me/referrals');
  }

  // --- Token Management ---
  generateToken(label, name, expiresInDays) {
    return this.axios.post('/api/tokens/generate', { label, name, expiresInDays });
  }
  listTokens() {
    return this.axios.get('/api/tokens/list');
  }
  revokeToken(name) {
    return this.axios.delete(`/api/tokens/revoke/${name}`);
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