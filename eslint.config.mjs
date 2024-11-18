import antfu from '@antfu/eslint-config'

export default antfu(
  {
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false,
    },
  },
  {
    files: ['apps/api/**/*.ts'],
    rules: {
      'ts/no-require-imports': 'off',
      'ts/no-unsafe-function-type': 'off',
      'ts/method-signature-style': 'off',
      'jsdoc/check-param-names': 'off',
    },
  },
  {
    files: ['packages/logger/**/*.ts'],
    rules: {
      'no-console': 'off',
      'ts/method-signature-style': 'off',
      'ts/no-unsafe-function-type': 'off',
      'regexp/no-unused-capturing-group': 'off',
    },
  },
  {
    rules: {
      'jsdoc/no-multi-asterisks': 'off',
    },
  },
)
