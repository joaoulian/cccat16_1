Este conteúdo é parte do curso Clean Code e Clean Architecture da Branas.io
Para mais informações acesse:
https://branas.io

## Rodar os testes

- Inicie o docker-compose contendo o banco de dados (Postgres)

```
docker-compose up -d
```

- Inicie a aplicação (o servidor irá rodar na porta 3000)

```
npm run start:dev
```

- Rode os testes

```
npm run test
```

- Encerrando os processos

```
docker-compose down
kill $(lsof -t -i:3000) // ou apenas encerre o nodemon
```
