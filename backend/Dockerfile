FROM golang:1.19.3

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY *.go ./
COPY . ./

RUN go build -o pc/test-project-backend

EXPOSE 8000

CMD ["pc/test-project-backend"]