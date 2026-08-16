import featureSliced from "@conarti/eslint-plugin-feature-sliced";
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "eslint.config.js",
      "eslint.config.mjs",
      "next.config.ts",
    ],
  },

  // Базовые конфигурации разворачиваются прямо в массив

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked, // Включаем проверку типов

  ...pluginQuery.configs["flat/recommended"],

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: 2020,

      globals: globals.browser,

      parserOptions: {
        project: ["./tsconfig.json"],

        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      react: reactPlugin,

      "react-hooks": reactHooks,

      "react-refresh": reactRefresh,

      "@conarti/feature-sliced": featureSliced,
    },

    rules: {
      // Подключаем базовые правила React и Хуков

      ...reactPlugin.configs.recommended.rules,

      ...reactPlugin.configs["jsx-runtime"].rules, // Отключает ошибку React must be in scope

      ...reactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      "no-restricted-imports": [
        "error",

        {
          patterns: [
            {
              group: ["*.css", "!*.module.css"],

              message: "Используйте SCSS модули (.module.scss) вместо CSS файлов.",
            },

            {
              group: ["*.scss", "!*.module.scss", "!@/app/styles/**", "!./styles/**"],

              message:
                'Используйте SCSS модули с префиксом "module". Обычные только для глобальных стилей.',
            },
          ],
        },
      ],

      // Правила FSD

      "@conarti/feature-sliced/layers-slices": "error",

      "@conarti/feature-sliced/absolute-relative": ["error", { alias: "@" }],

      "@conarti/feature-sliced/public-api": "error",

      // Метрики кода

      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],

      "max-lines-per-function": [
        "error",

        { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],

      complexity: ["error", 10],

      "max-depth": ["error", 3],

      "@typescript-eslint/consistent-type-imports": [
        "error",

        {
          prefer: "type-imports",

          fixStyle: "inline-type-imports",
        },
      ],

      // времнные правила отключения проверок (удалить потом)

      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/error-boundaries": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",

      //------------------------
    },
  },

  {
    files: ["src/main.tsx", "src/app/main.tsx", "src/app/App.tsx", "src/App.tsx"],

    rules: {
      "no-restricted-imports": "off",
    },
  },

  // Prettier всегда должен быть в самом конце, чтобы переопределить конфликтующие правила

  eslintConfigPrettier
);
