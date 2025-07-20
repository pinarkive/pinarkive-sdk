# Pinarkive IPFS API v2.0 Documentation

## Table of Contents

- [Introduction](#introduction)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [File Management](#file-management)
  - [User Profile](#user-profile)
  - [Token Management](#token-management)
  - [Status and Monitoring](#status-and-monitoring)
- [Data Schemas](#data-schemas)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Rate Limiting and Quotas](#rate-limiting-and-quotas)
- [Support](#support)

## Introduction

The Pinarkive IPFS API is a comprehensive platform for decentralized file storage using IPFS (InterPlanetary File System) technology. It provides secure, scalable, and distributed storage solutions with user management and token-based access.

### Base URL

```
https://api.pinarkive.com/api/v2
```

### API Version

Current version: **2.0.0** (Stable)

This is the current stable version of the Pinarkive IPFS API. All new integrations should use this version.

### Legacy Endpoint Support

During the transition period, legacy endpoints (v1.x) without version prefix remain accessible but are deprecated. Legacy endpoints automatically redirect to the appropriate v2.0 endpoints with proper deprecation headers. For legacy endpoint documentation, see [Legacy API Documentation](legacy-api.md).

## Authentication

The Pinarkive API supports two authentication methods:

### 1. JWT Bearer Token Authentication

Used for web applications and temporary access. Tokens are obtained through login and have configurable expiration times.

**Header Format:**
```
Authorization: Bearer <jwt-token>
```

### 2. API Key Authentication

Used for programmatic access and CLI tools. API keys are long-lived tokens managed through the user interface.

**Header Format:**
```
X-API-Key: <api-key>
```

### Role-Based Access Control

- **user**: Access to personal files and account management  
- **admin**: Administrative access to user and system endpoints

### Authentication Examples

**Login:**
```bash
curl -X POST https://api.pinarkive.com/api/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Using JWT Token:**
```bash
curl -H "Authorization: Bearer <token>" \
  https://api.pinarkive.com/api/v2/users/me
```

**Using API Key:**
```bash
curl -H "X-API-Key: your-api-key" \
  https://api.pinarkive.com/api/v2/users/me
```

## API Endpoints

### Authentication Endpoints

#### POST /api/v2/auth/login
Authenticate user with email and password.

**Request Body:**
```json
{ "email": "user@example.com", "password": "password123" }
```
**Response (200):**
```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

#### POST /api/v2/auth/signup
Register a new user account.

**Query Parameters:** `locale` (default `en_US`), `refCode`  
**Request Body:**
```json
{
  "name": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "birthDate": "1990-01-01",
  "country": "US",
  "referredBy": "referral-code"
}
```
**Response (201):**
```json
{ "message": "User registered successfully", "referralCode": "abc123def" }
```

#### POST /api/v2/auth/logout
Revoke the current authentication token.

**Response (200):**
```json
{ "message": "Logged out successfully" }
```

### File Management

#### POST /api/v2/files
Upload a single file to IPFS.

**Content-Type:** `multipart/form-data`  
**Form Data:** `file`  
**Response (201):**
```json
{ "cid": "Qm...BdG", "size": 1024576 }
```

#### POST /api/v2/files/directory
Upload a directory to IPFS (Beta).

**Request Body:**
```json
{ "dirPath": "/path/to/directory" }
```
**Response (201):**  
See [OpenAPI](openapi-v2.yaml) for full schema.

#### POST /api/v2/files/pin/{cid}
Pin an existing CID to the cluster.

**Parameters:** `cid`  
**Response (200):**
```json
{
  "cid":"Qm...BdG",
  "status":"pinned",
  "operation":"pin",
  "timestamp":"2024-01-15T10:30:00Z",
  "message":"CID pinned successfully"
}
```

#### DELETE /api/v2/files/remove/{cid}
Remove a file from the cluster.

**Parameters:** `cid`  
**Response (200):**
```json
{ "success":true, "cid":"Qm...BdG", "removed":true }
```

### User Profile

#### GET /api/v2/users/me
Get current user profile.

**Response (200):** [UserProfile schema]

#### PUT /api/v2/users/me
Update user profile.

**Request Body:** partial profile fields  
**Response (200):**
```json
{ "message": "Profile updated successfully" }
```

#### GET /api/v2/users/me/uploads
List user uploads (paginated).

#### DELETE /api/v2/users/me/uploads/{cid}
Delete a user's file.

#### GET /api/v2/users/me/referrals
Get referral information.

### Token Management

#### POST /api/v2/tokens/generate
Generate a new API token.

#### GET /api/v2/tokens/list
List user's API tokens.

#### DELETE /api/v2/tokens/revoke/{name}
Revoke a specific API token.

### Status and Monitoring

#### GET /api/v2/status/{cid}
Get CID status and peer information.

#### GET /api/v2/status/allocations/{cid}
Get CID allocation details.

## Data Schemas

### User Profile
```json
{
  "id": "string",
  "name": "string",
  "lastname": "string",
  "email": "string",
  "country": "string",
  "birthDate": "string",
  "role": "user|admin",
  "createdAt": "string",
  "updatedAt": "string",
  "referralCode": "string",
  "referredBy": "string"
}
```

### Upload Record
```json
{
  "cid": "string",
  "filename": "string",
  "size": "number",
  "uploadedAt": "string",
  "status": "pinned|unpinned|failed",
  "type": "file|directory"
}
```

### Token
```json
{
  "name": "string",
  "token": "string",
  "createdAt": "string",
  "lastUsed": "string",
  "permissions": ["read", "write", "admin"]
}
```

### Status Response
```json
{
  "cid": "string",
  "status": "pinned|unpinned|pinning|failed",
  "size": "number",
  "peers": ["string"],
  "allocations": [
    {
      "peer": "string",
      "status": "pinned|unpinned|pinning|failed",
      "timestamp": "string"
    }
  ]
}
```

## Error Handling

The API uses standard HTTP status codes and returns errors in JSON format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### Common Error Codes

- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or invalid
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `413 Payload Too Large`: File size exceeds limits
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Examples

### Complete Workflow

1. **Register**
```bash
curl -X POST https://api.pinarkive.com/api/v2/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","lastname":"Doe","email":"john@example.com","password":"securepassword","country":"US"}'
```

2. **Login**
```bash
curl -X POST https://api.pinarkive.com/api/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepassword"}'
```

3. **Upload File**
```bash
curl -X POST https://api.pinarkive.com/api/v2/files \
  -H "Authorization: Bearer <token>" \
  -F "file=@document.pdf"
```

4. **List Files**
```bash
curl https://api.pinarkive.com/api/v2/users/me/uploads?page=1&limit=10 \
  -H "Authorization: Bearer <token>"
```

5. **Check Status**
```bash
curl https://api.pinarkive.com/api/v2/status/Qm...BdG \
  -H "X-API-Key: your-api-key"
```

6. **Pin Existing CID**
```bash
curl -X POST https://api.pinarkive.com/api/v2/files/pin/Qm...BdG \
  -H "Authorization: Bearer <token>"
```

7. **Generate API Token**
```bash
curl -X POST https://api.pinarkive.com/api/v2/tokens/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"my-api-token","permissions":["read","write"]}'
```

## Rate Limiting and Quotas

### Rate Limits

- **Authentication endpoints**: 10 requests per minute per IP
- **File uploads**: 100 requests per hour per user
- **General API**: 1000 requests per hour per user
- **Status checks**: 500 requests per hour per user

### File Size Limits

- **Single file**: 100 MB maximum
- **Directory upload**: 500 MB maximum total size
- **Daily upload quota**: 1 GB per user (free tier)

### Response Headers

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Support

For API support and questions:
- Documentation: [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs)
- OpenAPI Spec: [https://api.pinarkive.com/docs/openapi-v2.yaml](https://api.pinarkive.com/docs/openapi-v2.yaml)
- Legacy API Documentation: [https://api.pinarkive.com/docs/legacy](https://api.pinarkive.com/docs/legacy)

---

*Last updated: June 2024*