# Pinarkive SDK Migration Guide: v1.0.0 → v2.0.0

> 🚨 **URGENT: Migration Required by July 20, 2024**
>
> The legacy API v1.x will be completely removed on **July 20, 2024**. All SDKs must be updated to v2.0.0 to continue functioning.

## Table of Contents

- [Overview](#overview)
- [Breaking Changes](#breaking-changes)
- [SDK-Specific Migration Instructions](#sdk-specific-migration-instructions)
- [Repository Tagging Strategy](#repository-tagging-strategy)
- [Version Management](#version-management)
- [Testing Recommendations](#testing-recommendations)
- [Timeline and Deprecation Notices](#timeline-and-deprecation-notices)
- [Support](#support)

## Overview

The Pinarkive SDK v2.0.0 represents a major update that migrates from the deprecated legacy API v1.x to the new stable API v2.0. This migration is **mandatory** due to the upcoming sunset of legacy endpoints.

### What's Changing

- **Base URL**: Updated from `https://api.pinarkive.com` to `https://api.pinarkive.com/api/v2`
- **Endpoint Paths**: All endpoints now use the v2.0 structure with improved naming conventions
- **Token Management**: Standardized token endpoint paths
- **Version**: All SDK packages bumped from 1.0.0 to 2.0.0

### Why Migrate

1. **Service Continuity**: Legacy API will be removed on July 20, 2024
2. **Improved Performance**: v2.0 API offers better performance and reliability
3. **Enhanced Features**: Access to new v2.0 features and improvements
4. **Future Support**: All new features will only be available in v2.0

## Breaking Changes

### Base URL Change

```diff
- https://api.pinarkive.com
+ https://api.pinarkive.com/api/v2
```

### Endpoint Mapping

| Legacy Endpoint (v1.x) | New Endpoint (v2.0) | Status |
|------------------------|---------------------|---------|
| `POST /file` | `POST /api/v2/files` | ⚠️ DEPRECATED |
| `POST /file/directory` | `POST /api/v2/files/directory` | ⚠️ DEPRECATED |
| `POST /file/pin/{cid}` | `POST /api/v2/files/pin/{cid}` | ⚠️ DEPRECATED |
| `DELETE /file/remove/{cid}` | `DELETE /api/v2/files/remove/{cid}` | ⚠️ DEPRECATED |
| `POST /auth/login` | `POST /api/v2/auth/login` | ⚠️ DEPRECATED |
| `POST /auth/signup` | `POST /api/v2/auth/signup` | ⚠️ DEPRECATED |
| `POST /auth/logout` | `POST /api/v2/auth/logout` | ⚠️ DEPRECATED |
| `GET /me` | `GET /api/v2/users/me` | ⚠️ DEPRECATED |
| `PUT /me` | `PUT /api/v2/users/me` | ⚠️ DEPRECATED |
| `GET /me/uploads` | `GET /api/v2/users/me/uploads` | ⚠️ DEPRECATED |
| `DELETE /me/uploads/{cid}` | `DELETE /api/v2/users/me/uploads/{cid}` | ⚠️ DEPRECATED |
| `GET /me/referrals` | `GET /api/v2/users/me/referrals` | ⚠️ DEPRECATED |
| `POST /api/tokens/generate` | `POST /api/v2/tokens/generate` | ⚠️ DEPRECATED |
| `GET /api/tokens/list` | `GET /api/v2/tokens/list` | ⚠️ DEPRECATED |
| `DELETE /api/tokens/revoke/{name}` | `DELETE /api/v2/tokens/revoke/{name}` | ⚠️ DEPRECATED |
| `GET /status/{cid}` | `GET /api/v2/status/{cid}` | ⚠️ DEPRECATED |
| `GET /status/allocations/{cid}` | `GET /api/v2/status/allocations/{cid}` | ⚠️ DEPRECATED |

### Method Signature Changes

All method signatures remain the same - only the underlying API endpoints have changed. This ensures minimal code changes for end users.

## SDK-Specific Migration Instructions

### JavaScript SDK

#### Installation

```bash
# Uninstall old version
npm uninstall pinarkive-sdk

# Install new version
npm install pinarkive-sdk@2.0.0
```

#### Code Changes

```javascript
// Before (v1.0.0)
const PinarkiveSDK = require('pinarkive-sdk');
const client = new PinarkiveSDK({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.pinarkive.com'  // Legacy base URL
});

// After (v2.0.0)
const PinarkiveSDK = require('pinarkive-sdk');
const client = new PinarkiveSDK({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.pinarkive.com/api/v2'  // New base URL
});

// All method calls remain the same
const result = await client.uploadFile(file);
const profile = await client.getUserProfile();
```

#### Package.json Update

```json
{
  "dependencies": {
    "pinarkive-sdk": "^2.0.0"
  }
}
```

### TypeScript SDK

#### Installation

```bash
# Uninstall old version
npm uninstall @pinarkive/sdk-typescript

# Install new version
npm install @pinarkive/sdk-typescript@2.0.0
```

#### Code Changes

```typescript
// Before (v1.0.0)
import { PinarkiveClient } from '@pinarkive/sdk-typescript';

const client = new PinarkiveClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.pinarkive.com'  // Legacy base URL
});

// After (v2.0.0)
import { PinarkiveClient } from '@pinarkive/sdk-typescript';

const client = new PinarkiveClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.pinarkive.com/api/v2'  // New base URL
});

// All method calls and types remain the same
const result: UploadResponse = await client.uploadFile(file);
const profile: UserProfile = await client.getUserProfile();
```

### Python SDK

#### Installation

```bash
# Uninstall old version
pip uninstall pinarkive-client

# Install new version
pip install pinarkive-client==2.0.0
```

#### Code Changes

```python
# Before (v1.0.0)
from pinarkive_client import PinarkiveClient

client = PinarkiveClient(
    api_key='your-api-key',
    base_url='https://api.pinarkive.com'  # Legacy base URL
)

# After (v2.0.0)
from pinarkive_client import PinarkiveClient

client = PinarkiveClient(
    api_key='your-api-key',
    base_url='https://api.pinarkive.com/api/v2'  # New base URL
)

# All method calls remain the same
result = client.upload_file(file_path)
profile = client.get_user_profile()
```

#### Requirements.txt Update

```txt
pinarkive-client==2.0.0
```

### PHP SDK

#### Installation

```bash
# Update composer.json
composer require pinarkive/sdk:^2.0.0
```

#### Code Changes

```php
<?php
// Before (v1.0.0)
use Pinarkive\PinarkiveClient;

$client = new PinarkiveClient([
    'api_key' => 'your-api-key',
    'base_url' => 'https://api.pinarkive.com'  // Legacy base URL
]);

// After (v2.0.0)
use Pinarkive\PinarkiveClient;

$client = new PinarkiveClient([
    'api_key' => 'your-api-key',
    'base_url' => 'https://api.pinarkive.com/api/v2'  // New base URL
]);

// All method calls remain the same
$result = $client->uploadFile($filePath);
$profile = $client->getUserProfile();
?>
```

#### Composer.json Update

```json
{
  "require": {
    "pinarkive/sdk": "^2.0.0"
  }
}
```

### Go SDK

#### Installation

```bash
# Update go.mod to use v2
go get github.com/pinarkive/pinarkive-sdk/go/v2@v2.0.0
```

#### Code Changes

```go
// Before (v1.0.0)
import "github.com/pinarkive/pinarkive-sdk/go"

client := pinarkive.NewClient(&pinarkive.Config{
    APIKey:  "your-api-key",
    BaseURL: "https://api.pinarkive.com",  // Legacy base URL
})

// After (v2.0.0)
import "github.com/pinarkive/pinarkive-sdk/go/v2"

client := pinarkive.NewClient(&pinarkive.Config{
    APIKey:  "your-api-key",
    BaseURL: "https://api.pinarkive.com/api/v2",  // New base URL
})

// All method calls remain the same
result, err := client.UploadFile(filePath)
profile, err := client.GetUserProfile()
```

#### Go.mod Update

```go
module your-project

go 1.22

require (
    github.com/pinarkive/pinarkive-sdk/go/v2 v2.0.0
)
```

## Repository Tagging Strategy

### 1. Tag v1.0.0 as Deprecated

```bash
# Create deprecation tag for v1.0.0
git tag -a v1.0.0-deprecated -m "DEPRECATED: Use v2.0.0 instead. Legacy API sunset: July 20, 2024"
git push origin v1.0.0-deprecated

# Update README with deprecation notice
echo "⚠️ DEPRECATED: This version uses legacy API. Migrate to v2.0.0 immediately." >> README.md
git commit -am "Mark v1.0.0 as deprecated"
```

### 2. Release v2.0.0 with New API Endpoints

```bash
# Create and push v2.0.0 release
git tag -a v2.0.0 -m "Release v2.0.0: Migration to API v2.0 endpoints"
git push origin v2.0.0

# Create release branch for maintenance
git checkout -b release/v2.0.0
git push origin release/v2.0.0
```

### 3. Publish Packages to Repositories

#### NPM (JavaScript/TypeScript)

```bash
# JavaScript SDK
cd javascript/
npm version 2.0.0
npm publish

# TypeScript SDK  
cd ../typescript/
npm version 2.0.0
npm publish
```

#### PyPI (Python)

```bash
cd python/
python setup.py sdist bdist_wheel
twine upload dist/*
```

#### Packagist (PHP)

```bash
cd php/
# Update composer.json version to 2.0.0
git tag v2.0.0
git push origin v2.0.0
# Packagist will auto-update from GitHub tags
```

#### Go Modules

```bash
cd go/
# Tag with v2 prefix for Go modules
git tag go/v2.0.0
git push origin go/v2.0.0
```

## Version Management

### Maintaining Both Versions During Transition

#### Branch Strategy

```bash
# Main development on v2.0.0
git checkout main

# Maintain v1.0.0 for critical fixes only
git checkout -b maintenance/v1.0.0
git push origin maintenance/v1.0.0
```

#### Package Distribution

- **v1.0.0**: Mark as deprecated in package managers
- **v2.0.0**: Set as latest/stable version
- **Documentation**: Update all docs to reference v2.0.0

#### Deprecation Notices

Add to all v1.0.0 package descriptions:

```
⚠️ DEPRECATED: This version uses legacy API endpoints that will be removed on July 20, 2024. 
Please upgrade to v2.0.0 immediately: https://github.com/pinarkive/pinarkive-sdk/blob/main/MIGRATE.md
```

### Package Manager Configuration

#### NPM

```json
{
  "version": "2.0.0",
  "deprecated": false,
  "engines": {
    "node": ">=14.0.0"
  }
}
```

#### PyPI

```python
setup(
    name="pinarkive-client",
    version="2.0.0",
    description="Pinarkive IPFS SDK v2.0 - API v2.0 endpoints",
    long_description="Updated SDK for Pinarkive API v2.0. Replaces deprecated v1.0.0.",
)
```

## Testing Recommendations

### 1. Pre-Migration Testing

```bash
# Test current v1.0.0 functionality
npm test  # or equivalent for your language

# Verify all endpoints are working
curl -H "X-API-Key: your-key" https://api.pinarkive.com/me
```

### 2. Migration Testing

```bash
# Install v2.0.0 SDK
npm install pinarkive-sdk@2.0.0

# Test basic functionality
node test-migration.js
```

#### Test Script Example (JavaScript)

```javascript
// test-migration.js
const PinarkiveSDK = require('pinarkive-sdk');

async function testMigration() {
  const client = new PinarkiveSDK({
    apiKey: process.env.PINARKIVE_API_KEY,
    baseUrl: 'https://api.pinarkive.com/api/v2'
  });

  try {
    // Test authentication
    const profile = await client.getUserProfile();
    console.log('✅ User profile retrieved:', profile.email);

    // Test file operations
    const uploads = await client.listUploads();
    console.log('✅ Uploads listed:', uploads.length, 'files');

    // Test token management
    const tokens = await client.listTokens();
    console.log('✅ Tokens listed:', tokens.length, 'tokens');

    console.log('🎉 Migration test successful!');
  } catch (error) {
    console.error('❌ Migration test failed:', error.message);
    process.exit(1);
  }
}

testMigration();
```

### 3. Production Validation

1. **Gradual Rollout**: Deploy to staging environment first
2. **Monitor Logs**: Check for any API errors or deprecation warnings
3. **Performance Testing**: Verify response times are acceptable
4. **Error Handling**: Test error scenarios with v2.0 endpoints

### 4. Automated Testing

```yaml
# .github/workflows/test-migration.yml
name: Test SDK Migration
on: [push, pull_request]

jobs:
  test-migration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Test v2.0.0 endpoints
        run: npm run test:migration
        env:
          PINARKIVE_API_KEY: ${{ secrets.PINARKIVE_API_KEY }}
```

## Timeline and Deprecation Notices

### Critical Dates

| Date | Milestone | Action Required |
|------|-----------|----------------|
| **January 15, 2024** | Deprecation Announced | Plan migration |
| **February 1, 2024** | Deprecation Active | Begin migration |
| **June 1, 2024** | ⚠️ 50 Days Remaining | Complete migration |
| **July 1, 2024** | ⚠️ 20 Days Remaining | Final testing |
| **July 15, 2024** | ⚠️ 5 Days Remaining | Emergency migration |
| **July 20, 2024** | 🚨 **SUNSET DATE** | **Legacy API removed** |

### Deprecation Headers

All legacy API responses now include:

```http
Deprecation: true
Sunset: 2024-07-20
Location: https://api.pinarkive.com/api/v2/<new-endpoint>
X-API-Migration-Guide: https://github.com/pinarkive/pinarkive-sdk/blob/main/MIGRATE.md
```

### Communication Plan

1. **Email Notifications**: Sent to all registered developers
2. **Dashboard Warnings**: Displayed in user dashboard
3. **SDK Warnings**: Console warnings in v1.0.0 SDKs
4. **Documentation Updates**: All docs updated with migration notices

### Post-Sunset Behavior

After July 20, 2024:
- All legacy endpoints will return `410 Gone`
- v1.0.0 SDKs will stop functioning
- Only v2.0.0 SDKs will work

## Support

### Migration Assistance

- **Email Support**: [support@pinarkive.com](mailto:support@pinarkive.com)
- **Migration Issues**: [GitHub Issues](https://github.com/pinarkive/pinarkive-sdk/issues)
- **Documentation**: [API v2.0 Docs](https://api.pinarkive.com/docs/v2)

### Resources

- **[API v2.0 Documentation](api-v2.md)** - Complete v2.0 API reference
- **[Legacy API Documentation](legacy-api.md)** - Legacy endpoint reference
- **[OpenAPI v2.0 Specification](https://api.pinarkive.com/docs/openapi-v2.yaml)** - Machine-readable API spec
- **[SDK Examples](https://github.com/pinarkive/pinarkive-sdk/tree/main/examples)** - Updated code examples

### Emergency Migration Support

If you need urgent assistance migrating before the July 20, 2024 deadline:

1. **Priority Support**: Email [urgent-migration@pinarkive.com](mailto:urgent-migration@pinarkive.com)
2. **Live Chat**: Available during business hours
3. **Screen Sharing**: Available for complex migrations

---

> 🚨 **Final Reminder**: Legacy API v1.x will be completely removed on **July 20, 2024**.
> 
> **Migrate to SDK v2.0.0 immediately** to avoid service disruption.
> 
> **Need Help?** Contact [support@pinarkive.com](mailto:support@pinarkive.com)

*Last updated: June 2024*