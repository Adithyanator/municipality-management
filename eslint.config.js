const js = require('@eslint/js');
const globals = require('globals');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
      'dist/**',
      '**/dist/**',
      'build/**',
      '**/build/**',
      'coverage/**',
      '**/coverage/**',
      '.env',
      '**/.env',
      '.env.*',
      '**/.env.*',
      'ai-services/**',
      '**/ai-services/**',
      'temp_build/**',
    ],
  },
  // Base configuration for all JavaScript/React/Node files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'no-empty': 'error',
      'no-unreachable': 'error',
      'consistent-return': 'warn',
    },
  },
  // Backend workspace-specific rules
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-process-exit': 'warn',
      'no-console': 'warn',
    },
  },
  // Frontend workspace-specific rules (React / JSX)
  {
    files: ['frontend/**/*.js', 'frontend/**/*.jsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'warn',
    },
  },
  // Allow console statements in setup, seed, migration, config verification, and CLI utility scripts
  {
    files: [
      'backend/server.js',
      'backend/extract_docs.js',
      'backend/list_dbs.js',
      '**/scripts/**/*.js',
      '**/migrations/**/*.js',
      '**/seeders/**/*.js',
      '**/seeds/**/*.js',
      '**/setup/**/*.js',
      '**/cli/**/*.js',
    ],
    rules: {
      'no-console': 'off',
    },
  },
  eslintConfigPrettier,
];
