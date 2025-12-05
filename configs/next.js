import nextPlugin from '@next/eslint-plugin-next';

/**
 * Next.js 전용 ESLint 설정
 * Next.js 프레임워크의 모범 사례와 권장 규칙을 적용합니다.
 */
export default {
	plugins: {
		'@next/next': nextPlugin,
	},
	rules: {
		// Next.js 라우팅 및 링크 관련 규칙
		// <a> 태그 대신 Next.js의 Link 컴포넌트 사용을 강제
		'@next/next/no-html-link-for-pages': 'error',

		// 이미지 최적화 관련 규칙
		// <img> 태그 대신 Next.js의 Image 컴포넌트 사용 권장 (성능 최적화)
		'@next/next/no-img-element': 'warn',

		// Polyfill.io 관련 규칙
		// 원하지 않는 Polyfill.io 스크립트 사용 방지
		'@next/next/no-unwanted-polyfillio': 'error',

		// 폰트 최적화 관련 규칙
		// 페이지별 커스텀 폰트 사용 시 경고 (Next.js 폰트 최적화 권장)
		'@next/next/no-page-custom-font': 'warn',

		// 스크립트 로딩 관련 규칙
		// 동기 스크립트 사용 방지 (성능 저하 방지)
		'@next/next/no-sync-scripts': 'error',

		// Document Head 관련 규칙
		// Document의 head에 title 태그 직접 사용 방지 (next/head 사용 권장)
		'@next/next/no-title-in-document-head': 'error',

		// CSS 태그 관련 규칙
		// Document에 CSS 태그 직접 사용 방지 (Next.js CSS 처리 방식 사용 권장)
		'@next/next/no-css-tags': 'error',

		// HTML Head 요소 관련 규칙
		// <head> 태그 직접 사용 방지 (next/head 사용 권장)
		'@next/next/no-head-element': 'error',

		// Document에서 head import 관련 규칙
		// Document 컴포넌트에서 next/head import 방지
		'@next/next/no-head-import-in-document': 'error',

		// Script 컴포넌트 위치 관련 규칙
		// head 내부에 Script 컴포넌트 사용 방지
		'@next/next/no-script-component-in-head': 'error',

		// Styled JSX 관련 규칙
		// Document에서 styled-jsx 사용 방지
		'@next/next/no-styled-jsx-in-document': 'error',

		// 오타 검사 관련 규칙
		// Next.js API 이름 오타 검사 (예: getServerSideProps 오타 등)
		'@next/next/no-typos': 'warn',

		// 중복 Head 관련 규칙
		// 중복된 Head 컴포넌트 사용 방지
		'@next/next/no-duplicate-head': 'error',

		// 모듈 변수 할당 관련 규칙
		// __webpack_require__ 같은 모듈 변수 재할당 방지
		'@next/next/no-assign-module-variable': 'error',

		// Script 컴포넌트 위치 관련 규칙
		// Document 외부에서 beforeInteractive 스크립트 사용 방지
		'@next/next/no-before-interactive-script-outside-document': 'error',

		// Document import 관련 규칙
		// 페이지 컴포넌트에서 Document import 방지 (사용자 설정에 따라 off)
		'@next/next/no-document-import-in-page': 'off',
	},
};

