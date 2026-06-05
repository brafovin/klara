# WM 2026 Fan Shop / FIFA World Cup 2026 Fan Shop

Ein vollstaendiger E-Commerce-Shop fuer WM 2026 Fanartikel, gebaut mit Next.js 14, Express und MongoDB.

A complete e-commerce shop for FIFA World Cup 2026 merchandise, built with Next.js 14, Express, and MongoDB.

---

## Technologie-Stack / Technology Stack

| Bereich / Layer | Technologie |
|-----------------|-------------|
| Frontend        | Next.js 14, TypeScript, Tailwind CSS |
| Backend         | Node.js, Express.js |
| Datenbank / DB  | MongoDB (Mongoose) |
| Authentifizierung / Auth | JWT |
| Zahlung / Payment | Stripe, PayPal |
| Container       | Docker, Docker Compose |

---

## Voraussetzungen / Prerequisites

- Node.js >= 18
- npm >= 9
- Docker & Docker Compose (fuer containerisierte Ausfuehrung / for containerized execution)
- MongoDB (lokal oder Atlas / local or Atlas)

---

## Installation (Lokal / Local)

### 1. Repository klonen / Clone repository

```bash
git clone <repository-url>
cd klara
```

### 2. Abhaengigkeiten installieren / Install dependencies

```bash
npm run install:all
```

### 3. Umgebungsvariablen konfigurieren / Configure environment variables

```bash
# Backend
cp backend/.env.example backend/.env
# Werte in backend/.env anpassen / Edit values in backend/.env
```

### 4. Entwicklungsserver starten / Start development server

```bash
npm run dev
```

- Frontend laeuft auf / Frontend runs at: http://localhost:3000
- Backend laeuft auf / Backend runs at: http://localhost:5000

### 5. Datenbank befuellen (optional) / Seed database (optional)

```bash
cd backend && npm run seed
```

---

## Docker-Installation / Docker Installation

### 1. Umgebungsvariablen setzen / Set environment variables

Bearbeite die `docker-compose.yml` und ersetze alle Platzhalter-Werte (z.B. `your-stripe-secret-key`) durch echte Werte.

Edit `docker-compose.yml` and replace all placeholder values (e.g. `your-stripe-secret-key`) with real values.

### 2. Container bauen und starten / Build and start containers

```bash
docker-compose up --build
```

### 3. Im Hintergrund ausfuehren / Run in background

```bash
docker-compose up -d --build
```

### 4. Container stoppen / Stop containers

```bash
docker-compose down
```

### 5. Container stoppen und Volumes loeschen / Stop containers and remove volumes

```bash
docker-compose down -v
```

---

## Projektstruktur / Project Structure

```
klara/
├── frontend/               # Next.js 14 App
│   ├── src/
│   │   ├── app/            # App Router Seiten / Pages
│   │   ├── components/     # Wiederverwendbare Komponenten / Reusable components
│   │   ├── lib/            # Hilfsfunktionen / Utility functions
│   │   └── types/          # TypeScript Typen / TypeScript types
│   ├── public/             # Statische Dateien / Static files
│   ├── Dockerfile
│   └── package.json
│
├── backend/                # Express API
│   ├── src/
│   │   ├── controllers/    # Route Handler
│   │   ├── models/         # Mongoose Modelle / Models
│   │   ├── routes/         # API Routen / Routes
│   │   ├── middleware/      # Express Middleware
│   │   ├── seeds/          # Datenbank-Seeds / Database seeds
│   │   └── server.js       # Einstiegspunkt / Entry point
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

## API-Endpunkte / API Endpoints

| Method | Endpunkt / Endpoint       | Beschreibung / Description         |
|--------|---------------------------|------------------------------------|
| POST   | /api/auth/register        | Benutzer registrieren / Register   |
| POST   | /api/auth/login           | Anmelden / Login                   |
| GET    | /api/products             | Alle Produkte / All products       |
| GET    | /api/products/:id         | Einzelnes Produkt / Single product |
| POST   | /api/orders               | Bestellung aufgeben / Place order  |
| GET    | /api/orders/:id           | Bestellung abrufen / Get order     |
| POST   | /api/payments/stripe      | Stripe-Zahlung / Stripe payment    |
| POST   | /api/payments/paypal      | PayPal-Zahlung / PayPal payment    |

---

## Umgebungsvariablen / Environment Variables

### Backend (`backend/.env`)

| Variable               | Beschreibung / Description                       |
|------------------------|--------------------------------------------------|
| `NODE_ENV`             | Umgebung: development / production               |
| `PORT`                 | Server-Port (Standard: 5000)                     |
| `MONGODB_URI`          | MongoDB-Verbindungsstring / Connection string     |
| `JWT_SECRET`           | Geheimer Schluessel fuer JWT / JWT secret key    |
| `JWT_EXPIRE`           | JWT-Ablaufzeit / JWT expiry (z.B. 30d)           |
| `STRIPE_SECRET_KEY`    | Stripe geheimer API-Schluessel / Secret API key  |
| `PAYPAL_CLIENT_ID`     | PayPal Client ID                                 |
| `PAYPAL_CLIENT_SECRET` | PayPal Client Secret                             |
| `EMAIL_HOST`           | SMTP-Host fuer E-Mails / SMTP host for emails    |
| `EMAIL_PORT`           | SMTP-Port                                        |
| `EMAIL_USER`           | SMTP-Benutzername / SMTP username                |
| `EMAIL_PASS`           | SMTP-Passwort / SMTP password                    |
| `FRONTEND_URL`         | URL des Frontends / Frontend URL                 |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary Cloud Name (Bild-Upload / Image upload)|
| `CLOUDINARY_API_KEY`   | Cloudinary API Key                               |
| `CLOUDINARY_API_SECRET`| Cloudinary API Secret                            |

### Frontend (`frontend/.env.local`)

| Variable                          | Beschreibung / Description              |
|-----------------------------------|-----------------------------------------|
| `NEXT_PUBLIC_API_URL`             | Backend API URL                         |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe oeffentlicher Schluessel / Public key |

---

## Sicherheitshinweise / Security Notes

**Deutsch:**
- Aendere alle Standard-Passwörter und Geheimnisse vor dem Produktionseinsatz.
- Verwende starke, zufaellig generierte Werte fuer `JWT_SECRET`.
- Aktiviere HTTPS in der Produktionsumgebung.
- Gib niemals `.env`-Dateien in die Versionskontrolle ein.

**English:**
- Change all default passwords and secrets before deploying to production.
- Use strong, randomly generated values for `JWT_SECRET`.
- Enable HTTPS in the production environment.
- Never commit `.env` files to version control.

---

## Lizenz / License

MIT License - siehe / see LICENSE file.
