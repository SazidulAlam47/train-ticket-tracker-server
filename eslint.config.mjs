import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        languageOptions: {
            globals: { ...globals.browser, process: 'readonly' },
        },
    },
    tseslint.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'error',
            'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
            'no-unused-expressions': 'error',
            'no-console': 'warn',
            'no-undef': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        ignores: ['.node_modules/*'],
    },
    prettier,
]);
