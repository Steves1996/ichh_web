# Back-office — ICHH Yaoundé 2026

Interface d’administration du contenu du site vitrine. React + Vite, consomme
l’API NestJS (`../api`).

## Installation

```bash
cd admin
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:3001
npm run dev              # http://localhost:5174
```

Connexion : e-mail / mot de passe définis par `ADMIN_EMAIL` / `ADMIN_PASSWORD`
dans `api/.env`.

## Fonctionnalités

- **Tableau de bord** : tous les blocs de contenu, groupés (Conférence, Programme,
  Intervenants, Mahola).
- **Blocs uniques** (`event`, `maholaContact`, présidence, pied de page…) :
  formulaire d’édition généré automatiquement d’après le registre de l’API.
- **Listes** (panels, actualités, sessions, intervenants, frise, galerie…) :
  ajout, modification, suppression et réordonnancement (`↑` / `↓`).
- **Médiathèque** : téléversement d’images (glisser dans un champ « image » ou
  copier l’URL), suppression.
- Les champs et leur type (texte, zone de texte, nombre, case à cocher, liste de
  valeurs, image, JSON…) proviennent de `GET /api/content/schema` — donc ajouter
  un champ côté API l’ajoute automatiquement ici.

## Build

```bash
npm run build            # dist/ statique — servir derrière le même domaine que l'API de préférence
```

## Notes

- Le jeton JWT est conservé dans `localStorage`. Toute réponse `401` renvoie à
  l’écran de connexion.
- Les URL d’images renvoyées par l’API sont absolues (`PUBLIC_URL` de l’API) :
  vérifiez que `PUBLIC_URL` est correct en production.
