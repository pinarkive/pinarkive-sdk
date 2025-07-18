<?php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class PinarkiveClient {
    private $client;
    private $token;
    private $apiKey;

    public function __construct($token = null, $apiKey = null, $baseUrl = 'https://api.pinarkive.com') {
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
        if ($locale) $params['locale'] = $locale;
        if ($refCode) $params['refCode'] = $refCode;
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
        return $this->client->post('/file', [
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
        return $this->client->post('/file/directory', [
            'headers' => $this->headers(),
            'json' => ['dirPath' => $dirPath]
        ]);
    }
    public function pinCid($cid) {
        return $this->client->post("/file/pin/{$cid}", [
            'headers' => $this->headers()
        ]);
    }
    public function removeFile($cid) {
        return $this->client->delete("/file/remove/{$cid}", [
            'headers' => $this->headers()
        ]);
    }

    // --- User Profile ---
    public function getProfile() {
        return $this->client->get('/me', [
            'headers' => $this->headers()
        ]);
    }
    public function updateProfile($data) {
        return $this->client->put('/me', [
            'headers' => $this->headers(),
            'json' => $data
        ]);
    }
    public function listUploads($page = 1, $limit = 10) {
        return $this->client->get('/me/uploads', [
            'headers' => $this->headers(),
            'query' => ['page' => $page, 'limit' => $limit]
        ]);
    }
    public function deleteUpload($cid) {
        return $this->client->delete("/me/uploads/{$cid}", [
            'headers' => $this->headers()
        ]);
    }
    public function getReferrals() {
        return $this->client->get('/me/referrals', [
            'headers' => $this->headers()
        ]);
    }

    // --- Token Management ---
    public function generateToken($label, $name, $expiresInDays = null) {
        $data = ['label' => $label, 'name' => $name];
        if ($expiresInDays) $data['expiresInDays'] = $expiresInDays;
        return $this->client->post('/api/tokens/generate', [
            'headers' => $this->headers(),
            'json' => $data
        ]);
    }
    public function listTokens() {
        return $this->client->get('/api/tokens/list', [
            'headers' => $this->headers()
        ]);
    }
    public function revokeToken($name) {
        return $this->client->delete("/api/tokens/revoke/{$name}", [
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