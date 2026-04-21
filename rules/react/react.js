import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * rules/react/react.js — React + Hooks + Refresh (configs/react.js 대응)
 * 라인별: 규칙 설명 + (warn/error/off)
 */
export default {
	plugins: {
		react,
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh,
	},
	languageOptions: {
		parserOptions: {
			ecmaFeatures: { jsx: true },
		},
	},
	settings: {
		react: { version: 'detect' },
	},
	rules: {
		// JSX 내 이스케이프 엔티티 (off)
		'react/no-unescaped-entities': 'off',
		// 확장자 .js .jsx .ts .tsx 허용 (warn)
		'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		// React 17+ 전제, JSX scope (off)
		'react/react-in-jsx-scope': 'off',
		// named 컴포넌트는 화살표 함수 (error)
		'react/function-component-definition': ['error', { namedComponents: ['arrow-function', 'function-declaration'] }],
		// defaultProps 필수 아님 (off)
		'react/require-default-props': 'off',
		// props spreading 허용 (off)
		'react/jsx-props-no-spreading': 'off',
		// 불안정 중첩 컴포넌트 (off)
		'react/no-unstable-nested-components': 'off',
		// dangerouslySetInnerHTML (off)
		'react/no-danger': 'off',
		// jsx-uses-react (off)
		'react/jsx-uses-react': 'off',
		// destructuring 할당 강제 안 함 (off)
		'react/destructuring-assignment': 'off',
		// style prop 객체 (off)
		'react/style-prop-object': 'off',
		// unknown prop (Emotion css 등 허용) (off)
		'react/no-unknown-property': 'off',
		// prop-types (TS 사용 시 off) (off)
		'react/prop-types': 'off',
		// only-export-components는 preset에서 테스트 등 override (off)
		'react-refresh/only-export-components': 'off',
		// 리스트 key 필수 (error)
		'react/jsx-key': 'error',
		// 중복 props 금지 (error)
		'react/jsx-no-duplicate-props': 'error',
		// 정의되지 않은 JSX 금지 (error)
		'react/jsx-no-undef': 'error',
		// 배열 인덱스를 key로 쓰면 경고 (warn)
		'react/no-array-index-key': 'warn',
		// children prop 잘못된 사용 금지 (error)
		'react/no-children-prop': 'error',
		// dangerouslySetInnerHTML + children 동시 금지 (error)
		'react/no-danger-with-children': 'error',
		// deprecated API 경고 (warn)
		'react/no-deprecated': 'warn',
		// state 직접 변경 금지 (error)
		'react/no-direct-mutation-state': 'error',
		// findDOMNode 경고 (warn)
		'react/no-find-dom-node': 'warn',
		// isMounted 금지 (error)
		'react/no-is-mounted': 'error',
		// render 반환값 사용 금지 (error)
		'react/no-render-return-value': 'error',
		// 문자열 ref 금지 (error)
		'react/no-string-refs': 'error',
		// self-closing 태그 강제 (error)
		'react/self-closing-comp': 'error',
		// boolean prop 축약형 (warn, never)
		'react/jsx-boolean-value': ['warn', 'never'],
		// 불필요한 중괄호 제거 (warn)
		'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
		// Fragment 축약형 (warn)
		'react/jsx-fragments': ['warn', 'syntax'],
		// 불필요한 Fragment 제거 (warn)
		'react/jsx-no-useless-fragment': 'warn',
		// javascript: URL 경고 (warn)
		'react/jsx-no-script-url': 'warn',
		// target="_blank" 시 rel noopener noreferrer (warn)
		'react/jsx-no-target-blank': ['warn', { allowReferrer: true }],
		// 미사용 state 경고 (warn)
		'react/no-unused-state': 'warn',
		// Hooks 규칙 (error)
		'react-hooks/rules-of-hooks': 'error',
		// exhaustive-deps (warn)
		'react-hooks/exhaustive-deps': 'warn',
		// 렌더링 누출 방지 (off) - autofix가 ternary/Boolean() 등으로 강제 변환해 코드 스타일 침해, 팀 코드리뷰·TS 타입으로 대체 (v1.0.6)
		'react/jsx-no-leaked-render': 'off',
		// context 값 변경 금지 (warn)
		'react/jsx-no-constructed-context-values': 'warn'
	},
};
