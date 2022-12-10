package utils

import (
	"net/http"
	"pc/test-project-backend/customers/model"
	"pc/test-project-backend/database"
)

func FindCustomerById(w http.ResponseWriter, id string) (model.Customer, error) {
	var customer model.Customer

	err := database.DB.Find(&customer, id)

	return customer, err.Error
}
