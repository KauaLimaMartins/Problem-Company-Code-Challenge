package database

import (
	"fmt"
	"log"
	"os"
	"pc/test-project-backend/customers/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectWithDatabase() {
	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=5432", dbHost, dbUser, dbPass, dbName)

	var err error

	DB, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		log.Panic("Failed to open connection to database. ", err.Error())
	}

	migrateDbErr := DB.AutoMigrate(&model.Customer{})

	if migrateDbErr != nil {
		log.Panic("Failed to migrate database. ", migrateDbErr.Error())
	}
}
