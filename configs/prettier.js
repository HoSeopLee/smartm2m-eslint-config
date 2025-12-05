import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default {
	plugins: {
		prettier,
	},
	rules: {
		// Prettier rules
		'prettier/prettier': ['error'],
		// Prettier와 충돌하는 규칙들 비활성화
		...(eslintConfigPrettier.rules || eslintConfigPrettier),
	},
};

