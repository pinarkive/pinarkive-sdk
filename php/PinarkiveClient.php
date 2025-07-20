<?php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class PinarkiveClient {
    private $client;
    private $token;
    private $apiKey;

    public function __construct($token = null, $apiKey = null, $baseUrl = 'https://api.pinarkive.com/api/v2') {
        $this->token = $token;
        $this->apiKey = $apiKey;
        $this->client = new Client(['base_uri' => $baseUrl]);
    }

    private function headers() {
        $headers = [];
        if ($this->token) {
            $headers['Authorization'] = 'Bearer ' . $this->token;
        } elseif ($this->apiKey) {
            $headers['X-API-Key'] = $this->apiKey;
        }
        return $headers;
    }

    // --- Authentication ---
    public function login($email, $password) {
        return $this->client->post('/auth/login', [
            'json' => ['email' => $email, 'password' => $password]
        ]);
    }

    public function signup($data, $locale = null, $refCode = null) {
        $params = [];
        if ($locale) {
            $params['locale'] = $locale;
        }
        if ($refCode) {
            $params['refCode'] = $refCode;
        }
        return $this->client->post('/auth/signup', [
            'json' => $data,
            'query' => $params
        ]);
    }

    public function logout() {
        return $this->client->post('/auth/logout', [
            'headers' => $this->headers()
        ]);
    }

    // --- File Management ---
    public function uploadFile($filePath) {
        return $this->client->post('/files', [
            'headers' => $this->headers(),
            'multipart' => [
                [
                    'name' => 'file',
                    'contents' => fopen($filePath, 'r')
                ]
            ]
        ]);
    }

    public function uploadDirectory($dirPath) {
        return $this->client->post('/files/directory', [
            'headers' => $this->headers(),
            'json' => ['dirPath' => $dirPath]
        ]);
    }

    public function pinCid($cid) {
        return $this->client->post("/files/pin/{$cid}", [
            'headers' => $this->headers()
        ]);
    }

    public function removeFile($cid) {
        return $this->client->delete("/files/remove/{$cid}", [
            'headers' => $this->headers()
        ]);
    }

    // --- User Profile ---
    public function getProfile() {
        return $this->client->get('/users/me', [
            'headers' => $this->headers()
        ]);
    }

    public function updateProfile($data) {
        return $this->client->put('/users/me', [
            'headers' => $this->headers(),
            'json' => $data
        ]);
    }

    public function listUploads($page = 1, $limit = 10) {
        return $this->client->get('/users/me/uploads', [
            'headers' => $this->headers(),
            'query' => ['page' => $page, 'limit' => $limit]
        ]);
    }

    public function deleteUpload($cid) {
        return $this->client->delete("/users/me/uploads/{$cid}", [
            'headers' => $this->headers()
        ]);
    }

    public function getReferrals() {
        return $this->client->get('/users/me/referrals', [
            'headers' => $this->headers()
        ]);
    }

    // --- Token Management ---
    public function generateToken($name, array $permissions) {
        $data = ['name' => $name, 'permissions' => $permissions];
        return $this->client->post('/tokens/generate', [
            'headers' => $this->headers(),
            'json' => $data
        ]);
    }

    public function listTokens() {
        return $this->client->get('/tokens/list', [
            'headers' => $this->headers()
        ]);
    }

    public function revokeToken($name) {
        return $this->client->delete("/tokens/revoke/{$name}", [
            'headers' => $this->headers()
        ]);
    }

    // --- Status and Monitoring ---
    public function getStatus($cid) {
        return $this->client->get("/status/{$cid}", [
            'headers' => $this->headers()
        ]);
    }

    public function getAllocations($cid) {
        return $this->client->get("/status/allocations/{$cid}", [
            'headers' => $this->headers()
        ]);
    }
}