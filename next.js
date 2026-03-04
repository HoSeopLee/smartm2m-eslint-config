import js from '@eslint/js';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

import importConfig from './configs/import.js';
import reactConfig from './configs/react.js';
import tsConfig from './configs/ts.js';
import a11yConfig from './configs/a11y.js';
import prettierConfig from './configs/prettier.js';
import nextConfig from './configs/next.js';
import { generalRules } from './configs/base-rules.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config([
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'public/**',
			'*.config.js',
			'*.config.ts',
			'*.config.mjs',
			'.prettierrc.js',
			'vite.config.ts',
			'build/**',
			'coverage/**',
			'.next/**',
			'out/**',
			'next-env.d.ts',
			'eslint.config.js',
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,

	// TypeScript 파일에 대한 설정
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			...reactConfig.plugins,
			...importConfig.plugins,
			...a11yConfig.plugins,
			...prettierConfig.plugins,
			...nextConfig.plugins,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				sourceType: 'module',
				project: true,
				tsconfigRootDir: __dirname,
			},
		},
		settings: {
			'better-tailwindcss': {
				entryPoint: path.resolve(__dirname, 'src/styles/tailwind.css'),
			},
			...reactConfig.settings,
			...importConfig.settings,
		},
		rules: {
			...tsConfig.rules,
			...importConfig.rules,
			...reactConfig.rules,
			...a11yConfig.rules,
			...prettierConfig.rules,
			...nextConfig.rules,
			...generalRules,
		},
	},

	// JavaScript 파일에 대한 설정 (TypeScript parser 사용 안 함)
	{
		files: ['**/*.{js,jsx}'],
		plugins: {
			...reactConfig.plugins,
			...importConfig.plugins,
			...a11yConfig.plugins,
			...prettierConfig.plugins,
			...nextConfig.plugins,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				sourceType: 'module',
			},
		},
		settings: {
			'better-tailwindcss': {
				entryPoint: path.resolve(__dirname, 'src/styles/tailwind.css'),
			},
			...reactConfig.settings,
			...importConfig.settings,
		},
		rules: {
			...importConfig.rules,
			...reactConfig.rules,
			...a11yConfig.rules,
			...prettierConfig.rules,
			...nextConfig.rules,

			'react-refresh/only-export-components': [
				'warn',
				{
					allowConstantExport: true,
				},
			],

			...generalRules,
		},
	},

	// 테스트 파일들(__tests__ 폴더 내 파일과 이름에 spec 또는 test를 포함하는 파일들)에 대해 특별한 규칙 설정
	// react-refresh/only-export-components 규칙을 비활성화하여 테스트에서 불필요한 경고 방지
	{
		files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
		rules: {
			'react-refresh/only-export-components': 'off',
		},
	},
]);

