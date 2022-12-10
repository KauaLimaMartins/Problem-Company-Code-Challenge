# Backend Test Problem Company

In this readme you'll see:
- [How to set up](#how-to-set-up)
- [How to run the API](#how-to-run-the-api)
  - [In docker desktop](#in-docker-desktop)
  - [On the terminal](#on-the-terminal)
- [Commands to call the API](#commands-to-call-the-api)

---
## How to set up

First you'll need to create the database, open a terminal inside the project and:

- Run: ``` docker-compose up ```

when it finishes and is running the database and pgadmin, open another terminal inside the project and:

- Run: ``` docker build -t pc/test-project-backend . ```
- After it finhes, run: ``` docker run -e DB_HOST=host.docker.internal -e DB_USER=postgres -e DB_PASS=postgres -e DB_NAME=postgres -p 8000:8000 --network test --name backend pc/test-project-backend ```
  - It should display a log saying: "Go server started..."

don't close any terminal

---
## How to run the API

### In docker desktop
Open docker desktop and follow the following steps:

![docker desktop](https://github.com/KauaLimaMartins/problem-company-backend-test/blob/master/readme-assets/docker-desktop-prtsc-1.png)

![docker desktop](https://github.com/KauaLimaMartins/problem-company-backend-test/blob/master/readme-assets/docker-desktop-prtsc-2.png)

In this terminal you can use curl to call the api
### On the terminal

Open a new terminal and:

- Run: ``` docker exec -it backend /bin/sh ```

It will open the same terminal as docker desktop and you can use curl to call the api.

---
## Commands to call the API

Create a new customer:
```bash
curl -X POST http://localhost:8000/customers -H "Content-type: application/json" -d '{ "firstName": "alex", "lastName": "ferreira", "email": "alex@problem.com", "password": "teste"}'
```

Show all registred customers
```bash
curl -X GET http://localhost:8000/customers
```

Show a customer based on their ID
```bash
curl -X GET http://localhost:8000/customers/1
```

Update a customer based on their ID
```bash
curl -X PUT http://localhost:8000/customers/1 -H "Content-type: application/json" -d '{ "firstName": "Kaua", "lastName": "Lima", "email": "kaua@problem.com", "password": "teste"}'
```

---