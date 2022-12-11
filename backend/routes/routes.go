package routes

import (
	"log"
	"net/http"

	"pc/test-project-backend/customers/controller"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func HandleRequest() {
	r := mux.NewRouter()

	r.HandleFunc("/", controller.Home).Methods("GET")
	r.HandleFunc("/customers", controller.GetAllCustomers).Methods("GET")
	r.HandleFunc("/customers", controller.DeleteCustomers).Methods("DELETE")
	r.HandleFunc("/customers/{id}", controller.GetCustomerById).Methods("GET")
	r.HandleFunc("/customers", controller.CreateCustomer).Methods("POST")
	r.HandleFunc("/customers/{id}", controller.EditCustomer).Methods("PUT")

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Origin", "Accept"})

	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})

	origins := handlers.AllowedOrigins([]string{"http://localhost:3000", "http://problem-site:3000"})

	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(headers, methods, origins)(r)))
}
