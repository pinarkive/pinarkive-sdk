# Pinarkive SDKs - Repository Migration Notice

> **⚠️ IMPORTANT: This repository has been archived and split into individual language-specific repositories.**

## 🚀 New Repository Structure

Starting with version 2.3.1, each SDK is now maintained in its own dedicated repository for better package management, cleaner downloads, and independent versioning.

### 📦 Individual SDK Repositories

| Language | Repository | Package Manager | Installation |
|----------|------------|-----------------|--------------|
| **JavaScript** | [pinarkive-sdk-js](https://github.com/pinarkive/pinarkive-sdk-js) | npm | `npm install @pinarkive/pinarkive-sdk-js` |
| **TypeScript** | [pinarkive-sdk-ts](https://github.com/pinarkive/pinarkive-sdk-ts) | npm | `npm install @pinarkive/pinarkive-sdk-ts` |
| **Python** | [pinarkive-sdk-py](https://github.com/pinarkive/pinarkive-sdk-py) | pip | `pip install pinarkive-sdk-py` |
| **PHP** | [pinarkive-sdk-php](https://github.com/pinarkive/pinarkive-sdk-php) | Composer | `composer require pinarkive/pinarkive-sdk-php` |
| **Go** | [pinarkive-sdk-go](https://github.com/pinarkive/pinarkive-sdk-go) | go get | `go get github.com/pinarkive/pinarkive-sdk-go` |

## 🔄 Migration Benefits

- **Cleaner Downloads**: Users only download the specific SDK they need
- **Independent Versioning**: Each SDK can be versioned independently  
- **Better CI/CD**: Separate build and deployment pipelines
- **Focused Documentation**: Language-specific documentation and examples
- **Easier Maintenance**: Smaller, focused codebases

## 📋 Quick Installation

```bash
# JavaScript
npm install @pinarkive/pinarkive-sdk-js

# TypeScript  
npm install @pinarkive/pinarkive-sdk-ts

# Python
pip install pinarkive-sdk-py

# PHP
composer require pinarkive/pinarkive-sdk-php

# Go
go get github.com/pinarkive/pinarkive-sdk-go
```

## 🆕 What's New in v2.3.1

All SDKs now support:
- **Directory DAG Uploads**: Upload entire directory structures as DAG
- **File Renaming**: Rename uploaded files with custom names
- **Enhanced API Key Management**: Create, list, and revoke API keys with permissions
- **Improved Error Handling**: Better error messages and status codes
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## 🔗 Quick Start Examples

### JavaScript/TypeScript
```javascript
const PinarkiveClient = require('@pinarkive/pinarkive-sdk-js');
// or import { PinarkiveClient } from '@pinarkive/pinarkive-sdk-ts';

const client = new PinarkiveClient({ apiKey: 'your-api-key' });
const result = await client.uploadFile(file);
console.log('File uploaded:', result.data.cid);
```

### Python
```python
from pinarkive_client import PinarkiveClient

client = PinarkiveClient(api_key="your-api-key")
result = client.upload_file("document.pdf")
print(f"File uploaded: {result.json()['cid']}")
```

### PHP
```php
$client = new PinarkiveClient(null, 'your-api-key');
$result = $client->uploadFile('document.pdf');
$response = json_decode($result->getBody(), true);
echo "File uploaded: " . $response['cid'];
```

### Go
```go
import "github.com/pinarkive/pinarkive-sdk-go"

client := pinarkive.NewPinarkiveClient("", "your-api-key", "")
resp, err := client.UploadFile("document.pdf")
// Handle response...
```

## 📚 Documentation

- **API Documentation**: [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs)
- **Support**: [https://pinarkive.com/docs.php](https://pinarkive.com/docs.php)

## 🆘 Support

For issues or questions:
- **JavaScript/TypeScript**: [pinarkive-sdk-js issues](https://github.com/pinarkive/pinarkive-sdk-js/issues) | [pinarkive-sdk-ts issues](https://github.com/pinarkive/pinarkive-sdk-ts/issues)
- **Python**: [pinarkive-sdk-py issues](https://github.com/pinarkive/pinarkive-sdk-py/issues)
- **PHP**: [pinarkive-sdk-php issues](https://github.com/pinarkive/pinarkive-sdk-php/issues)
- **Go**: [pinarkive-sdk-go issues](https://github.com/pinarkive/pinarkive-sdk-go/issues)

## 📜 License

All SDKs are licensed under the MIT License.

---

**Note**: This repository is archived. Please use the individual language-specific repositories listed above for the latest versions and updates.