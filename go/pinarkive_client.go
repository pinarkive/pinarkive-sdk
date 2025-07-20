package pinarkive

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

type PinarkiveClient struct {
	BaseURL string
	Token   string
	APIKey  string
	Client  *http.Client
}

func NewPinarkiveClient(token, apiKey, baseURL string) *PinarkiveClient {
	if baseURL == "" {
		baseURL = "https://api.pinarkive.com/api/v2"
	}
	return &PinarkiveClient{
		BaseURL: baseURL,
		Token:   token,
		APIKey:  apiKey,
		Client:  &http.Client{},
	}
}

func (c *PinarkiveClient) headers() http.Header {
	headers := http.Header{}
	if c.Token != "" {
		headers.Set("Authorization", "Bearer "+c.Token)
	} else if c.APIKey != "" {
		headers.Set("X-API-Key", c.APIKey)
	}
	return headers
}

// --- Authentication ---
func (c *PinarkiveClient) Login(email, password string) (*http.Response, error) {
	data := map[string]string{"email": email, "password": password}
	return c.postJson("/auth/login", data, nil)
}

func (c *PinarkiveClient) Signup(data map[string]interface{}, locale, refCode string) (*http.Response, error) {
	params := ""
	if locale != "" || refCode != "" {
		params = "?"
		if locale != "" {
			params += "locale=" + locale
		}
		if refCode != "" {
			if locale != "" {
				params += "&"
			}
			params += "refCode=" + refCode
		}
	}
	return c.postJson("/auth/signup"+params, data, nil)
}

func (c *PinarkiveClient) Logout() (*http.Response, error) {
	return c.postJson("/auth/logout", nil, c.headers())
}

// --- File Management ---
func (c *PinarkiveClient) UploadFile(filePath string) (*http.Response, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	var b bytes.Buffer
	w := multipart.NewWriter(&b)
	fw, err := w.CreateFormFile("file", file.Name())
	if err != nil {
		return nil, err
	}
	if _, err = io.Copy(fw, file); err != nil {
		return nil, err
	}
	w.Close()
	url := c.BaseURL + "/files"
	req, err := http.NewRequest("POST", url, &b)
	if err != nil {
		return nil, err
	}
	req.Header = c.headers()
	req.Header.Set("Content-Type", w.FormDataContentType())
	return c.Client.Do(req)
}

func (c *PinarkiveClient) UploadDirectory(dirPath string) (*http.Response, error) {
	data := map[string]string{"dirPath": dirPath}
	return c.postJson("/files/directory", data, c.headers())
}

func (c *PinarkiveClient) PinCid(cid string) (*http.Response, error) {
	return c.postJson("/files/pin/"+cid, nil, c.headers())
}

func (c *PinarkiveClient) RemoveFile(cid string) (*http.Response, error) {
	url := c.BaseURL + "/files/remove/" + cid
	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header = c.headers()
	return c.Client.Do(req)
}

// --- User Profile ---
func (c *PinarkiveClient) GetProfile() (*http.Response, error) {
	return c.get("/users/me", c.headers())
}

func (c *PinarkiveClient) UpdateProfile(data map[string]interface{}) (*http.Response, error) {
	return c.putJson("/users/me", data, c.headers())
}

func (c *PinarkiveClient) ListUploads(page, limit int) (*http.Response, error) {
	url := fmt.Sprintf("/users/me/uploads?page=%d&limit=%d", page, limit)
	return c.get(url, c.headers())
}

func (c *PinarkiveClient) DeleteUpload(cid string) (*http.Response, error) {
	url := "/users/me/uploads/" + cid
	return c.delete(url, c.headers())
}

func (c *PinarkiveClient) GetReferrals() (*http.Response, error) {
	return c.get("/users/me/referrals", c.headers())
}

// --- Token Management ---
func (c *PinarkiveClient) GenerateToken(label, name string, expiresInDays int) (*http.Response, error) {
	data := map[string]interface{}{"label": label, "name": name}
	if expiresInDays > 0 {
		data["expiresInDays"] = expiresInDays
	}
	return c.postJson("/tokens/generate", data, c.headers())
}

func (c *PinarkiveClient) ListTokens() (*http.Response, error) {
	return c.get("/tokens/list", c.headers())
}

func (c *PinarkiveClient) RevokeToken(name string) (*http.Response, error) {
	url := "/tokens/revoke/" + name
	return c.delete(url, c.headers())
}

// --- Status and Monitoring ---
func (c *PinarkiveClient) GetStatus(cid string) (*http.Response, error) {
	url := "/status/" + cid
	return c.get(url, c.headers())
}

func (c *PinarkiveClient) GetAllocations(cid string) (*http.Response, error) {
	url := "/status/allocations/" + cid
	return c.get(url, c.headers())
}

// --- Helper HTTP methods ---
func (c *PinarkiveClient) get(path string, headers http.Header) (*http.Response, error) {
	url := c.BaseURL + path
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header = headers
	return c.Client.Do(req)
}

func (c *PinarkiveClient) postJson(path string, data interface{}, headers http.Header) (*http.Response, error) {
	url := c.BaseURL + path
	var body io.Reader
	if data != nil {
		b, _ := json.Marshal(data)
		body = bytes.NewBuffer(b)
	}
	req, err := http.NewRequest("POST", url, body)
	if err != nil {
		return nil, err
	}
	req.Header = headers
	if data != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	return c.Client.Do(req)
}

func (c *PinarkiveClient) putJson(path string, data interface{}, headers http.Header) (*http.Response, error) {
	url := c.BaseURL + path
	b, _ := json.Marshal(data)
	req, err := http.NewRequest("PUT", url, bytes.NewBuffer(b))
	if err != nil {
		return nil, err
	}
	req.Header = headers
	req.Header.Set("Content-Type", "application/json")
	return c.Client.Do(req)
}

func (c *PinarkiveClient) delete(path string, headers http.Header) (*http.Response, error) {
	url := c.BaseURL + path
	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header = headers
	return c.Client.Do(req)
}