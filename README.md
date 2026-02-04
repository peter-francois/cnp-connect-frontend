# CNP-Connect-Frontend

## 📌 Présentation du projet

CNP-Connect est une application web interne destinée aux entreprises de transport en commun.  
Ce dépôt contient le frontend de l'application. 
L’interface utilisateur est construite avec React et TypeScript, outillée par Vite pour le développement et le build, et mise en forme avec Tailwind CSS.

---

## 🔁 Origine du dépôt & DevOps

Ce dépôt est un miroir du dépôt GitLab d’origine du projet CNP-Connect. Il reflète donc l’état du code développé initialement sur GitLab.

🐳 Conteneurisation

Un Dockerfile est présent pour conteneuriser le frontend.

⚙️ Nginx (image légère)

Une configuration Nginx est également fournie et pensée pour fonctionner conjointement avec le Dockerfile.

Elle permet de servir le build du frontend via un serveur Nginx minimal, afin d’obtenir une image Docker plus légère et performante.

🚀 CI/CD (GitLab)

Le projet intègre une pipeline GitLab CI/CD (.gitlab-ci.yml) permettant le build automatique de l’application et son déploiement dans un container registry (GitLab).

---

## 🏗️ Architecture Frontend

L’application suit une architecture modulaire basée sur :

* **Pages** (`/pages`) : représentent les vues principales de l’application.
* **Composants** (`/components`) : éléments UI réutilisables (ex : `PrimaryButton`, `PopUp`).
* **Layouts** (`/layouts`) : structures communes pour certains groupes de pages (ex : `DisconnectedLayout`).
* **Router** : gestion centralisée de la navigation via React Router.
* **Services & Hooks** : isolation de la logique métier et des appels API (ex : `useUserService`).
* **Guards** : protection des routes en fonction de l’authentification et des rôles.

---

## 🛠️ Stack technique

| Outil                     | Usage                        |
| ------------------------- | ---------------------------- |
| **React**                 | Interface utilisateur        |
| **TypeScript**            | Typage statique              |
| **Vite**                  | Build et dev server          |
| **Tailwind CSS**          | Styles                       |
| **Axios**                 | Client HTTP                  |
| **TanStack Query**        | Gestion du cache et fetching |
| **React Hook Form + Zod** | Validation des formulaires   |

---

## 🔐 Sécurité côté Frontend

### Authentification & Tokens

* **Access Token** : stocké dans `localStorage` et envoyé automatiquement via Axios.
* **Refresh Token** : stocké dans un cookie sécurisé (`httpOnly`).
* HTTPS obligatoire en production.

### Validation des formulaires

Les formulaires utilisent **React Hook Form + Zod** pour valider les données avant envoi au backend.

### Route Guards

Des guards empêchent l’accès à certaines pages selon :

* l’état de connexion,
* le rôle de l’utilisateur (ex : pages réservées aux **Superviseurs**).


---

## 🌐 Accès aux données (API)

Un client Axios centralisé (`axiosClient`) :

* ajoute automatiquement le token d’authentification,
* gère le refresh token,
* interprète les codes HTTP et redirige si nécessaire.

---

## 📁 Structure du projet (simplifiée)

```
src/
│── components/
│   ├── ui/        # Composants génériques (PrimaryButton, etc.)
│   └── features/  # Composants métier (User, Header, etc.)
│
│── pages/         # Pages de l’application
│
│── layouts/       # Layouts (ex: DisconnectedLayout)
│
│── router/        # Configuration des routes
│
│── api/           # Appels API
│
│── hooks/         # Hooks personnalisés (ex: useUserService)
│
│── guards/        # Protection des routes
│
│── utils/
│   └── axiosClient.ts

```

---

## 🚀 Lancer le projet en local

```bash
npm install
npm run dev
```

Puis ouvrir : [http://localhost:5173](http://localhost:5173)

## 🧪 Tests E2E (Cypress)

Le projet contient une suite de tests End-to-End avec **Cypress**, permettant de tester les parcours utilisateurs principaux directement dans le navigateur.
Les tests sont situés dans le dossier `cypress/`.

Pour lancer les tests :
```bash
npm run cy:open
```
