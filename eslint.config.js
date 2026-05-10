import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['node_modules/', 'dist/', '.venv/'],
	},
	js.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			'arrow-spacing': ['warn', { before: true, after: true }],
			'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
			'comma-dangle': ['error', 'always-multiline'],
			'comma-spacing': 'error',
			'comma-style': 'error',
			curly: ['error', 'multi-line', 'consistent'],
			'dot-location': ['error', 'property'],
			'handle-callback-err': 'off',
			indent: ['error', 'tab'],
			'keyword-spacing': 'error',
			'max-nested-callbacks': ['error', { max: 4 }],
			'max-statements-per-line': ['error', { max: 2 }],
			'no-console': 'off',
			'no-empty-function': 'error',
			'no-floating-decimal': 'error',
			'no-inline-comments': 'error',
			'no-lonely-if': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
			'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
			'no-trailing-spaces': 'error',
			'no-var': 'error',
			'object-curly-spacing': ['error', 'always'],
			'prefer-const': 'error',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'space-before-blocks': 'error',
			'space-before-function-paren': [
				'error',
				{
					anonymous: 'never',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'space-in-parens': 'error',
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			yoda: 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/explicit-function-return-types': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
	{
		files: ['**/*.js', '**/*.mjs'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
];
