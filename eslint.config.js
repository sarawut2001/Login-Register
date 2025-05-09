import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  // กฎสำหรับ Frontend (React)
  {
    files: ['auth-app/**/*.{js,jsx}'], // เฉพาะไฟล์ใน auth-app (Frontend)
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // กฎสำหรับ Backend (Node.js)
  {
    files: ['auth-backend/**/*.{js}'], // เฉพาะไฟล์ใน auth-backend
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node, // เพิ่ม Environment สำหรับ Node.js
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs', // ใช้ CommonJS สำหรับ Backend
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
];