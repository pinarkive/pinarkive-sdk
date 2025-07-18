# Pinarkive Python SDK

Cliente Python para la API de Pinarkive.

## Instalación

```
pip install requests
```

Copia `pinarkive_client.py` a tu proyecto o instala desde tu repositorio si lo publicas.

## Uso

```python
from pinarkive_client import PinarkiveClient

client = PinarkiveClient(api_key='TU_API_KEY')

# Subir un archivo
client.upload_file('document.pdf')

# Listar archivos
client.list_uploads()
```

## Autenticación
- JWT: `token='...'`
- API Key: `api_key='...'`

## Documentación
Consulta [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 