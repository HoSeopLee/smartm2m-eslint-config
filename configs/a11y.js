import jsxA11y from 'eslint-plugin-jsx-a11y';

export default {
	plugins: {
		'jsx-a11y': jsxA11y,
	},
	rules: {
		// <img> 엘리먼트에 유의미한 대체 텍스트가 있는지 체크
		'jsx-a11y/alt-text': [
			'warn',
			{
				elements: ['img'],
			},
		],
		// 유효한 aria-* 속성만 사용
		'jsx-a11y/aria-props': 'warn',
		// 유효한 aria-* 상태/값만 사용
		'jsx-a11y/aria-proptypes': 'warn',
		// DOM에서 지원되는 role, ARIA만 사용
		'jsx-a11y/aria-unsupported-elements': 'warn',
		// 필수 ARIA 속성이 빠져있는지 체크
		'jsx-a11y/role-has-required-aria-props': 'warn',
		// ARIA 속성은 지원되는 role에서만 사용
		'jsx-a11y/role-supports-aria-props': 'warn',
		// 컨트롤과 레이블 연결
		'jsx-a11y/control-has-associated-label': 'error',
		// 클릭 이벤트와 키 이벤트 연결
		'jsx-a11y/click-events-have-key-events': 'error',
		// 빈 제목 태그 금지
		'jsx-a11y/heading-has-content': 'error',
		// label과 input 연결
		'jsx-a11y/label-has-associated-control': 'error',
		// 테이블의 th 요소에 scope 속성이 있는지 체크
		'jsx-a11y/scope': 'error',
		// 중복된 role 제거 (예: role="button" button 요소)
		'jsx-a11y/no-redundant-roles': 'warn',
		// 비대화형 요소에 tabindex 사용 금지
		'jsx-a11y/no-noninteractive-tabindex': [
			'warn',
			{
				tags: ['div', 'span', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th'],
			},
		],
	},
};

