# Pinarkive Python SDK

Python client for the Pinarkive API.

## Installation

```
pip install requests
```

Copy `pinarkive_client.py` to your project or install from your repository if you publish it.

## Usage

```python
from pinarkive_client import PinarkiveClient

client = PinarkiveClient(api_key='YOUR_API_KEY')

# Upload a file
client.upload_file('document.pdf')

# List files
client.list_uploads()
```

## Authentication
- JWT: `token='...'`
- API Key: `api_key='...'`

## Documentation
See [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 