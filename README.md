# Desafio Full stack SalaryFits

![salaryFits](https://github.com/Anderson-Zobel/salaryfits-desafio/assets/87586643/b8c6196a-c268-4bba-88ae-2c940f0ecf2f)

### Ferramentas utilizadas:

<div style="display: inline_block" align="left"><br>
   <img align="center" alt="TS" width="45"  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />&nbsp;&nbsp;
   <img align="center" alt="NODEJS" width="45"  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />&nbsp;&nbsp;
   <img align="center" alt="SQlite" width="45"   src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" />&nbsp;&nbsp;
   <img align="center" alt="PRISMA" width="45"   src="https://cdn.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_.png" />&nbsp;&nbsp;
   <img align="center" alt="JEST" width="45"      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"  />&nbsp;&nbsp;
   <img align="center" alt="REACT" width="45"   src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />&nbsp;&nbsp;
   <img align="center" alt="VITE" width="45"   src="https://www.svgrepo.com/show/374167/vite.svg" />&nbsp;&nbsp;
   <img align="center" alt="MUI" width="45"   src="https://cdn.worldvectorlogo.com/logos/material-ui-1.svg" />&nbsp;&nbsp;
   <img align="center" alt="HTML" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />&nbsp;&nbsp;
   <img align="center" alt="CSS" width="45"  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />&nbsp;&nbsp;
 </div>
 
## Instruções
<a href="https://youtu.be/HSXkzJf8FOc" target="_blank" style="text-decoration: none">
 <img 
  align="center" 
  alt="YOUTUBE" 
  width="45" 
  src="https://www.svgrepo.com/show/13671/youtube.svg"
  />
 &nbsp; Instruções em vídeo
</a>



### Legendas, comando importante para rodar o projeto:
#### 🟢 === Essencial para o funcionamneto
#### 🔵 === Não essencial para o funcionamento


### Requisitos:
 - Node.js (v14.x ou superior)
 - npm (v6.x ou superior)

## Copiando o repositório
### 🟢 Copie a url SSH

![image](https://github.com/Anderson-Zobel/salaryfits-desafio/assets/87586643/be084f61-f8b4-4487-be71-61130deb98c1)

### 🟢 Abra o terminal onde preferir, digite:
 ```
git clone git@github.com:Anderson-Zobel/salaryfits-desafio.git 
 ```
![image](https://github.com/Anderson-Zobel/salaryfits-desafio/assets/87586643/7da3cefe-ccf5-4efa-a845-e7b2501d65d0)

Aguarde e o projeto estará no seu dispositivo



## Backend
### 🟢 Acesse a pasta /backend para executar os comandos

### 🟢 Instale as dependências:
```
npm install
```

```
npx prisma init --studio
```

### 🟢 Gerando o Prisma Client
```
npx prisma generate
```

### 🟢 Rode as migrations
```
npx prisma migrate dev
```

### 🟢 Rode o backend dentro da pasta
Mantenha ele em um terminal rodando, necessário para utilizar a aplicação
```
npm run dev
```

### 🔵 Prisma Studio - Banco de Dados
Caso queira acessar o banco de dados pelo Prisma Studio
```
npx prisma studio
```

### 🔵 Testes com Jest
Para rodar a cobertura de testes
```
npm run test:coverage
```
```
npm run test
```

## Front-end
### 🟢 Acesse a pasta /frontend para executar os comandos

### 🟢 Instale as dependências:
```
npm install
```

### 🟢 Iniciar o Front-end
Para rodar a aplicação e fazer os devidos testes, como lembrando, mantenha o back-end ativo
```
npm run dev
```

### 🔵 Buildar a aplicação
Para fazer a build e ver que não há erros no TypeScript
```
npm run build
```

