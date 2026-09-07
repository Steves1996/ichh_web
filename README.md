# ICHH Yaoundé 2026

Monorepo du site vitrine de la Conférence Internationale sur la Santé Humanitaire
(ICHH Yaoundé 2026) et de son back-office.

| Dossier | Rôle | Stack | Port dev |
|---------|------|-------|----------|
| `/` (`src/`) | Site vitrine public | React + Vite + Tailwind | 5173 |
| `api/` | API d’administration + base de données | NestJS + PostgreSQL + TypeORM | 3001 |
| `admin/` | Back-office (édition du contenu) | React + Vite | 5174 |

## Comment ça marche

- Le **contenu** (textes, images, listes : panels, actualités, programme,
  intervenants, frise Mahola…) est stocké en base PostgreSQL et servi par l’API
  sur `GET /api/content`.
- Le **site vitrine** récupère ce contenu au chargement (React Query). Si l’API
  est absente (`VITE_API_URL` vide) ou indisponible, il utilise les données
  statiques livrées dans `src/data/` — le site fonctionne donc toujours.
- Le **back-office** (`admin/`) permet de modifier chaque bloc de contenu et de
  téléverser des images. Les changements sont visibles immédiatement sur la
  vitrine (au rechargement).

## Démarrage complet (développement)

### 1. Base de données

Créez une base PostgreSQL (par ex. via **pgAdmin**), nommée `ichh`.

### 2. API

```bash
cd api
npm install
cp .env.example .env          # renseignez DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME, JWT_SECRET, ADMIN_*
npm run start:dev             # crée les tables + le compte admin + charge le contenu si la base est vide
```

> Le contenu de référence (`api/src/seed/snapshot.json`) est chargé
> automatiquement au 1ᵉʳ démarrage sur une base vide. `npm run seed -- --force`
> le recharge à tout moment.

API : http://localhost:3001/api — documentation Swagger : http://localhost:3001/api/docs

### 3. Back-office

```bash
cd admin
npm install
cp .env.example .env          # VITE_API_URL=http://localhost:3001
npm run dev                   # http://localhost:5174
```

Connectez-vous avec `ADMIN_EMAIL` / `ADMIN_PASSWORD` (définis dans `api/.env`).

### 4. Site vitrine

```bash
npm install
cp .env.example .env          # VITE_API_URL=http://localhost:3001
npm run dev                   # http://localhost:5173
```

## Sans back-office

Laissez `VITE_API_URL` vide (ou ne créez pas de `.env`) : le site utilise
uniquement le contenu de `src/data/` et se déploie comme un site statique.

## Détails

- API et modèle de données : [`api/README.md`](api/README.md)
- Back-office : [`admin/README.md`](admin/README.md)
- Le fichier `api/src/content/registry.ts` décrit chaque bloc de contenu éditable
  (clé, libellé, champs). C’est le point unique à modifier pour ajouter un champ.
