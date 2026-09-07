# API d’administration — ICHH Yaoundé 2026

API REST (NestJS + PostgreSQL + TypeORM) qui pilote tout le contenu éditable du
site vitrine : textes, images, listes (panels, actualités, programme, intervenants,
frise Mahola…).

## Prérequis

- Node.js 20+
- Une base PostgreSQL (créez-la dans pgAdmin, ex. `ichh`)

> Pas de PostgreSQL sous la main ? `docker compose up -d` (voir `docker-compose.yml`)
> lance PostgreSQL **et** pgAdmin (http://localhost:5050).

## Installation

```bash
cd api
npm install
cp .env.example .env        # renseignez DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME, JWT_SECRET, ADMIN_*
```

## Démarrage

```bash
npm run start:dev           # http://localhost:3001/api  (Swagger : /api/docs)
```

Au premier démarrage, avec `DB_SYNCHRONIZE=true`, les tables sont créées
automatiquement et le compte administrateur (`ADMIN_EMAIL` / `ADMIN_PASSWORD`)
est ajouté.

## Charger le contenu initial

Reprend les données statiques actuelles du site (`../src/data/*`) :

```bash
npm run seed                # remplit les tables vides
npm run seed -- --force     # réinitialise tout le contenu
```

## Endpoints principaux

| Méthode | Route | Accès | Rôle |
|--------|-------|-------|------|
| `GET` | `/api/content` | public | contenu complet du site (consommé par la vitrine) |
| `GET` | `/api/content/schema` | public | registre des types de contenu et de leurs champs |
| `POST` | `/api/auth/login` | public | `{ email, password }` → `{ token, user }` |
| `GET` | `/api/auth/me` | JWT | profil courant |
| `GET/PUT` | `/api/admin/singletons/:key` | JWT | contenu à enregistrement unique (`event`, `maholaContact`…) |
| `GET/POST` | `/api/admin/collections/:key` | JWT | lister / créer un élément de liste |
| `PUT/DELETE` | `/api/admin/collections/:key/:id` | JWT | modifier / supprimer un élément |
| `PUT` | `/api/admin/collections/:key/reorder` | JWT | `{ ids: [...] }` réordonne |
| `GET/POST` | `/api/admin/media` | JWT | lister / téléverser une image (`multipart`, champ `file`) |
| `DELETE` | `/api/admin/media/:id` | JWT | supprimer un média |
| `GET` | `/uploads/*` | public | fichiers téléversés |

## Variables d’environnement

| Variable | Rôle |
|----------|------|
| `DB_HOST` `DB_PORT` `DB_USER` `DB_PASSWORD` `DB_NAME` | connexion PostgreSQL |
| `DB_SYNCHRONIZE` | `true` (dev) crée/synchronise les tables, `false` (prod) |
| `PORT` | port d’écoute de l’API (3001) |
| `PUBLIC_URL` | base des URL d’images téléversées |
| `CORS_ORIGINS` | origines autorisées, séparées par des virgules |
| `JWT_SECRET` `JWT_EXPIRES_IN` | signature des jetons |
| `ADMIN_EMAIL` `ADMIN_PASSWORD` `ADMIN_NAME` | compte créé au 1ᵉʳ démarrage / au seed |

## Modèle de données

- `singletons(key, data jsonb)` — objets uniques
- `content_entries(id, collection, position, data jsonb)` — listes ordonnées
- `media_assets(...)` — fichiers téléversés
- `admin_users(...)` — comptes du back-office

Le fichier `src/content/registry.ts` décrit chaque type de contenu (clé, libellé,
champs, validation). C’est le point unique à modifier pour ajouter un champ.

## Production

Mettez `DB_SYNCHRONIZE=false` et utilisez les migrations :

```bash
npm run migration:generate   # d'après les entités
npm run migration:run
npm run build && npm run start:prod
```
