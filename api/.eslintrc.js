module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 'warn',
    'prettier/prettier': [
      'warn',
      {
        bracketSpacing: true,
        arrowParens: 'always',
        trailingComma: 'es5',
        singleQuote: true,
        endOfLine: 'auto',
        tabWidth: 2,
        semi: true,
      },
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
  },
};
