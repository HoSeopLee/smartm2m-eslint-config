# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2026-04-21

### Added

- **React rules**
  - `react/jsx-no-leaked-render` (error, `coerce`/`ternary`만 허용): `{count && <X />}` 패턴에서 `count=0`이 "0"으로 렌더되는 버그 차단
  - `react/jsx-no-constructed-context-values` (warn): Context Provider에 인라인 객체/배열을 넘겨 불필요한 re-render 유발 방지
- **Next.js rules** (공식 recommended 보강)
  - `@next/next/google-font-display` (warn)
  - `@next/next/google-font-preconnect` (warn)
  - `@next/next/inline-script-id` (warn)
  - `@next/next/next-script-for-ga` (warn)
- **peerDependencies**
  - `eslint-import-resolver-typescript` 추가 (optional, `peerDependenciesMeta`)
  - `@next/eslint-plugin-next` optional 지정

### Changed

- **React rules**
  - `react/function-component-definition`: `arrow-function`만 허용 → `arrow-function`/`function-declaration` 둘 다 허용 (Next.js `page.tsx`/`layout.tsx` 패턴 대응)
  - `react/jsx-no-target-blank`: `allowReferrer: true` 추가 (`noopener`만 있어도 통과)
  - `react-hooks/exhaustive-deps`: `off` → `warn` (React 공식 권장 회귀)
- **Base rules**
  - `consistent-return`: `warn` → `off` (React early-return 패턴 자유화)
- **peerDependencies 호환 범위 확대**
  - `eslint-plugin-react-hooks`: `^4.6.0` → `^4.6.0 || ^5.0.0` (React 19 / Next 15 대응)
  - `eslint-plugin-unused-imports`: `^3.0.0` → `^3.0.0 || ^4.0.0`
  - `@next/eslint-plugin-next`: 미출시 `^16.0.0` 범위 제거

### Fixed

- **Prettier 충돌**: `rules/react/react.js` 오브젝트 리터럴 공백 누락 수정
- **잘못된 기본 설정 제거**: `presets/react.js`, `presets/next.js`의 `better-tailwindcss.entryPoint`가 패키지 내부 경로(`node_modules/smartm2m-eslint-config/src/styles/tailwind.css`)를 가리키던 문제 제거 (플러그인도 peerDeps에 없어 실제로 동작하지 않던 설정)

### Removed

- **deprecated TS 규칙**: `@typescript-eslint/semi` (typescript-eslint v8에서 제거된 규칙)
- **리팩터 잔해**: 빈 `configs/` 디렉토리, 추적되던 `smartm2m-eslint-config-1.0.0.tgz`, 미사용 `dist/` 디렉토리
- **주석 불일치 정리**: `consistent-return`, `exhaustive-deps` 주석의 `(warn)`/`(off)` 표기 실제 값과 동기화

### Docs

- README에 `eslint-import-resolver-typescript` 설치 안내, peerDep 호환 범위 주석 추가
- Tailwind 예제를 "tsconfig 경로 오버라이드" 예제로 변경 + Tailwind 규칙은 사용자 직접 설치 안내
- "포함된 설정" 섹션에 이번 릴리스 신규 규칙 반영 (React, Next.js)

---

## [1.0.3] - 2026-03-05

### Added

- **Presets + Rules 구조**: 확장을 위한 디렉터리 구조 도입
  - `presets/`: base, react, next, full (조합된 설정)
  - `rules/`: base(javascript, imports, globals), typescript, react, next, accessibility, formatting (도메인별 규칙)
  - 새 프리셋 추가 시 `rules/*`만 조합하면 됨
- **rules 라인별 주석**: 각 규칙마다 "무엇인지 + (warn/error/off)" 주석 추가 (변경/검토용)

### Changed

- **Config 구조**: `configs/` 제거, `presets/`·`rules/`로 이전
  - 기존 export 경로 유지: `./react`, `./next`, `./ts`, `./a11y`, `./import`, `./prettier` (하위 호환)

---

## [1.0.2] - 2025-03-05

### Changed

- **Import rules**: `import/order`(eslint-plugin-import)만 비활성화
  - import 순서는 `eslint-plugin-simple-import-sort`로 관리, `import/order`는 사용하지 않음

---

## [1.0.1]

### Changed

- **Import rules**: `import/order` → `eslint-plugin-simple-import-sort`로 교체
  - 더 단순한 설정, FE 트렌드에 맞춘 import 정렬
- **Config 구조**: General JavaScript 규칙을 `configs/base-rules.js`로 분리하여 중복 제거
- **README**: 설치 섹션 통합 (npm/yarn/pnpm), Config Structure, ESLint 9 Flat Config 안내 추가

### Added

- `eslint-plugin-simple-import-sort` peerDependency 추가
- `test:import-sort`, `test:import-sort:fail` 스크립트로 import 규칙 검증

---

## [1.0.0] - Initial Release

### Features

- **React config** (`smartm2m-eslint-config/react`)
  - React, React Hooks, React Refresh 규칙
  - JSX 관련 규칙 (key, self-closing, Fragment 등)

- **Next.js config** (`smartm2m-eslint-config/next`)
  - React 설정 기반 + Next.js 전용 규칙
  - Link, Image 컴포넌트 사용 강제/권장
  - Document Head, Script 관련 규칙

- **TypeScript config** (`smartm2m-eslint-config/ts`)
  - 네이밍 컨벤션 (camelCase, PascalCase, I/T 접두사 금지)
  - `any` 경고, `as const` 권장

- **Import rules** (`smartm2m-eslint-config/import`)
  - Import 정렬, 미사용 import 제거
  - 중복/자기 자신 import 방지
  - 절대 경로 권장 (`@/` prefix, `no-relative-import-paths`)

- **A11y config** (`smartm2m-eslint-config/a11y`)
  - JSX 접근성 규칙 (alt, ARIA, label 등)

- **Prettier integration** (`smartm2m-eslint-config/prettier`)
  - Prettier 통합 및 ESLint 충돌 규칙 비활성화

- **ESLint 9 Flat Config** 전용 (`.eslintrc` 미지원)
