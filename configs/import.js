import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default {
	plugins: {
		import: importPlugin,
		'unused-imports': unusedImports,
		'no-relative-import-paths': noRelativeImportPaths,
		'simple-import-sort': simpleImportSort,
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: true,
			},
			node: true,
		},
	},
	rules: {
		// Import rules
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'import/no-cycle': 'off',

		// simple-import-sort를 사용하여 import 정렬 관리
		// 기존 import/order와 동일한 순서 유지: React/Next → @/ → 상대경로
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^node:'], // Node.js builtins (맨 위)
					['^react', '^next'], // React, Next.js (기존 pathGroups 순서 유지)
					['^@/'], // Internal alias (@/components 등)
					['^@?\\w'], // 기타 external packages
					['^'], // Absolute imports (catch-all)
					['^\\.'], // Relative imports (./, ../)
					['^\\u0000'], // Side effect imports (맨 밑)
				],
			},
		],
		'simple-import-sort/exports': 'error',

		// 중복 import 방지
		'import/no-duplicates': 'error',

		// 자기 자신 import 방지
		'import/no-self-import': 'error',

		// Unused imports rules
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
				ignoreRestSiblings: true,
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_',
			},
		],

		// import 경로를 절대 경로를 사용하기로 합의했을 때 사용하기 좋은 규칙
		// allowSameFolder: true로 하면 같은 폴더에서 import할 때는 상대 경로 사용 가능
		// prefix를 지정하면 fix 실행 시 eslint가 자동으로 prefix를 넣어서 import 경로를 고쳐줌
		'no-relative-import-paths/no-relative-import-paths': [
			'warn',
			{
				allowSameFolder: true,
				rootDir: 'src',
				prefix: '@',
			},
		],
	},
};