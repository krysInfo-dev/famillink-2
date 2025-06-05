# Plan de Mise en Place Détaillé de l'Outillage du Projet Famillink

Ce document détaille la configuration et la mise en place de l'outillage nécessaire pour le développement, le test, et le déploiement du projet Famillink. Il s'appuie sur l'analyse d'architecture et le plan de développement préalablement définis.

## 1. Gestion des Sources et Collaboration

*   **Système de Contrôle de Version :**
    *   **Outil :** Git
    *   **Action :** Initialiser un dépôt Git à la racine du projet (ou des dépôts séparés si une approche multi-repo est choisie pour le backend, le frontend web, et le mobile).
    *   **Convention :** Adopter un flux de travail Git (ex: Gitflow simplifié avec `main`, `develop`, `feature/xxx`, `fix/xxx`, `release/xxx`).
*   **Hébergement des Dépôts :**
    *   **Outil :** GitHub
    *   **Action :** Créer le(s) dépôt(s) privé(s) sur GitHub. Configurer les droits d'accès pour les membres de l'équipe.
    *   **Intégration :** Utiliser les fonctionnalités de GitHub (Issues pour le suivi des tâches, Pull Requests pour la revue de code, Projects pour la gestion de projet agile).

## 2. Environnement de Développement Intégré (IDE)

*   **Outil :** Visual Studio Code (VS Code)
*   **Configuration :**
    *   **Fichier `.vscode/settings.json` :** Partager des configurations de base (ex: formateur par défaut, indentation).
    *   **Fichier `.vscode/extensions.json` :** Recommander des extensions VS Code pour assurer la cohérence de l'environnement de développement au sein de l'équipe. Extensions suggérées :
        *   `dbaeumer.vscode-eslint` (pour ESLint)
        *   `esbenp.prettier-vscode` (pour Prettier)
        *   `EditorConfig.EditorConfig` (pour la cohérence des styles de codage)
        *   `Angular.ng-template` (pour Angular)
        *   `firsttris.vscode-jest-runner` (pour lancer les tests Jest)
        *   `ms-azuretools.vscode-docker` (pour l'intégration Docker)
        *   `GitHub.copilot` (si utilisé par l'équipe, Kilo Code étant déjà présent)
        *   `pflannery.vscode-versionlens` (pour visualiser les versions des paquets)
        *   `bierner.markdown-mermaid` (pour visualiser les diagrammes Mermaid dans les fichiers .md)

## 3. Gestionnaire de Paquets

*   **Outil :** PNPM
*   **Action :**
    *   S'assurer que tous les développeurs ont PNPM installé globalement.
    *   Utiliser PNPM pour toutes les opérations de gestion de dépendances (`pnpm install`, `pnpm add`, `pnpm remove`).
    *   Initialiser un `package.json` à la racine si une gestion de scripts centralisée ou un workspace PNPM est envisagé.
    *   Créer un fichier `.npmrc` à la racine avec `shamefully-hoist=true` si nécessaire pour certains paquets ayant des problèmes avec la structure de `node_modules` de PNPM, ou `auto-install-peers=true`.

## 4. Qualité du Code : Linting et Formatage

*   **Linters :**
    *   **Outil :** ESLint
    *   **Configuration :**
        *   Configurer ESLint pour TypeScript, NestJS (backend) et Angular (frontend web).
        *   Utiliser des configurations recommandées (ex: `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:prettier/recommended`).
        *   Ajouter des plugins spécifiques si besoin (ex: `eslint-plugin-jest`, `eslint-plugin-angular`).
*   **Formateur :**
    *   **Outil :** Prettier
    *   **Configuration :**
        *   Configurer Prettier avec un fichier `.prettierrc.json` ou `.prettierrc.js` pour définir les règles de formatage.
        *   Intégrer Prettier avec ESLint (`eslint-config-prettier`, `eslint-plugin-prettier`) pour éviter les conflits.
*   **Hooks Git :**
    *   **Outil :** Husky (ou `simple-git-hooks`) et `lint-staged`
    *   **Action :** Configurer des hooks pre-commit pour exécuter automatiquement ESLint et Prettier sur les fichiers modifiés avant chaque commit, garantissant ainsi la propreté du code poussé.

## 5. Outillage Spécifique aux Technologies

*   **Backend (NestJS) :**
    *   **CLI :** NestJS CLI (`@nestjs/cli`) pour la génération de modules, services, contrôleurs, etc.
    *   **Tests :** Jest (configuré par défaut avec NestJS).
    *   **Documentation API :** Swagger/OpenAPI via `@nestjs/swagger`, généré automatiquement à partir du code.
    *   **ORM :** TypeORM CLI pour la gestion des migrations de base de données (`typeorm migration:generate`, `typeorm migration:run`).
*   **Application Web d'Administration (Angular) :**
    *   **CLI :** Angular CLI (`@angular/cli`) pour la génération de composants, services, modules, builds, etc.
    *   **Tests :** Karma et Jasmine (configurés par défaut), Protractor/Cypress pour les tests E2E.
    *   **Gestion d'état (si NgRx) :** Schematics NgRx pour la génération des actions, reducers, effects.
*   **Application Mobile (Capacitor) :**
    *   **CLI :** Capacitor CLI (`@capacitor/cli`) pour l'initialisation, l'ajout de plateformes (iOS, Android), la synchronisation, et l'ouverture des projets natifs.
    *   **CLI du Framework Web sous-jacent :** (ex: Angular CLI, Vue CLI, Create React App) pour le développement de la partie web de l'application mobile.
    *   **IDE Natifs :** Xcode (pour iOS), Android Studio (pour Android) pour la compilation, le débogage spécifique à la plateforme et la gestion des plugins natifs.

## 6. Conteneurisation

*   **Outils :** Docker, Docker Compose
*   **Actions :**
    *   **Dockerfiles :** Créer des `Dockerfile` optimisés pour chaque service (Backend NestJS, Frontend Angular).
        *   Utiliser des builds multi-étapes pour réduire la taille des images finales.
        *   Gérer les variables d'environnement.
    *   **Docker Compose (`docker-compose.yml`) :** Définir l'environnement de développement local avec tous les services (backend, frontend, base de données MariaDB, etc.).
        *   Configurer les volumes pour le hot-reloading.
        *   Gérer les réseaux internes.
    *   **`.dockerignore` :** Exclure les fichiers et dossiers inutiles du contexte de build Docker.

## 7. Intégration Continue et Déploiement Continu (CI/CD)

*   **Outil :** GitHub Actions
*   **Workflows à mettre en place :**
    *   **Workflow de CI :**
        *   Déclenché sur les push vers `develop` et les Pull Requests vers `develop`/`main`.
        *   Étapes : Checkout du code, installation des dépendances (avec PNPM et cache), linting, formatage (check), exécution des tests unitaires et d'intégration, build des applications.
    *   **Workflow de CD (Staging/Pré-production) :**
        *   Déclenché sur les merge vers `develop` (ou une branche `staging`).
        *   Étapes : Build des images Docker, push des images vers un registre de conteneurs (ex: GitHub Container Registry, Docker Hub).
        *   Déploiement sur l'environnement de Staging (VPS avec Docker Swarm).
    *   **Workflow de CD (Production) :**
        *   Déclenché manuellement ou sur les merge/tags sur `main` (ou une branche `release`).
        *   Étapes similaires au CD Staging, mais ciblant l'environnement de production.
        *   Inclure des étapes de notification.

## 8. Orchestration et Déploiement (VPS)

*   **Outils :** Docker Swarm, Traefik
*   **Configuration sur le VPS :**
    *   Installation de Docker.
    *   Initialisation du Swarm Docker.
    *   Déploiement de Traefik comme service Swarm, configuré comme reverse proxy, avec gestion automatique des certificats SSL via Let's Encrypt.
    *   Définition des services Swarm pour le backend, le frontend, et la base de données (avec persistance des données pour MariaDB).
    *   Gestion des secrets pour les informations sensibles (clés API, mots de passe BDD).

## 9. Monitoring et Logging

*   **Outils :** Grafana, Prometheus (pour la collecte de métriques), Loki (pour les logs - optionnel)
*   **Configuration :**
    *   Déployer Grafana et Prometheus comme services Docker Swarm.
    *   Configurer Prometheus pour scraper les métriques des applications (via des exporters ou des endpoints `/metrics` si disponibles) et de l'infrastructure (cAdvisor, Node Exporter).
    *   Créer des dashboards Grafana pour visualiser les métriques clés (utilisation CPU/RAM, temps de réponse API, taux d'erreur, état de la base de données).
    *   Centraliser les logs des conteneurs (via le driver de logging Docker vers un système comme Loki, ou ELK stack si besoin plus avancé).

## 10. Base de Données

*   **Outil :** MariaDB
*   **Gestion :**
    *   Utilisation de TypeORM pour les migrations de schéma.
    *   Stratégie de sauvegarde régulière de la base de données (ex: script cron sur le VPS, service de sauvegarde managé).

Ce plan d'outillage servira de guide pour la mise en place progressive de l'environnement technique du projet Famillink.