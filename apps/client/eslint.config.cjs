const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.cjs');
const pluginQuery = require("@tanstack/eslint-plugin-query")


module.exports = [
  ...baseConfig,
  ...nx.configs['flat/react'],
  ...pluginQuery.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
