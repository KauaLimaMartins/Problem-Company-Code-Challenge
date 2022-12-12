# Problem Company Code Challenge

In this readme you'll see:
- [How to set up and run](#how-to-set-up-and-run)
- [Backend infos](#backend-infos)
  - [Commands to call the API](#commands-to-call-the-api)
- [Frontend infos](#frontend-infos)

---
# How to set up and run

- First of all, clone this respository:
```zsh
git clone https://github.com/KauaLimaMartins/Problem-Company-Code-Challenge.git
```

- Now, you need to create a new network bridge called "problem-net"
```zsh
docker network create -d bridge problem-net
```

- Open a terminal in the project directory and run:
```zsh
docker compose up
```
Note: If you see a "failed to connect to the database" error message, probably the server tried to start before the database completly run, so do not worry, because it will run again to connect correctly after database successfully starts.

- After it ends, open in your browser the frontend URL:
```
http://localhost:3000
```

Now you can use the project without problems!

---
# Backend Infos

This API was developed using [Golang](https://go.dev), [GORM](https://gorm.io), [Gorilla Mux](https://github.com/gorilla/mux) and [Gorilla Handlers](https://github.com/gorilla/handlers)

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

# Frontend infos

This website was developed using [React.js](https://pt-br.reactjs.org) with [Next.js](https://nextjs.org) and [Material UI](https://mui.com)

I used SSR (Server side rendering) to get registered customers from Next.js and Axios to call the api
