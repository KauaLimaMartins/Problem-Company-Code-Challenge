package main

import (
	"fmt"

	"pc/test-project-backend/database"
	"pc/test-project-backend/routes"
)

func main() {
	database.ConnectWithDatabase()

	fmt.Println("Go server started...")
	routes.HandleRequest()
}
