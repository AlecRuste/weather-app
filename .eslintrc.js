module.exports = {
  env: {
    browser: true,
    es6: true,
    node: 1,
  },
  extends: ['react-app', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {},
};
