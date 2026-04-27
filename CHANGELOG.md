# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **버전 히스토리 참고사항**
> - **1.0.3**: npm에 publish 되지 않은 내부 준비(prep) 버전. `package.json` 에만 존재했고, `presets/` + `rules/` 구조 리팩터 작업을 하다가 다듬기 후 1.0.4 로 통합 발행됨. npm 레지스트리에서는 조회 불가.
> - **1.0.4**: 공개 발행되었으나 `no-implicit-coercion` + `react/jsx-no-leaked-render`(coerce) 오토픽스 체인이 `{x && <Y/>}` → `{Boolean(x) && <Y/>}` 형태로 코드를 장황하게 변환하는 이슈가 있음. 1.0.7 이상 사용 권장 (`npm deprecate` 처리).
> - **1.0.5**: `jsx-no-leaked-render` 가 `ternary` 전략으로 autofix 되어 코드가 `{x ? <Y/> : null}` 로 강제 변환됨. 팀 코드 스타일과 상충되어 1.0.6 에서 해당 규칙을 off 처리. 1.0.7 이상 사용 권장.
> - **1.0.6**: `react-hooks/exhaustive-deps` 를 `warn` 으로 유지하여 엄격한 hook dependency 검사가 가능한 유효한 선택지입니다. 다만 stable 값(queryClient, setter, 커스텀 훅 반환값)에 대한 false positive 경고가 자주 발생할 수 있어, 일반 프로젝트엔 1.0.7 사용을 권장합니다. **deprecated 아님.**

## [1.0.8] - 2026-04-24

### Security

- 보안 audit 환경 기록: 메인테이너 lock 환경 기준 transitive 의존성이 패치 버전으로 정상 resolve 되는지 확인 (`pnpm audit` clean)
  - `flatted` 3.4.2 (GHSA-25h7-pfq9-p65f DoS, GHSA-rf6f-7fwh-wjgh Prototype Pollution)
  - `brace-expansion` 1.1.14 / 5.0.5 (GHSA-f886-m6hf-6m8v)
  - `picomatch` 2.3.2 / 4.0.4 (GHSA-c2c7-rcm5-vvqj, GHSA-3v7f-55p6-f55p)
- 본 패키지는 lockfile 을 publish 하지 않으므로 위 transitive 패치 버전은 **upstream publish 결과로 사용자도 fresh install 시 자동 반영**됩니다. v1.0.7 환경에서도 동일하게 받습니다 (이번 릴리스가 강제하는 사항이 아님).

### Changed

- **peerDependencies `eslint`, `@eslint/js` 상한 `<10.0.0` 추가**
  - `eslint-plugin-react@7.37.x`, `eslint-plugin-jsx-a11y`, `eslint-plugin-import` 등 주요 플러그인이 아직 eslint 10 API (`context.getFilename` 제거 등) 미지원
  - 현 생태계 호환 상한을 peerDep 에 명시적으로 반영 (`>=9.0.0` → `>=9.0.0 <10.0.0`)
  - 플러그인 생태계가 eslint 10 을 지원하면 상한 완화 재검토

---

## [1.0.7] - 2026-04-21

### Changed

- **`react-hooks/exhaustive-deps`**: `warn` → `off`
  - `useQueryClient()`, `useState` setter, 커스텀 훅 반환값 등 **실제로는 stable 한 값**에 대해 false positive 가 다수 발생해 팀 노이즈 유발
  - 코드 리뷰 + `useCallback`/`useReducer` 패턴으로 stale closure 방어
  - 엄격한 검사 원하는 프로젝트는 consumer `eslint.config.js` 에서 `'react-hooks/exhaustive-deps': 'warn'` 으로 opt-in 가능
- **peerDependencies 전체 `>=` 패턴으로 통일**
  - `^X || ^Y` 나열식 → `>=X.0.0` 으로 단순화
  - 새 major 출시 때마다 수동 릴리스 불필요
  - 호환성 문제 생기면 사후에 상한 추가로 대응
  - 예: `@next/eslint-plugin-next`, `eslint-plugin-react-hooks`, `eslint-plugin-unused-imports` 등

### Docs

- CHANGELOG 상단 버전 히스토리 블록에 1.0.6 상태 설명 추가
- README 버전 사용 안내 업데이트 (1.0.7 권장, 1.0.6 상태 명시)

---

## [1.0.6] - 2026-04-21

### Changed

- **`react/jsx-no-leaked-render`**: `error` → `off`
  - 해당 규칙이 업계 표준(React 공식 recommended, Next.js, Airbnb 기본 프리셋 등)에 포함되지 않는 **선택적 방어 규칙**이라는 점, autofix 가 `{x ? <Y/> : null}` 또는 `{Boolean(x) && <Y/>}` 로 코드를 강제 변환하여 팀 코드 스타일을 해치는 점을 고려해 기본 off 처리
  - **0 리키 버그**(`{list.length && <X/>}` 가 빈 배열일 때 "0" 렌더)는 TypeScript 타입 + 코드리뷰로 방어
  - 엄격한 검사 원하는 프로젝트는 consumer `eslint.config.js` 에서 `'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }]` 로 opt-in 가능

### Removed

- `__tests__/fixtures/rules/jsx-no-leaked-render.tsx` fixture 제거 (규칙 off 로 더 이상 검증 대상 아님)

### Docs

- CHANGELOG / README 버전 히스토리 업데이트 (1.0.6 신규, 1.0.5 보완 설명)
- README "포함된 설정 > React" 섹션에서 `jsx-no-leaked-render` 언급 제거

---

## [1.0.5] - 2026-04-21

### Changed

- **`no-implicit-coercion`**: `warn` → `off`
  - `!!`, `+x`, `'' + x` 같은 JS 관용 표현 허용
  - 1.0.4 에서 이 규칙 autofix 가 `!!x` 를 `Boolean(x)` 로 바꾸던 부작용 제거
- **`react/jsx-no-leaked-render`**: `validStrategies: ['coerce', 'ternary']` → `['ternary']`
  - 오토픽스가 `!!` / `Boolean()` 래핑 대신 **삼항(`cond ? <X/> : null`)** 으로만 변환
  - 위 `no-implicit-coercion` 변경과 연동되어 코드 스타일 일관성 확보

### Fixed

- **`react-hooks/rules-of-hooks`**: `off` → `error` 복구
  - 이전 리팩터 과정에서 실수로 `off` 처리되어 있던 Hooks 필수 규칙 복원 (이 규칙은 React 동작 기반이라 반드시 `error` 여야 함)
- **주석 동기화**: `no-implicit-coercion`, `react-hooks/rules-of-hooks` 의 주석 `(warn/off/error)` 표기를 실제 값과 일치

### Docs

- README "포함된 설정" 섹션의 JavaScript / React 규칙 설명 업데이트
- CHANGELOG 상단에 1.0.3(미발행), 1.0.4(권장 종료) 히스토리 명시

---

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
