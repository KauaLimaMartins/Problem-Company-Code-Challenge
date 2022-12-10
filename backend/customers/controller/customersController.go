package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pc/test-project-backend/customers/model"
	"pc/test-project-backend/customers/utils"
	"pc/test-project-backend/database"
	"strings"

	"github.com/gorilla/mux"
	"github.com/jackc/pgconn"
	"golang.org/x/crypto/bcrypt"
)

func Home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "HOME PAGE")
}

func GetAllCustomers(w http.ResponseWriter, r *http.Request) {
	var allCustomers []model.Customer
	var err error

	result := database.DB.Find(&allCustomers)

	if result.Error != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to get all customers. %s", result.Error.Error()))
	}

	err = json.NewEncoder(w).Encode(allCustomers)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to encode json response. %s", err.Error()))
	}
}

func GetCustomerById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var err error

	customer, queryErr := utils.FindCustomerById(w, id)

	// Here i verify if query failed
	if queryErr != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to find customer. %s", queryErr.Error()))
	}

	// Here i verify if customer exists, because it doesn't return an error if it doesn't exist
	// only return an empty customer with ID = 0
	if customer.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode("Customer doesn't exist")

		return
	}

	err = json.NewEncoder(w).Encode(customer)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to encode json response. %s", err.Error()))
	}
}

func CreateCustomer(w http.ResponseWriter, r *http.Request) {
	var newCustomer model.Customer
	var err error

	err = json.NewDecoder(r.Body).Decode(&newCustomer)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to decode json request body. %s", err.Error()))
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(newCustomer.Password), bcrypt.DefaultCost)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to hash password. %s", err.Error()))
	}

	newCustomer.Password = string(bytes)

	result := database.DB.Create(&newCustomer)

	if result.Error != nil {
		if strings.Contains(result.Error.(*pgconn.PgError).Message, "duplicate key value violates unique constraint") {
			w.WriteHeader(http.StatusConflict)
		} else {
			w.WriteHeader(http.StatusConflict)
		}
		fmt.Println(fmt.Errorf("failed to create customer. %s", result.Error.Error()))
	}

	err = json.NewEncoder(w).Encode(newCustomer)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to encode json response. %s", err.Error()))
	}
}

func EditCustomer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var err error

	customer, err := utils.FindCustomerById(w, id)

	// Here i verify if query failed
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to find customer. %s", err.Error()))
	}

	// Here i verify if customer exists, because it doesn't return an error if it doesn't exist
	// only return an empty customer with ID = 0
	if customer.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode("Customer doesn't exist")

		return
	}

	err = json.NewDecoder(r.Body).Decode(&customer)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to decode json request body. %s", err.Error()))
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(customer.Password), bcrypt.DefaultCost)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to hash password. %s", err.Error()))
	}

	customer.Password = string(bytes)

	result := database.DB.Save(&customer)

	if result.Error != nil {
		if strings.Contains(result.Error.(*pgconn.PgError).Message, "duplicate key value violates unique constraint") {
			w.WriteHeader(http.StatusConflict)
		} else {
			w.WriteHeader(http.StatusConflict)
		}
		fmt.Println(fmt.Errorf("failed to edit customer. %s", result.Error.Error()))
	}

	err = json.NewEncoder(w).Encode(customer)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to encode json response. %s", err.Error()))
	}
}

type DeleteDto struct {
	CustomersIds []int
}

func DeleteCustomers(w http.ResponseWriter, r *http.Request) {
	var err error

	var body DeleteDto

	err = json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to get customers ids. %s", err.Error()))
	}

	result := database.DB.Delete(&model.Customer{}, body.CustomersIds)

	if result.Error != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(fmt.Errorf("failed to delete customers. %s", result.Error.Error()))
	}
}
