# Examenopdracht Front-end Web Development & Web Services

## Studentgegevens
- **Student:** Gauthier Vandeputte  
- **Studentennummer:** 202397621  
- **E-mailadres:** [gauthier.vandeputte@student.hogent.be](mailto:gauthier.vandeputte@student.hogent.be)  

---

## Vereisten
Voor het correct functioneren van dit project is de volgende software vereist:

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

Zorg ervoor dat bovenstaande software correct is geïnstalleerd voordat je begint met de installatie van het project.

---

## Back-end

## Features

- REST API voor boeken, auteurs, genres, leden, uitleningen
- JWT-authenticatie
- Prisma ORM (MySQL)
- Volledig getypeerd met TypeScript
- Swagger-documentatie

## Vereisten

- Node.js 18+
- Yarn 4+
- MySQL database

## Installatie

1. **Clone de repository**
	```sh
	git clone <repo-url>
	cd bibliotheek-api
	```

2. **Installeer dependencies**
	```sh
	corepack enable
	yarn install
	```

3. **Configureer je `.env` bestand**

	Maak een `.env` aan in de root met o.a.:
	```
	NODE_ENV=development
	PORT=9000
	DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database>
	AUTH_JWT_SECRET=<een-lang-en-random-secret>
	```

4. **Database migreren en seed data**
	```sh
	yarn prisma migrate dev
	yarn prisma generate
	yarn prisma:seed
	```

## Development

Start de server in development mode (met hot reload):

```sh
yarn start:dev
```

De API draait standaard op [http://localhost:9000](http://localhost:9000).

## Testen

Voer de tests uit met:

```sh
yarn test
```

## Linting

```sh
yarn lint
```

## Build

```sh
yarn build
```

## Deployment (Render)

1. **Zet de volgende environment variables in Render:**
	- `DATABASE_URL`
	- `AUTH_JWT_SECRET`
	- (optioneel: `PORT`, Render zal deze zelf instellen)

2. **Build command in Render:**
	```
	yarn install && yarn prisma generate && yarn build
	```

3. **Start command in Render:**
	```
	node build/index.js
	```

## Swagger API Docs

Na het starten van de server:  
[http://localhost:9000/api-docs](http://localhost:9000/api-docs)

## Project structuur

- `src/` — Broncode (API, services, types, ...)
- `config/` — Configuratie per omgeving
- `test/` — Testbestanden
- `prisma/schema.prisma` — Database schema

## Veelgestelde problemen

- **PrismaClientInitializationError: Environment variable not found: DATABASE_URL**  
  → Zet de juiste `DATABASE_URL` als environment variable in Render.

- **TypeScript type errors met Mocha/Jest**  
  → Zorg dat je niet tegelijk `@types/mocha` en `@types/jest` gebruikt.

---

