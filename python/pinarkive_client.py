import requests
from typing import Optional, Dict, Any, List

class PinarkiveClient:
    def __init__(self, token: Optional[str] = None, api_key: Optional[str] = None, base_url: str = 'https://api.pinarkive.com/api/v2'):
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
        return self.session.post(
            f'{self.base_url}/auth/login',
            json={'email': email, 'password': password}
        )

    def signup(self, data: Dict[str, Any], locale: Optional[str] = None, refCode: Optional[str] = None) -> Any:
        params: Dict[str, str] = {}
        if locale:
            params['locale'] = locale
        if refCode:
            params['refCode'] = refCode
        return self.session.post(
            f'{self.base_url}/auth/signup',
            json=data,
            params=params
        )

    def logout(self) -> Any:
        return self.session.post(
            f'{self.base_url}/auth/logout',
            headers=self._headers()
        )

    # --- File Management ---
    def upload_file(self, file_path: str) -> Any:
        with open(file_path, 'rb') as f:
            files = {'file': f}
            return self.session.post(
                f'{self.base_url}/files',
                files=files,
                headers=self._headers()
            )

    def upload_directory(self, dir_path: str) -> Any:
        return self.session.post(
            f'{self.base_url}/files/directory',
            json={'dirPath': dir_path},
            headers=self._headers()
        )

    def pin_cid(self, cid: str) -> Any:
        return self.session.post(
            f'{self.base_url}/files/pin/{cid}',
            headers=self._headers()
        )

    def remove_file(self, cid: str) -> Any:
        return self.session.delete(
            f'{self.base_url}/files/remove/{cid}',
            headers=self._headers()
        )

    # --- User Profile ---
    def get_profile(self) -> Any:
        return self.session.get(
            f'{self.base_url}/users/me',
            headers=self._headers()
        )

    def update_profile(self, data: Dict[str, Any]) -> Any:
        return self.session.put(
            f'{self.base_url}/users/me',
            json=data,
            headers=self._headers()
        )

    def list_uploads(self, page: int = 1, limit: int = 10) -> Any:
        return self.session.get(
            f'{self.base_url}/users/me/uploads',
            params={'page': page, 'limit': limit},
            headers=self._headers()
        )

    def delete_upload(self, cid: str) -> Any:
        return self.session.delete(
            f'{self.base_url}/users/me/uploads/{cid}',
            headers=self._headers()
        )

    def get_referrals(self) -> Any:
        return self.session.get(
            f'{self.base_url}/users/me/referrals',
            headers=self._headers()
        )

    # --- Token Management ---
    def generate_token(self, name: str, permissions: Optional[List[str]] = None) -> Any:
        data: Dict[str, Any] = {'name': name}
        if permissions:
            data['permissions'] = permissions
        return self.session.post(
            f'{self.base_url}/tokens/generate',
            json=data,
            headers=self._headers()
        )

    def list_tokens(self) -> Any:
        return self.session.get(
            f'{self.base_url}/tokens/list',
            headers=self._headers()
        )

    def revoke_token(self, name: str) -> Any:
        return self.session.delete(
            f'{self.base_url}/tokens/revoke/{name}',
            headers=self._headers()
        )

    # --- Status and Monitoring ---
    def get_status(self, cid: str) -> Any:
        return self.session.get(
            f'{self.base_url}/status/{cid}',
            headers=self._headers()
        )

    def get_allocations(self, cid: str) -> Any:
        return self.session.get(
            f'{self.base_url}/status/allocations/{cid}',
            headers=self._headers()
        )