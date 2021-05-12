/**
 * Copyright IBM Corp. 2018, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ['eslint:recommended', 'plugin:jsdoc/recommended'],
  plugins: ['jsdoc', 'tree-shaking'],
  rules: {
    // Handle cases where we are destructuring but may not be using the initial
    // variables
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreMemberSort: true,
      },
    ],
    'jsdoc/require-jsdoc': [
      2,
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          FunctionDeclaration: true,
          MethodDefinition: true,
        },
      },
    ],
    'jsdoc/require-param-description': 2,
    'jsdoc/require-param-name': 2,
    'jsdoc/require-param': 2,
    'jsdoc/require-param-type': 2,
    'jsdoc/valid-types': 2,
    'jsdoc/check-param-names': 2,
    'jsdoc/check-tag-names': 2,
    'jsdoc/check-types': 2,
    'jsdoc/check-values': 0,
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    __DEV__: true,
  },
  settings: {
    jsdoc: {
      tagNamePreference: {
        augments: 'extends',
      },
    },
  },
  overrides: [
    {
      files: ['**/overview.js', '**/*.stories.js'],
      rules: {
        'jsdoc/require-jsdoc': 0,
        'react/prop-types': 0,
      },
    },
    {
      files: ['**/*.e2e.js'],
      rules: {
        'jsdoc/require-jsdoc': 0,
      },
      env: {
        jasmine: true,
      },
      globals: {
        browser: true,
        $: true,
        $$: true,
        describe: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        afterEach: true,
        it: true,
        expect: true,
        page: true,
      },
    },
    {
      files: ['**/*_steps.js', '**/*.steps.js'],
      globals: {
        describe: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        afterEach: true,
        it: true,
        expect: true,
        page: true,
      },
      rules: {
        'no-new': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
      },
    },
    {
      files: [
        'packages/react/src/components/carbon-components-react/**/*.js',
        'packages/react/src/internal/keyboard/**/*.js',
        'packages/react/src/prop-types/**/*.js',
      ],
      rules: {
        'sort-imports': 0,
        'jsdoc/require-param-description': 0,
        'react/prop-types': 0,
      },
    },
    {
      files: ['packages/react/tests/**/*.js'],
      globals: {
        describe: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        afterEach: true,
        it: true,
        expect: true,
        aChecker: true,
      },
      rules: {
        'no-new': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
      },
    },
  ],
};
