// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'apps/admin-web/angular.json',
      'apps/admin-web/capacitor.config.ts',
      'apps/admin-web/karma.conf.js', // Si vous utilisez Karma
      'apps/backend/nest-cli.json',
      'apps/mobile-app/angular.json',
      'apps/mobile-app/capacitor.config.ts',
      'apps/mobile-app/karma.conf.js', // Si vous utilisez Karma
      'eslint.config.mjs', // Ignorer le fichier de configuration ESLint racine lui-même
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      'apps/backend/eslint.config.mjs', // Ignorer l'ancien fichier de config backend
      'apps/mobile-app/android/**', // Ignorer le répertoire Android
      'apps/mobile-app/ios/**', // Ignorer le répertoire iOS
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node, // Pour les projets Node.js comme le backend
        ...globals.browser, // Pour les projets frontend comme Angular
        // ...globals.jest, // Décommentez si Jest est utilisé globalement
        // ...globals.jasmine, // Décommentez si Jasmine est utilisé globalement (souvent avec Angular)
      },
      parserOptions: {
        project: [
          './apps/admin-web/tsconfig.app.json',
          './apps/backend/tsconfig.json',
          './apps/mobile-app/tsconfig.app.json',
          // Ajoutez ici les chemins vers les tsconfig.json des autres projets si nécessaire
        ],
        tsconfigRootDir: new URL('.', import.meta.url).pathname, // La racine du monorepo
      },
      sourceType: 'module', // Utiliser 'module' pour les projets modernes
    },
    settings: {
      // Si vous avez des configurations spécifiques à des plugins, ajoutez-les ici
    },
  },
  {
    files: ['**/*.ts'], // Appliquer ces règles uniquement aux fichiers TypeScript
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // 'warn' est souvent préférable à 'off'
      '@typescript-eslint/no-floating-promises': 'error', // 'error' pour plus de rigueur
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Ajoutez d'autres règles spécifiques à TypeScript ici
      'prettier/prettier': 'warn', // Intégration avec Prettier
    },
  },
  {
    files: ['**/*.html'], // Configuration spécifique pour les fichiers HTML (Angular)
    // Vous pourriez avoir besoin de 'eslint-plugin-angular' ou similaire ici
    // Pour l'instant, nous laissons vide, mais c'est l'endroit pour ajouter des règles HTML
  },
  {
    files: ['**/*.js', '**/*.mjs'], // Configuration pour les fichiers JavaScript
    rules: {
      // Ajoutez des règles spécifiques JavaScript ici si nécessaire
      'prettier/prettier': 'warn',
    },
  }
);