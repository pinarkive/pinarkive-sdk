import requests
from typing import Optional, Dict, Any

class PinarkiveClient:
    def __init__(self, token: Optional[str] = None, api_key: Optional[str] = None, base_url: str = 'https://api.pinarkive.com'):
        self.base_url = base_url
        self.token = token
        self.api_key = api_key
        self.session = requests.Session()

    def _headers(self) -> Dict[str, str]:
        headers = {}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        elif self.api_key:
            headers['X-API-Key'] = self.api_key
        return headers

    # --- Authentication ---
    def login(self, email: str, password: str) -> Any:
        return self.session.post(f'{self.base_url}/auth/login', json={'email': email, 'password': password})

    def signup(self, data: dict, locale: Optional[str] = None, refCode: Optional[str] = None) -> Any:
        params = {}
        if locale:
            params['locale'] = locale
        if refCode:
            params['refCode'] = refCode
        return self.session.post(f'{self.base_url}/auth/signup', json=data, params=params)

    def logout(self) -> Any:
        return self.session.post(f'{self.base_url}/auth/logout', headers=self._headers())

    # --- File Management ---
    def upload_file(self, file_path: str) -> Any:
        with open(file_path, 'rb') as f:
            files = {'file': f}
            return self.session.post(f'{self.base_url}/file', files=files, headers=self._headers())

    def upload_directory(self, dir_path: str) -> Any:
        return self.session.post(f'{self.base_url}/file/directory', json={'dirPath': dir_path}, headers=self._headers())

    def pin_cid(self, cid: str) -> Any:
        return self.session.post(f'{self.base_url}/file/pin/{cid}', headers=self._headers())

    def remove_file(self, cid: str) -> Any:
        return self.session.delete(f'{self.base_url}/file/remove/{cid}', headers=self._headers())

    # --- User Profile ---
    def get_profile(self) -> Any:
        return self.session.get(f'{self.base_url}/me', headers=self._headers())

    def update_profile(self, data: dict) -> Any:
        return self.session.put(f'{self.base_url}/me', json=data, headers=self._headers())

    def list_uploads(self, page: int = 1, limit: int = 10) -> Any:
        return self.session.get(f'{self.base_url}/me/uploads', params={'page': page, 'limit': limit}, headers=self._headers())

    def delete_upload(self, cid: str) -> Any:
        return self.session.delete(f'{self.base_url}/me/uploads/{cid}', headers=self._headers())

    def get_referrals(self) -> Any:
        return self.session.get(f'{self.base_url}/me/referrals', headers=self._headers())

    # --- Token Management ---
    def generate_token(self, label: str, name: str, expires_in_days: Optional[int] = None) -> Any:
        data = {'label': label, 'name': name}
        if expires_in_days:
            data['expiresInDays'] = expires_in_days
        return self.session.post(f'{self.base_url}/api/tokens/generate', json=data, headers=self._headers())

    def list_tokens(self) -> Any:
        return self.session.get(f'{self.base_url}/api/tokens/list', headers=self._headers())

    def revoke_token(self, name: str) -> Any:
        return self.session.delete(f'{self.base_url}/api/tokens/revoke/{name}', headers=self._headers())

    # --- Status and Monitoring ---
    def get_status(self, cid: str) -> Any:
        return self.session.get(f'{self.base_url}/status/{cid}', headers=self._headers())

    def get_allocations(self, cid: str) -> Any:
        return self.session.get(f'{self.base_url}/status/allocations/{cid}', headers=self._headers()) 