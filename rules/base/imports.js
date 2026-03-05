import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/**
 * rules/base/imports.js — import/모듈 규칙 (configs/import.js 대응)
 * 라인별: 규칙 설명 + (warn/error/off)
 */
export default {
	plugins: {
		import: importPlugin,
		'unused-imports': unusedImports,
		'no-relative-import-paths': noRelativeImportPaths,
		'simple-import-sort': simpleImportSort,
	},
	settings: {
		'import/resolver': {
			typescript: { alwaysTryTypes: true, project: true },
			node: true,
		},
	},
	rules: {
		// 해결되지 않은 모듈 체크 안 함 (off)
		'import/no-unresolved': 'off',
		// extraneous dependencies 체크 안 함 (off)
		'import/no-extraneous-dependencies': 'off',
		// 확장자 강제 안 함 (off)
		'import/extensions': 'off',
		// default export 강제 안 함 (off)
		'import/prefer-default-export': 'off',
		// 순환 import 체크 안 함 (off)
		'import/no-cycle': 'off',
		// import 순서는 simple-import-sort로만 관리 (off)
		'import/order': 'off',

		// import 순서 그룹: side effect → node → react/next → 외부 → @/ → 절대 → 상대 → CSS (error)
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^\\u0000(?!.*\\.css$)'],
					['^node:'],
					['^react', '^next'],
					['^@?\\w'],
					['^@/'],
					['^[^.]'],
					['^\\.'],
					['^\\u0000.*\\.css'],
				],
			},
		],
		// export 정렬 (error)
		'simple-import-sort/exports': 'error',
		// 중복 import 금지 (error)
		'import/no-duplicates': 'error',
		// 자기 자신 import 금지 (error)
		'import/no-self-import': 'error',
		// no-unused-vars 끔, unused-imports로 통일 (off)
		'no-unused-vars': 'off',
		// 미사용 import 제거 (error)
		'unused-imports/no-unused-imports': 'error',
		// 미사용 변수: _ 접두사면 무시 (error)
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
		// 상대 경로 대신 @ 사용 권장, 같은 폴더만 상대 허용 (warn)
		'no-relative-import-paths/no-relative-import-paths': [
			'warn',
			{ allowSameFolder: true, rootDir: 'src', prefix: '@' },
		],
	},
};
