module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "prettier", "jest"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    // 'prettier/@typescript-eslint',
    // 'prettier/react',
    "plugin:jest/recommended",
  ],
  rules: {
    // 'import/extensions': 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    // 'react/prop-types': 'off',
    // 'react/no-unescaped-entities': 'off',
    // 'prefer-const': 'off',
    "prettier/prettier": "error",
    "no-console": "error",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/prop-types": 0,
    "react/display-name": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/jsx-props-no-spreading": ["error", { custom: "ignore" }],
    "import/no-cycle": [0, { ignoreExternal: true }],
    "import/namespace": [2, { allowComputed: true }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    // needed because of https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use & https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
    "no-use-before-define": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: true },
    ],
    // note you must disable the base rule as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        // '@typescript-eslint/explicit-function-return-type': 'error',
        // '@typescript-eslint/explicit-module-boundary-types': [
        //   'warn',
        //   {
        //     allowedNames: ['ignoredFunctionName', 'ignoredMethodName'],
        //   },
        // ],
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "."],
      },
    },
  },
};
