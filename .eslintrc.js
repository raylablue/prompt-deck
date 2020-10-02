module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
      "jsx-a11y/label-has-associated-control": [ 2, {
        "labelComponents": ["CustomLabel"],
        "labelAttributes": ["inputLabel"],
        "controlComponents": ["CustomInput"],
        "assert": "either",
        "depth": 3,
      }],
      "no-console": "off",
      "no-restricted-syntax": [
        "error",
        {
          "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
          "message": "Unexpected property on console object was called"
        }
      ],
    },
    overrides: [
      {
        files: [
          '**/*.test.js',
          '**/*.test.jsx',
          'src/tests/**/*.js',
          'src/setupTests.js',
        ],
        plugins: ['jest'],
        rules: {
          'import/no-extraneous-dependencies': 0,
          'import/prefer-default-export': 0,
        },
        env: {
          'jest/globals': true,
        },
      }
    ]
};
