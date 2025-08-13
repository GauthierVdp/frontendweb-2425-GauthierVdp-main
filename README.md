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

### **Opstarten**
Volg de onderstaande stappen om de server te starten:

1. **Navigeer naar de projectmap**
   ```sh
   \frontendweb-2425-GauthierVdp\bibliotheek-api
   ```

2. **Installeer de afhankelijkheden**
   ```sh
   yarn install
   ```

3. **Bouw het project**
   ```sh
   yarn build
   ```

4. **Start de server**
   ```sh
   yarn start:dev
   ```

---

### **Database**

1. **Maak de database aan met migraties**
   ```sh
   yarn prisma:migrate
   ```

2. **Vul de database met seeders**
   ```sh
   yarn prisma:seed
   ```

---

### **.env bestand**
Maak een bestand genaamd `.env` in de hoofdmap van het project met de volgende inhoud:

```
NODE_ENV=development
PORT=3000
AUTH_JWT_SECRET=17f6d029a7f0c980c0633b7c90358e49ca74481c4ef44006ea570505c751ea2c64454b3dfe654891df64a198a407aa42a56eb70f657a8d7d471b703753203077
JWT_SECRET=17f6d029a7f0c980c0633b7c90358e49ca74481c4ef44006ea570505c751ea2c64454b3dfe654891df64a198a407aa42a56eb70f657a8d7d471b703753203077
JWT_AUDIENCE=http://localhost:3000
AUTH_JWT_EXPIRES_IN=1h
DB_USER=397621gv
DB_PASSWORD=EVlsUhhdV9CHgDyDYWERWKUMHdOZZGMt
DB_NAME=397621gv
DB_HOST=vichogent.be
DB_PORT=40043
DATABASE_URL="mysql://397621gv:EVlsUhhdV9CHgDyDYWERWKUMHdOZZGMt@vichogent.be:40043/397621gv"
PRISMA_MIGRATE_SKIP_GENERATE=true
PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK=1
```

**Vervang** de waarden door de juiste waarden voor jouw omgeving.

---

## **Testen**
Om de tests uit te voeren, gebruik het volgende commando:

```sh
yarn test
```

De testresultaten zullen worden weergegeven in de console.

---

## **API Endpoints**

---

### **Boeken**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/boeken           | Haal alle boeken op                |
| GET     | /api/boeken/:id       | Haal een boek op ID op             |
| POST    | /api/boeken           | Maak een nieuw boek aan            |
| PUT     | /api/boeken/:id       | Werk een boek bij                  |
| DELETE  | /api/boeken/:id       | Verwijder een boek                 |

---

### **Schrijvers**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/schrijvers       | Haal alle schrijvers op            |
| GET     | /api/schrijvers/:id   | Haal een schrijver op ID op        |
| POST    | /api/schrijvers       | Maak een nieuwe schrijver aan      |
| PUT     | /api/schrijvers/:id   | Werk een schrijver bij             |
| DELETE  | /api/schrijvers/:id   | Verwijder een schrijver            |

---

### **Genres**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/genres           | Haal alle genres op                |
| GET     | /api/genres/:id       | Haal een genre op ID op            |
| POST    | /api/genres           | Maak een nieuw genre aan           |
| PUT     | /api/genres/:id       | Werk een genre bij                 |
| DELETE  | /api/genres/:id       | Verwijder een genre                |

---

### **Gebruikers**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/gebruikers       | Haal alle gebruikers op            |
| GET     | /api/gebruikers/:id   | Haal een gebruiker op ID op        |
| POST    | /api/gebruikers       | Maak een nieuwe gebruiker aan      |
| PUT     | /api/gebruikers/:id   | Werk een gebruiker bij             |
| DELETE  | /api/gebruikers/:id   | Verwijder een gebruiker            |

---

### **Uitleentransacties**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/uitleentransacties | Haal alle uitleentransacties op  |
| GET     | /api/uitleentransacties/:id | Haal een uitleentransactie op ID op |
| POST    | /api/uitleentransacties | Maak een nieuwe uitleentransactie aan |
| PUT     | /api/uitleentransacties/:id | Werk een uitleentransactie bij |
| DELETE  | /api/uitleentransacties/:id | Verwijder een uitleentransactie |


---

## **Opmerkingen**
- Zorg ervoor dat je `JWT_SECRET` in het `.env` bestand voldoende complex is om veilige authenticatie te garanderen.
- Controleer of MySQL correct is geïnstalleerd en dat de database toegankelijk is met de gebruikersnaam, wachtwoord en andere instellingen die in het `.env` bestand zijn gespecificeerd.
- Bij problemen met de migraties of seeders, controleer of de databaseverbinding correct is.

---

Met deze handleiding kan je de backend van de **Drone Fleet API** correct instellen, opstarten en testen. Als er vragen zijn, neem contact op via [gauthier.vandeputte@student.hogent.be](mailto:gauthier.vandeputte@student.hogent.be).

