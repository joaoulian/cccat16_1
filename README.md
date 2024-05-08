Taxi service project with educational purpose developed during the 16 class - Clean Architecture course from Rodrigo Branas

## Requirements

- nvm
- node (20.9.0)
- yarn
- postgres
- docker

## Setup

- Apply node version

```
nvm use
```

- Install the packages

```
yarn install
```

## Run the tests

- Initialize docker-compose containing the database (Postgres)

```
docker-compose up -d
```

- Initialize the server (listening port 3000)

```
npm run start:dev
```

- Run all the tests

```
npm run test
```

- Killing the processes

```
docker-compose down
kill $(lsof -t -i:3000) // ou apenas encerre o nodemon
```
