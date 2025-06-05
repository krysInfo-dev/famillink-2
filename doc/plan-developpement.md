# Plan de Développement du Projet Famillink

Ce document décrit les macro-tâches pour le développement du projet Famillink.

## Phase 1 : Initialisation et Fondations du Projet

1.  **Configuration de l'Environnement de Développement :**
    *   Mise en place de PNPM comme gestionnaire de paquets.
    *   Configuration de VS Code (linters, formatters, extensions recommandées).
    *   Création du monorepo (si pertinent) ou des dépôts GitHub distincts pour le backend, l'application web et l'application mobile.
    *   Mise en place des conventions de codage et de nommage.

2.  **Initialisation du Backend (NestJS) :**
    *   Génération du projet NestJS.
    *   Configuration de TypeORM et connexion à MariaDB (en local/dev).
    *   Mise en place du module d'authentification (JWT) de base (enregistrement simple, connexion).
    *   Définition des premières entités (Utilisateur, Membre) et de leurs relations.
    *   Configuration de la documentation API (Swagger/OpenAPI).

3.  **Initialisation de l'Application Web d'Administration (Angular) :**
    *   Génération du projet Angular.
    *   Mise en place de la structure de base (modules, routing initial).
    *   Configuration de la communication avec le backend (service HTTP, gestion des JWT).
    *   Création des premières pages (login, dashboard vide).

4.  **Initialisation de l'Application Mobile (Capacitor) :**
    *   Choix du framework web sous-jacent (ex: Angular, React, Vue) si ce n'est pas déjà fait.
    *   Génération du projet web et intégration de Capacitor.
    *   Configuration de base pour iOS et Android.
    *   Mise en place de la communication avec le backend.

## Phase 2 : Développement des Fonctionnalités du Backend

Pour chaque fonctionnalité majeure (Membres, Arbre Généalogique, Actualités, Anniversaires) :

1.  **Modélisation et Entités :**
    *   Définition/Affinement des entités TypeORM.
    *   Mise en place des migrations de base de données.

2.  **Logique Métier et Services :**
    *   Implémentation des services NestJS pour la gestion des données (CRUD et logique spécifique).
    *   Gestion des validations (class-validator).

3.  **Contrôleurs et API Endpoints :**
    *   Création des contrôleurs NestJS et exposition des endpoints API REST/GraphQL.
    *   Sécurisation des endpoints avec les guards JWT et gestion des rôles/permissions.

4.  **Tests Unitaires et d'Intégration :**
    *   Écriture des tests pour les services et contrôleurs.

5.  **Intégration Brevo (pour les fonctionnalités nécessitant des emails) :**
    *   Développement du module d'envoi d'emails (ex: notifications pour nouvelles actualités).

## Phase 3 : Développement de l'Application Web d'Administration

Pour chaque fonctionnalité majeure gérée par l'admin :

1.  **Composants UI :**
    *   Développement des composants Angular (formulaires, listes, affichages détaillés).
    *   Utilisation d'une librairie de composants UI (ex: Angular Material) pour la cohérence.

2.  **Services et Gestion d'État :**
    *   Implémentation des services Angular pour interagir avec le backend.
    *   Mise en place d'une stratégie de gestion d'état (ex: NgRx, services avec BehaviorSubject) si nécessaire.

3.  **Routing et Navigation :**
    *   Configuration des routes pour chaque section de l'administration.

4.  **Gestion des Utilisateurs et des Droits (Interface) :**
    *   Interface pour gérer les utilisateurs du système (distincts des membres).

5.  **Tests End-to-End (optionnel mais recommandé) :**
    *   Mise en place de tests avec Protractor/Cypress.

## Phase 4 : Développement de l'Application Mobile de Consultation

Pour chaque fonctionnalité de consultation :

1.  **Composants UI (avec le framework web choisi) :**
    *   Développement des vues pour afficher les informations (liste des membres, arbre, actualités, anniversaires).
    *   Adaptation de l'UI pour une expérience mobile.

2.  **Services et Logique de Présentation :**
    *   Interaction avec le backend pour récupérer les données.
    *   Gestion de l'état local de l'application mobile.

3.  **Intégration des Fonctionnalités Natives via Capacitor (si besoin) :**
    *   Ex: Notifications push, accès à la caméra pour photo de profil.

4.  **Tests sur Appareils/Émulateurs :**
    *   Validation du fonctionnement sur iOS et Android.

## Phase 5 : Intégration, Tests et Déploiement

1.  **Configuration de l'Infrastructure de Déploiement :**
    *   Préparation du VPS.
    *   Installation de Docker et Docker Swarm.
    *   Configuration de Traefik comme reverse proxy (avec gestion SSL).
    *   Mise en place de Grafana pour le monitoring.

2.  **Dockerisation des Applications :**
    *   Création des Dockerfiles pour le backend, l'application web.
    *   Création d'une image pour l'application mobile (si servie via un conteneur web).

3.  **Scripts de Déploiement / CI/CD :**
    *   Mise en place de scripts pour automatiser le build et le déploiement sur Docker Swarm (via GitHub Actions par exemple).

4.  **Tests d'Intégration Complets :**
    *   Validation des interactions entre tous les composants sur un environnement de staging.

5.  **Tests de Performance et de Charge (basiques) :**
    *   Identifier les goulots d'étranglement potentiels.

6.  **Sécurisation de l'Infrastructure :**
    *   Configuration des pare-feux, mises à jour régulières, gestion des secrets.

7.  **Mise en Production :**
    *   Déploiement initial.
    *   Monitoring post-déploiement.

8.  **Documentation :**
    *   Finalisation de la documentation technique et utilisateur.

## Phase 6 : Maintenance et Évolutions

1.  **Monitoring Continu.**
2.  **Collecte des Retours Utilisateurs.**
3.  **Corrections de Bugs.**
4.  **Développement de Nouvelles Fonctionnalités / Améliorations.**

Ce plan est une vue d'ensemble. Chaque macro-tâche pourra être décomposée en tâches plus fines et estimée plus précisément.