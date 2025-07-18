# Pinarkive Go SDK

Cliente Go para la API de Pinarkive.

## Instalación

Copia `pinarkive_client.go` a tu proyecto.

Requiere Go 1.16+.

## Uso

```go
package main

import (
	"fmt"
	"pinarkive"
)

func main() {
	client := pinarkive.NewPinarkiveClient("", "TU_API_KEY", "")
	resp, err := client.ListUploads(1, 10)
	if err != nil {
		panic(err)
	}
	fmt.Println(resp)
}
```

## Autenticación
- JWT: primer parámetro de NewPinarkiveClient
- API Key: segundo parámetro de NewPinarkiveClient

## Documentación
Consulta [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 