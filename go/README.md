# Pinarkive Go SDK

Go client for the Pinarkive API.

## Installation

Copy `pinarkive_client.go` to your project.

Requires Go 1.16+.

## Usage

```go
package main

import (
	"fmt"
	"pinarkive"
)

func main() {
	client := pinarkive.NewPinarkiveClient("", "YOUR_API_KEY", "")
	resp, err := client.ListUploads(1, 10)
	if err != nil {
		panic(err)
	}
	fmt.Println(resp)
}
```

## Authentication
- JWT: first parameter of NewPinarkiveClient
- API Key: second parameter of NewPinarkiveClient

## Documentation
See [https://api.pinarkive.com/docs](https://api.pinarkive.com/docs) 