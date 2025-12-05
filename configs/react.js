import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default {
	plugins: {
		react,
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh,
	},
	languageOptions: {
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
	settings: {
		react: {
			version: '19.2.0',
		},
	},
	rules: {
		// React rules
		'react/no-unescaped-entities': 'off',
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
		'react/require-default-props': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/no-unstable-nested-components': 'off',
		'react/no-danger': 'off',
		'react/jsx-uses-react': 'off',
		'react/destructuring-assignment': 'off',
		'react/style-prop-object': 'off',
		// Emotion 라이브러리의 css 속성 등을 사용하는 경우가 있어서 비활성화
		'react/no-unknown-property': 'off',
		// NextPage 등 일부 추상화 컴포넌트에서 복잡해지므로 기본은 off
		'react/prop-types': 'off',
		'react-refresh/only-export-components': 'off',

		// React JSX 규칙
		'react/jsx-key': 'error', // 리스트에 key 필수
		'react/jsx-no-duplicate-props': 'error', // 중복 props 방지
		'react/jsx-no-undef': 'error', // 정의되지 않은 JSX 사용 방지
		'react/no-array-index-key': 'warn', // 배열 인덱스를 key로 사용 시 경고
		'react/no-children-prop': 'error', // children prop 잘못된 사용 방지
		'react/no-danger-with-children': 'error', // dangerouslySetInnerHTML과 children 함께 사용 방지
		'react/no-deprecated': 'warn', // deprecated API 사용 경고
		'react/no-direct-mutation-state': 'error', // state 직접 변경 방지
		'react/no-find-dom-node': 'warn', // findDOMNode 사용 경고
		'react/no-is-mounted': 'error', // isMounted 사용 방지
		'react/no-render-return-value': 'error', // render 반환값 사용 방지
		'react/no-string-refs': 'error', // 문자열 ref 사용 방지
		'react/self-closing-comp': 'error', // self-closing 태그 강제
		'react/jsx-boolean-value': ['warn', 'never'], // boolean prop 축약형 사용
		'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }], // 불필요한 중괄호 제거
		'react/jsx-fragments': ['warn', 'syntax'], // Fragment 축약형 사용
		'react/jsx-no-useless-fragment': 'warn', // 불필요한 Fragment 제거

		// React 보안 규칙
		'react/jsx-no-script-url': 'warn', // javascript: URL 사용 방지 (보안)
		'react/jsx-no-target-blank': 'warn', // target="_blank" 사용 시 rel="noopener noreferrer" 필수 (보안)

		// React 성능/코드 품질 규칙
		'react/no-unused-state': 'warn', // 사용되지 않는 state 경고

		// React Hooks rules
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'off',
	},
};

