# Dossier

> Duid aan welke vakken je volgt en vermeld voor deze vakken de link naar jouw GitHub repository. In het geval je slechts één vak volgt, verwijder alle inhoud omtrent het andere vak uit dit document.
> Lees <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet> om te weten hoe een Markdown-bestand opgemaakt moet worden.
> Verwijder alle instructies (lijnen die starten met >).

- Student: Vandeputte Gauthier 
- Studentennummer: 202397621
- E-mailadres: <mailto:gauthier.vandeputte@student.hogent.be>
- Demo: ([https://hogent.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=2ca8d023-a837-4677-a188-b24b00f8da64](https://hogent.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e0d4c9d6-a5be-4a36-8e65-b24c01655da8))
- GitHub-repository:([https://github.com/HOGENT-frontendweb/frontendweb-2425-GauthierVdp](https://github.com/GauthierVdp/frontendweb-2425-GauthierVdp-main.git))


## Projectbeschrijving

Als project heb ik een bibliotheek backend gemaakt waar je alle leden kan op zien, boeken, schrijvers en wie welke boeken heeft uigeleend op welke dag.

## API calls

### **Boeken**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/books           | Haal alle boeken op                |
| GET     | /api/books/:id       | Haal een boek op ID op             |
| POST    | /api/books           | Maak een nieuw boek aan            |
| PUT     | /api/books/:id       | Werk een boek bij                  |
| DELETE  | /api/books/:id       | Verwijder een boek                 |

---

### **Schrijvers**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/authors       | Haal alle schrijvers op            |
| GET     | /api/authors/:id   | Haal een schrijver op ID op        |
| POST    | /api/authors       | Maak een nieuwe schrijver aan      |
| PUT     | /api/authors/:id   | Werk een schrijver bij             |
| DELETE  | /api/authors/:id   | Verwijder een schrijver            |

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
| GET     | /api/members       | Haal alle gebruikers op            |
| GET     | /api/members/:id   | Haal een gebruiker op ID op        |
| POST    | /api/members       | Maak een nieuwe gebruiker aan      |
| PUT     | /api/members/:id   | Werk een gebruiker bij             |
| DELETE  | /api/members/:id   | Verwijder een gebruiker            |

---

### **Uitleentransacties**
| Methode | Endpoint             | Beschrijving                      |
|---------|----------------------|-----------------------------------|
| GET     | /api/borrowRecords | Haal alle uitleentransacties op  |
| GET     | /api/borrowRecords/:id | Haal een uitleentransactie op ID op |
| POST    | /api/borrowRecords | Maak een nieuwe uitleentransactie aan |
| PUT     | /api/borrowRecords/:id | Werk een uitleentransactie bij |
| DELETE  | /api/borrowRecords/:id | Verwijder een uitleentransactie |

### Gebruikers

- `GET /api/members`: alle gebruikers ophalen
- `GET /api/members/:id`: gebruiker met een bepaald id ophalen

## Behaalde minimumvereisten

### Web Services

#### Datalaag (in orde)
- [x] voldoende complex en correct meer dan één tabel (naast de user tabel), 
- [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
- [x] heeft migraties - indien van toepassing
- [x] heeft seeds
#### Repositorylaag

- [x] definieert één repository per entiteit - indien van toepassing
- [x] mapt OO-rijke data naar relationele tabellen en vice versa - indien van 
- [x] er worden kindrelaties opgevraagd (m.b.v. JOINs) - indien van toepassing

#### Servicelaag met een zekere complexiteit
- [x] bevat alle domeinlogica
- [x] er wordt gerelateerde data uit meerdere tabellen opgevraagd
- [x] bevat geen services voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [x] bevat geen SQL-queries of databank-gerelateerde code
#### REST-laag

- [x] meerdere routes met invoervalidatie
- [x] meerdere entiteiten met alle CRUD-operaties
- [x] degelijke foutboodschappen
- [x] volgt de conventies van een RESTful API
- [x] bevat geen domeinlogica
- [x] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [x] degelijke autorisatie/authenticatie op alle routes

#### Algemeen

- [x] er is een minimum aan logging en configuratie voorzien
- [x] een aantal niet-triviale én werkende integratietesten (min. 1 entiteit in REST-laag >= 90% coverage, naast de user testen)
- [x] node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- [x] minstens één extra technologie die we niet gezien hebben in de les
(testen gemaakt met macha)
- [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- [x] de applicatie start zonder problemen op gebruikmakend van de instructies in de README
- [x] de API draait online
- [x] duidelijke en volledige README.md
- [x] er werden voldoende (kleine) commits gemaakt
- [x] volledig en tijdig ingediend dossier

## Projectstructuur
### Web Services
Mijn projectsructuur is gebasseerd op de structuur de we gezien en geleerd hebben in de les


## Extra technologie
### Web Services
Ik heb als extra technologie, mijn testen geschreven via Macha die me duidelijk tonen waar de fouten gemaakt worden in welke crud operatie. ik heb eerst de testen geschreven met jest tot wanneer deze allemaal voldeden en de normen en dan de tsten herschreven via mocha.


## Gekende bugs
### Web Services
## Reflectie

> Wat vond je van dit project? Wat heb je geleerd? Wat zou je anders doen? Wat vond je goed? Wat vond je minder goed?
Ik vond dit project heel intrerresant over hoe een backend van een website nu eigenlijk in elkaar zit. Dit project heeft me veel meer bij geleerd en ook vooral door de zelfstudie gaf me veel inzicht over hoe alles moet.

> Wat zou je aanpassen aan de cursus? Wat zou je behouden? Wat zou je toevoegen?
Ik vond de curus een goede combinatie samen met de online opnames en zeer vlot te volgen en gemakkelijk om zelf toe te passen.
