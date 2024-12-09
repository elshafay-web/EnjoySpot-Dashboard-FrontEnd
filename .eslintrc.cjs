module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.mjs'],
      parser: '@typescript-eslint/parser',
    },
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'tailwind.config.ts',
    'vite.config.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-refresh',
    '@tanstack/query',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    'max-lines-per-function': ['error', 500],
    'react/no-string-refs': 'error',
    'react/jsx-uses-vars': 'error',
    'react/require-default-props': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    'linebreak-style': 'off',
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    'import/extensions': 0,
    'react/function-component-definition':0,
    'max-len' : 0,
    'tailwindcss/no-custom-classname': 0,
    'react/button-has-type': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    '@typescript-eslint/indent': 0,
    'react/jsx-wrap-multilines': 0,
    'function-paren-newline': 0,
    'react/jsx-curly-newline': 0,
    'prefer-arrow-callback': 0,
    'import/no-cycle': 0,
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'implicit-arrow-linebreak': 0,
    'react/jsx-one-expression-per-line': 0,
  },
};
