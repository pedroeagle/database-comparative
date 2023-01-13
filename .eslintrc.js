module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": [
    "plugin:react/recommended",
    // "standard",
    // "plugin:react/jsx-runtime",
    // "plugin:testing-library/react",
    // "plugin:jest/all"
  ],
  // "extends": [
  //   "eslint:recommended",
  //   "plugin:react/recommended"
  // ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    "requireConfigFile": false,
    "parser": '@babel/eslint-parser',
    "babelOptions": {
      "parserOpts": {
        "plugins": ["jsx"]
      }
    }
  },
  'rules': {
    'camelcase': 'off',
    "react/prop-types": "off"
  },
  "parser": "@babel/eslint-parser"
};
