# Pinarkive IPFS API Legacy Documentation (v1.x)

> ⚠️ **DEPRECATION WARNING** ⚠️
> 
> This API version is **DEPRECATED** and will be sunset on **July 20, 2024**.
> 
> **Please migrate to API v2.0 immediately.** See [Migration Guide](#migration-guide) below.
> 
> All endpoints documented here will return deprecation headers and will be removed after the sunset date.

## 🚨 Important Migration Information

| Status | Date |
|--------|------|
| **Deprecation Announced** | January 15, 2024 |
| **Deprecation Active** | February 1, 2024 |
| **Sunset Date** | **July 20, 2024** |
| **Service Termination** | July 20, 2024 |

**Action Required:** Update your integrations to use [API v2.0](api-v2.md) before July 20, 2024.

## Table of Contents

- [Introduction](#introduction)
- [Deprecation Information](#deprecation-information)
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
- [Migration Guide](#migration-guide)
- [Support](#support)

## Introduction

The Pinarkive IPFS API Legacy Documentation covers the deprecated v1.x endpoints that are scheduled for removal. This documentation is maintained for existing integrations during the deprecation period.

### Base URL (Legacy)

```
https://api.pinarkive.com
```

### API Version

**1.x (Legacy - DEPRECATED)**

> ⚠️ **This version is deprecated.** Use [API v2.0](api-v2.md) for new integrations.

## Deprecation Information

### Deprecation Headers

All legacy endpoints now return the following headers:

```http
Deprecation: true
Sunset: 2024-07-20
Location: https://api.pinarkive.com/api/v2/<new-endpoint>
X-API-Migration-Guide: /docs/migration
```

### Timeline

- **February 1, 2024**: Deprecation period begins, headers added
- **July 20, 2024**: Legacy endpoints will be removed
- **After July 20, 2024**: All legacy endpoints will return 410 Gone

## Authentication

> ⚠️ **DEPRECATED**: These authentication methods are deprecated. Use [API v2.0 authentication](api-v2.md#authentication) instead.

The legacy API supports two authentication methods:

### 1. JWT Bearer Token Authentication

**Header Format:**
```
Authorization: Bearer <jwt-token>
```

### 2. API Key Authentication

**Header Format:**
```
X-API-Key: <api-key>
```

### Authentication Examples

**Legacy Login (DEPRECATED):**
```bash
curl -X POST https://api.pinarkive.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Migration to v2.0:**
```bash
curl -X POST https://api.pinarkive.com/api/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## API Endpoints

> ⚠️ **ALL ENDPOINTS BELOW ARE DEPRECATED**
> 
> Each endpoint will be removed on July 20, 2024. See the migration path for each endpoint.

### Authentication Endpoints

#### POST /auth/login ⚠️ DEPRECATED
**Migration Path:** Use `POST /api/v2/auth/login`

Authenticate user with email and password.

**Request Body:**
```json
{ "email": "user@example.com", "password": "password123" }
```
**Response (200):**
```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

#### POST /auth/signup ⚠️ DEPRECATED
**Migration Path:** Use `POST /api/v2/auth/signup`

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

#### POST /auth/logout ⚠️ DEPRECATED
**Migration Path:** Use `POST /api/v2/auth/logout`

Revoke the current authentication token.

### File Management

#### POST /file ⚠️ DEPRECATED
**Migration Path:** Use `POST /api/v2/files`

Upload a single file to IPFS.

**Content-Type:** `multipart/form-data`  
**Form Data:** `file`  
**Response (201):**
```json
{ "cid": "Qm...BdG", "size": 1024576 }
```

#### POST /file/directory ⚠️ DEPRECATED
**Migration Path:** Use `POST /api/v2/files/directory`

Upload a directory to IPFS (Beta).

#### POST /file/pin/{cid} ⚠️ DEPRECATED
**Migration Path:** Use `POST /api/v2/files/pin/{cid}`

Pin an existing CID to the cluster.

#### DELETE /file/remove/{cid} ⚠️ DEPRECATED
**Migration Path:** Use `DELETE /api/v2/files/remove/{cid}`

Remove a file from the cluster.

### User Profile

#### GET /me ⚠️ DEPRECATED
**Migration Path:** Use `GET /api/v2/users/me`

Get current user profile.

#### PUT /me ⚠️ DEPRECATED
**Migration Path:** Use `PUT /api/v2/users/me`

Update user profile.

#### GET /me/uploads ⚠️ DEPRECATED
**Migration Path:** Use `GET /api/v2/users/me/uploads`

List user uploads (paginated).

#### DELETE /me/uploads/{cid} ⚠️ DEPRECATED
**Migration Path:** Use `DELETE /api/v2/users/me/uploads/{cid}`

Delete a user's file.

#### GET /me/referrals ⚠️ DEPRECATED
**Migration Path:** Use `GET /api/v2/users/me/referrals`

Get referral information.

### Token Management

#### POST /api/tokens ⚠️ DEPRECATED
**Migration Path:** Use `POST /api/v2/tokens/generate`

Generate a new API token.

#### GET /api/tokens ⚠️ DEPRECATED
**Migration Path:** Use `GET /api/v2/tokens/list`

List user's API tokens.

#### DELETE /api/tokens/{name} ⚠️ DEPRECATED
**Migration Path:** Use `DELETE /api/v2/tokens/revoke/{name}`

Revoke a specific API token.

### Status and Monitoring

#### GET /status/{cid} ⚠️ DEPRECATED
**Migration Path:** Use `GET /api/v2/status/{cid}`

Get CID status and peer information.

#### GET /status/allocations/{cid} ⚠️ DEPRECATED
**Migration Path:** Use `GET /api/v2/status/allocations/{cid}`

Get CID allocation details.

## Data Schemas

The data schemas remain the same between legacy and v2.0 APIs. See [API v2.0 documentation](api-v2.md#data-schemas) for current schema definitions.

## Error Handling

Error handling remains consistent with v2.0. See [API v2.0 documentation](api-v2.md#error-handling) for current error formats.

## Examples

### Legacy Workflow (DEPRECATED)

> ⚠️ **Do not use these examples for new integrations.** See [API v2.0 examples](api-v2.md#examples) instead.

1. **Register (DEPRECATED)**
```bash
curl -X POST https://api.pinarkive.com/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","lastname":"Doe","email":"john@example.com","password":"securepassword","country":"US"}'
```

2. **Login (DEPRECATED)**
```bash
curl -X POST https://api.pinarkive.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepassword"}'
```

3. **Upload File (DEPRECATED)**
```bash
curl -X POST https://api.pinarkive.com/file \
  -H "Authorization: Bearer <token>" \
  -F "file=@document.pdf"
```

## Migration Guide

### 🚨 Immediate Action Required

**Deadline: July 20, 2024**

### Quick Migration Reference

| Legacy Endpoint (DEPRECATED) | New v2.0 Endpoint |
|------------------------------|-------------------|
| `POST /file` | `POST /api/v2/files` |
| `POST /file/directory` | `POST /api/v2/files/directory` |
| `POST /file/pin/{cid}` | `POST /api/v2/files/pin/{cid}` |
| `DELETE /file/remove/{cid}` | `DELETE /api/v2/files/remove/{cid}` |
| `POST /auth/login` | `POST /api/v2/auth/login` |
| `POST /auth/signup` | `POST /api/v2/auth/signup` |
| `POST /auth/logout` | `POST /api/v2/auth/logout` |
| `GET /me` | `GET /api/v2/users/me` |
| `PUT /me` | `PUT /api/v2/users/me` |
| `GET /me/uploads` | `GET /api/v2/users/me/uploads` |
| `DELETE /me/uploads/{cid}` | `DELETE /api/v2/users/me/uploads/{cid}` |
| `GET /me/referrals` | `GET /api/v2/users/me/referrals` |
| `GET /status/{cid}` | `GET /api/v2/status/{cid}` |
| `GET /status/allocations/{cid}` | `GET /api/v2/status/allocations/{cid}` |
| `POST /api/tokens` | `POST /api/v2/tokens/generate` |
| `GET /api/tokens` | `GET /api/v2/tokens/list` |
| `DELETE /api/tokens/{name}` | `DELETE /api/v2/tokens/revoke/{name}` |

### Migration Steps

1. **Update Base URL**
   ```javascript
   // Before (Legacy - DEPRECATED)
   const baseUrl = 'https://api.pinarkive.com';
   
   // After (v2.0)
   const baseUrl = 'https://api.pinarkive.com/api/v2';
   ```

2. **Update All Endpoint Calls**
   - Add `/api/v2` prefix to all endpoints
   - Update any hardcoded paths in your code
   - Test all integrations thoroughly

3. **SDK Migration**
   ```javascript
   // Legacy SDK configuration (DEPRECATED)
   const client = new PinarkiveSDK({
     apiKey: 'your-api-key',
     baseUrl: 'https://api.pinarkive.com'
   });

   // New v2.0 SDK configuration
   const client = new PinarkiveSDK({
     apiKey: 'your-api-key',
     baseUrl: 'https://api.pinarkive.com/api/v2'
   });
   ```

4. **Webhook Updates**
   ```javascript
   // Before (DEPRECATED)
   webhookUrl: 'https://api.pinarkive.com/webhook'

   // After (v2.0)
   webhookUrl: 'https://api.pinarkive.com/api/v2/payments/webhooks'
   ```

### Testing Your Migration

1. Update one endpoint at a time
2. Monitor deprecation headers in responses
3. Verify all functionality works with v2.0 endpoints
4. Remove any legacy endpoint usage
5. Test error handling with new endpoints

### Resources

- **[API v2.0 Documentation](api-v2.md)** - Complete v2.0 API reference
- **[OpenAPI v2.0 Specification](openapi-v2.yaml)** - Machine-readable API spec
- **[Migration Guide](MIGRATION_GUIDE.md)** - Detailed migration instructions
- **[SDK Documentation](https://github.com/pinarkive/sdk)** - Updated SDK examples

## Support

For migration assistance and support:

- **Migration Help**: [support@pinarkive.com](mailto:support@pinarkive.com)
- **Documentation**: [https://api.pinarkive.com/docs/v2](https://api.pinarkive.com/docs/v2)
- **API v2.0 Spec**: [https://api.pinarkive.com/docs/openapi-v2.yaml](https://api.pinarkive.com/docs/openapi-v2.yaml)
- **Legacy Spec**: [https://api.pinarkive.com/docs/openapi-legacy.yaml](https://api.pinarkive.com/docs/openapi-legacy.yaml)

---

> ⚠️ **Final Reminder**: This legacy API will be completely removed on **July 20, 2024**. 
> 
> **Migrate to [API v2.0](api-v2.md) immediately** to avoid service disruption.

*Last updated: June 2024*