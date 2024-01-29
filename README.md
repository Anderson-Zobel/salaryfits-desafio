# Desafio Full stack SalaryFits
Desafio Full stack para a SalaryFits

### Requisitos:
 - Node.js (v14.x ou superior)
 - npm (v6.x ou superior)
 - 
## Backend
### Acesse a pasta /backend para executar os comandos

### Instale as dependênciuas:
```
npm install
```

```
npx prisma init --studio
```

### Gerando o Prisma Client
```
npx prisma generate
```

### Rode as migrations
```
npx prisma migrate dev
```

### Rode o backend dentro da pasta
Mantenha ele em um terminal rodando, necessário para utilizar o front-end
```
npm run dev
```

### Prisma Studio - Banco de Dados
Caso queira acessar o banco de dados pelo Prisma Studio
```
npx prisma studio
```

### Prisma Studio - Banco de Dados
Para rodar a cobertura de testes
```
npm run coverage
```

## Front-end
### Acesse a pasta /backend para executar os comandos

### Instale as dependênciuas:
```
npm install
```

### Npm run dev
Para rodar a aplicação e fazer os devidos testes, como lembrando, mantenha o back-end ativo
```
npm run dev
```

### Npm run build
Para fazer a build e ver que não há erros no TypeScript
```
npm run dev
```

