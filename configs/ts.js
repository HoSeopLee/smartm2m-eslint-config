export default {
	files: ['**/*.{ts,tsx}'],
	languageOptions: {
		parserOptions: {
			sourceType: 'module',
			project: ['./tsconfig.app.json'],
		},
	},
	rules: {
		'@typescript-eslint/semi': 'off',
		'no-useless-catch': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-use-before-define': 'off',

		// 네이밍 컨벤션 규칙
		'@typescript-eslint/naming-convention': [
			'warn',
			// camelCase 변수, PascalCase 변수, UPPER_CASE 변수 허용
			{
				selector: 'variable',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
			},
			// camelCase 함수, PascalCase 함수 허용
			{
				selector: 'function',
				format: ['camelCase', 'PascalCase'],
			},
			// PascalCase 클래스, interfaces, type aliases, enums 허용
			{
				selector: 'typeLike',
				format: ['PascalCase'],
			},
			// interface 앞에 I 사용 불가
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: false,
				},
			},
			// typeAlias 앞에 T 사용 불가
			{
				selector: 'typeAlias',
				format: ['PascalCase'],
				custom: {
					regex: '^T[A-Z]',
					match: false,
				},
			},
			// typeParameter 앞에 T 사용 불가
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				custom: {
					regex: '^T[A-Z]',
					match: false,
				},
			},
		],
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-loop-func': 'off',
		'@typescript-eslint/default-param-last': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'@typescript-eslint/lines-between-class-members': 'off',
		'@typescript-eslint/no-throw-literal': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',

		'@typescript-eslint/no-explicit-any': 'warn', // any 사용 경고
		'@typescript-eslint/no-empty-function': 'warn', // 빈 함수 경고
		'@typescript-eslint/prefer-as-const': 'error', // as const 사용 권장

	},
};

