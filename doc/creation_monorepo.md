# Créer et Gérer un Monorepo PNPM avec NestJS, Angular et Capacitor

Pour créer et gérer un monorepo PNPM avec un projet NestJS, un projet Angular et un projet Capacitor, suivez ces étapes :

### 1. Prérequis

Assurez-vous d'avoir Node.js et PNPM installés sur votre machine.
*   **Node.js** : Téléchargez et installez-le depuis [nodejs.org](https://nodejs.org/).
*   **PNPM** : Une fois Node.js installé, vous pouvez installer PNPM globalement via npm (qui vient avec Node.js) :
    ```bash
    npm install -g pnpm
    ```

### 2. Initialisation du Monorepo PNPM

1.  **Créez un répertoire racine** pour votre monorepo :
    ```bash
    mkdir famillink-monorepo
    cd famillink-monorepo
    ```

2.  **Initialisez un `package.json`** à la racine du monorepo :
    ```bash
    pnpm init
    ```

3.  **Créez un fichier `pnpm-workspace.yaml`** à la racine du monorepo. Ce fichier définit les emplacements de vos projets (packages) au sein du monorepo.
    ```yaml
    # pnpm-workspace.yaml
    packages:
      - 'apps/*' # Tous les projets applicatifs seront dans un dossier 'apps'
      - 'packages/*' # Si vous avez des bibliothèques partagées, elles iront ici
    ```
    Vous pouvez ajuster les chemins selon votre structure préférée. Pour cet exemple, nous placerons les applications (NestJS, Angular, Capacitor) dans un dossier `apps`.

### 3. Création des Projets

Créez un dossier `apps` à la racine de votre monorepo :
```bash
mkdir apps
cd apps
```

#### a. Projet NestJS (Backend)

1.  Utilisez le CLI NestJS pour créer votre application backend. Si vous ne l'avez pas, installez-le globalement :
    ```bash
    pnpm add -g @nestjs/cli
    ```
2.  Créez le projet NestJS dans le dossier `apps` :
    ```bash
    nest new backend # 'backend' sera le nom de votre application NestJS
    ```
    Lorsque NestJS vous demande quel gestionnaire de paquets utiliser, choisissez `pnpm`.

#### b. Projet Angular (Application Web d'Administration)

1.  Utilisez le CLI Angular pour créer votre application frontend. Si vous ne l'avez pas, installez-le globalement :
    ```bash
    pnpm add -g @angular/cli
    ```
2.  Créez le projet Angular dans le dossier `apps` (assurez-vous d'être dans `famillink-monorepo/apps`):
    ```bash
    ng new admin-web --package-manager=pnpm # 'admin-web' sera le nom de votre application Angular
    ```
    L'option `--package-manager=pnpm` indique à Angular CLI d'utiliser PNPM.

#### c. Projet Capacitor (Application Mobile de Consultation)

Capacitor s'ajoute généralement à un projet web existant. Vous avez plusieurs options :
*   **Option 1 (Recommandée pour la cohérence) : Créer une autre application Angular (ou un autre framework web comme React/Vue) pour la partie mobile.**
    1.  Créez une nouvelle application Angular (par exemple, `mobile-app`) dans le dossier `apps` :
        ```bash
        # Toujours dans famillink-monorepo/apps
        ng new mobile-app --package-manager=pnpm
        ```
    2.  Naviguez dans le répertoire de cette nouvelle application (`mobile-app`) :
        ```bash
        cd mobile-app
        ```
    3.  Initialisez Capacitor :
        ```bash
        pnpm install @capacitor/core @capacitor/cli
        npx cap init "Famillink Mobile" "com.famillink.mobile" --web-dir="dist/mobile-app"
        ```
        *   Remplacez `"dist/mobile-app"` par le répertoire de build de votre application Angular (vérifiez votre `angular.json`, la propriété `outputPath`).
    4.  Ajoutez les plateformes souhaitées (iOS, Android) :
        ```bash
        npx cap add ios
        npx cap add android
        ```
*   **Option 2 : Utiliser un projet web simple (HTML, JS, CSS).**
    Si l'application mobile est très simple, vous pourriez créer une structure de base et y ajouter Capacitor. Cependant, pour une application de consultation avec des fonctionnalités comme la gestion des nouvelles, un framework comme Angular est souvent plus adapté.

Après avoir créé ces projets, votre structure de dossiers devrait ressembler à ceci :

```
famillink-monorepo/
├── apps/
│   ├── backend/      # Projet NestJS
│   │   ├── node_modules/
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   ├── admin-web/    # Projet Angular pour l'admin
│   │   ├── node_modules/
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   └── mobile-app/   # Projet Angular/Web pour Capacitor
│       ├── node_modules/
│       ├── src/
│       ├── capacitor.config.json (ou .ts)
│       ├── package.json
│       └── ...
├── node_modules/     # Géré par PNPM, contient les dépendances partagées
├── package.json      # package.json racine du monorepo
└── pnpm-workspace.yaml
```

Revenez à la racine du monorepo :
```bash
cd ../.. # Si vous étiez dans apps/mobile-app
```

### 4. Installation des Dépendances

Depuis la racine de votre monorepo (`famillink-monorepo`), lancez :
```bash
pnpm install
```
PNPM va lire le fichier `pnpm-workspace.yaml`, détecter les `package.json` dans les sous-dossiers spécifiés (`apps/*`), et installer toutes les dépendances. Il optimisera l'espace disque en ne stockant chaque version de package qu'une seule fois et en utilisant des liens symboliques.

### 5. Gestion des Dépendances

*   **Dépendances spécifiques à un projet** :
    Naviguez dans le répertoire du projet concerné et utilisez `pnpm add <package-name>`.
    Par exemple, pour ajouter une dépendance uniquement au backend :
    ```bash
    cd apps/backend
    pnpm add lodash
    cd ../.. # Retour à la racine
    ```
    Ou, depuis la racine, en utilisant l'option `--filter` :
    ```bash
    pnpm add lodash --filter backend
    ```

*   **Dépendances partagées (à la racine)** :
    Si vous avez des outils de développement (comme TypeScript, ESLint, Prettier) que vous voulez utiliser pour tous les projets avec la même version, vous pouvez les installer à la racine du monorepo avec l'option `-w` ou `--workspace-root` :
    ```bash
    pnpm add -D typescript eslint prettier -w
    ```

*   **Dépendances partagées entre certains projets (bibliothèques locales)** :
    Si vous créez une bibliothèque dans `packages/my-shared-lib`, vous pouvez l'ajouter comme dépendance à `apps/backend` en utilisant le nom du package défini dans `packages/my-shared-lib/package.json` et la syntaxe `workspace:` :
    ```json
    // apps/backend/package.json
    "dependencies": {
      "my-shared-lib": "workspace:*"
    }
    ```
    Ensuite, exécutez `pnpm install` à la racine.

### 6. Scripts `package.json`

Vous pouvez définir des scripts dans le `package.json` de chaque projet et aussi dans le `package.json` racine pour orchestrer des actions sur plusieurs projets.

*   **Scripts spécifiques** (par exemple, dans `apps/backend/package.json`):
    ```json
    "scripts": {
      "start:dev": "nest start --watch",
      "build": "nest build"
    }
    ```

*   **Scripts à la racine** (dans `famillink-monorepo/package.json`) pour lancer des commandes sur des projets spécifiques ou tous les projets :
    ```json
    "scripts": {
      "start:backend": "pnpm --filter backend start:dev",
      "start:admin": "pnpm --filter admin-web start", // 'start' est souvent le script ng serve
      "start:mobile": "pnpm --filter mobile-app start", // 'start' est souvent le script ng serve
      "build:all": "pnpm run -r build", // Exécute le script 'build' dans chaque package
      "lint": "pnpm run -r lint" // Si chaque projet a un script 'lint'
    }
    ```
    Pour exécuter le script `start:backend` depuis la racine :
    ```bash
    pnpm start:backend
    ```

### 7. Commandes Utiles de PNPM pour les Workspaces

*   `pnpm install` : Installe toutes les dépendances pour tous les packages du workspace.
*   `pnpm add <package> --filter <nom-du-package>` : Ajoute une dépendance à un package spécifique.
*   `pnpm remove <package> --filter <nom-du-package>` : Supprime une dépendance d'un package spécifique.
*   `pnpm run <script-name> --filter <nom-du-package>` : Exécute un script d'un package spécifique.
*   `pnpm exec <commande> --filter <nom-du-package>` : Exécute une commande arbitraire dans le répertoire d'un package spécifique.
*   `pnpm run -r <script-name>` : Exécute un script dans tous les packages qui le définissent (récursif).
*   `pnpm list -r --depth -1` : Liste tous les packages du workspace.

### 8. Avantages de cette Approche

*   **Gestion centralisée des dépendances** : PNPM optimise l'espace disque et assure la cohérence des versions.
*   **Code partagé facilité** : Vous pouvez créer des bibliothèques locales (`packages/*`) et les partager facilement entre vos applications.
*   **Processus de build et de développement unifiés** : Les scripts à la racine peuvent orchestrer des actions sur l'ensemble du monorepo.
*   **Meilleure organisation du code** pour des projets complexes avec plusieurs composants.

### 9. Points d'Attention

*   **Configuration des outils de build/linting/testing** : Chaque projet (NestJS, Angular) vient avec ses propres configurations. Vous devrez peut-être les ajuster pour qu'ils fonctionnent bien dans un contexte de monorepo, notamment les chemins. Parfois, il est utile d'avoir des configurations de base à la racine et de les étendre dans chaque projet.
*   **Temps de build initiaux** : Bien que PNPM soit rapide, la première installation ou le build de tous les projets peut prendre du temps.
*   **Intégration Continue (CI)** : Configurez votre CI pour comprendre la structure du monorepo et ne reconstruire/redéployer que les parties modifiées (des outils comme Nx peuvent aider ici, mais PNPM seul le permet aussi avec une bonne gestion des scripts).
*   **Capacitor et chemins de build** : Assurez-vous que la configuration de Capacitor (`capacitor.config.json` ou `.ts`) pointe correctement vers le répertoire de build de votre application web mobile (par exemple, `dist/mobile-app`).

Cette structure vous offre une base solide pour développer votre projet Famillink. Vous pourrez ensuite affiner la configuration des outils (ESLint, Prettier, TypeScript, Jest, etc.) pour qu'ils fonctionnent de manière cohérente à travers tout le monorepo.