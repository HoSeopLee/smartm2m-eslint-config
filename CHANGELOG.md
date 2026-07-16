# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **버전 히스토리 참고사항**
>
> - **1.0.3**: npm에 publish 되지 않은 내부 준비(prep) 버전. `package.json` 에만 존재했고, `presets/` + `rules/` 구조 리팩터 작업을 하다가 다듬기 후 1.0.4 로 통합 발행됨. npm 레지스트리에서는 조회 불가.
> - **1.0.4**: 공개 발행되었으나 `no-implicit-coercion` + `react/jsx-no-leaked-render`(coerce) 오토픽스 체인이 `{x && <Y/>}` → `{Boolean(x) && <Y/>}` 형태로 코드를 장황하게 변환하는 이슈가 있음. 1.0.7 이상 사용 권장 (`npm deprecate` 처리).
> - **1.0.5**: `jsx-no-leaked-render` 가 `ternary` 전략으로 autofix 되어 코드가 `{x ? <Y/> : null}` 로 강제 변환됨. 팀 코드 스타일과 상충되어 1.0.6 에서 해당 규칙을 off 처리. 1.0.7 이상 사용 권장.
> - **1.0.6**: `react-hooks/exhaustive-deps` 를 `warn` 으로 유지하여 엄격한 hook dependency 검사가 가능한 유효한 선택지입니다. 다만 stable 값(queryClient, setter, 커스텀 훅 반환값)에 대한 false positive 경고가 자주 발생할 수 있어, 일반 프로젝트엔 1.0.7 사용을 권장합니다. **deprecated 아님.**

## [Unreleased]

### Breaking

- ESLint 10, Node.js 22.13+, TypeScript 6 기반의 2.x 지원 범위로 전환
- `eslint-plugin-jsx-a11y`를 ESLint 10 호환 포크 `eslint-plugin-jsx-a11y-x`로 교체하고 규칙 prefix를 `jsx-a11y-x/*`로 변경
- ESLint 10을 지원하지 않는 `eslint-plugin-no-relative-import-paths`를 제거
- `@eslint-react/eslint-plugin` 5.x의 새 규칙명으로 전환하고 v5에서 제거된 규칙은 설정에서 제거

### Changed

- 상위 폴더 상대 import 제한을 ESLint 내장 `no-restricted-imports` 규칙으로 대체
- CI를 Node.js 22.13 최소 peer 조합과 Node.js 22/24/25 최신 peer 조합으로 갱신

### Added

- `jsx-a11y-x/alt-text`와 상위 폴더 상대 import 제한을 검증하는 규칙 fixture 추가

## [1.1.1] - 2026-07-16

### Upgrade notes

- 기본 preset은 더 이상 `parserOptions.project`를 강제하지 않음. 소비자 설정에서 type-aware `typescript-eslint` 규칙을 추가하고 기존의 암묵적 tsconfig 탐색에 의존했다면 `projectService: true` 또는 명시적인 `project` 경로를 설정해야 함

### Changed

- Node.js 최소 버전을 `>=20.19.0`으로 명시하고 CI 대상을 Node.js 20/22/24로 조정
- peerDependencies를 검증한 major 범위로 제한
- ESLint 9 호환 하한에 맞춰 `eslint-plugin-react-hooks >=5`, `eslint-plugin-unused-imports >=4`로 조정하고 Prettier 3 peer를 명시
- ESLint 9을 지원하는 실제 하한에 맞춰 `eslint-plugin-jsx-a11y >=6.10.0`으로 조정
- 실제 사용 중인 옵션과 ESLint 9 호환 하한에 맞춰 `eslint-plugin-no-relative-import-paths >=1.6.0`, `@next/eslint-plugin-next >=15.0.0`으로 조정
- JavaScript parser의 `ecmaVersion`을 `latest`로 통일
- `npm test`가 설정 로드, 실제 lint, import 정렬, 규칙 fixture 검사를 모두 실행하도록 보강
- CI에 최소 지원 peer 조합과 허용 범위 내 최신 peer 조합 매트릭스 추가
- 실패를 성공으로 처리하던 구형 Bash 테스트 경로를 제거하고 Node.js 테스트로 통일

### Fixed

- type-aware 규칙 없이 `project: true`를 강제해 tsconfig 외부 파일에서 parsing error가 발생하던 문제 수정
- `smartm2m-eslint-config/ts`를 parser와 plugin이 포함된 독립 Flat Config 객체로 수정
- `typescript-eslint@8.0.0`에서도 preset이 중첩 배열이 되지 않도록 React/Next 구성을 표준 Flat Config 배열로 직접 export
- React 플러그인 전환 후 남아 있던 `react/jsx-no-leaked-render` 규칙명을 현재 `@eslint-react/no-leaked-conditional-rendering`으로 정정 (`off` 유지)
- `target={"_blank"}` 같은 정적 JSX 표현식에서도 `noopener` 누락을 감지하도록 보강
- README의 중첩 Flat Config 배열 예제 수정
- 영문 `README.md`와 한국어 `README.ko.md`를 분리하고 언어 전환 링크 추가
- 영문·한국어 README에 Node.js, ESLint, TypeScript 및 주요 플러그인 호환성 표 추가

## [1.1.0] - 2026-07-10

### Changed

- `eslint-plugin-react`를 ESLint 9 호환 유지보수 버전인 `@eslint-react/eslint-plugin@^2.13.0`으로 교체
- 기존 `react/*` 규칙은 대응하는 `@eslint-react/*` 규칙으로 전환. `target="_blank"`의 `rel="noopener"` 허용 정책은 로컬 rule로 유지
- `@eslint-react/eslint-plugin`의 peer 요구사항에 맞춰 `typescript` peerDependency 추가

### Breaking

- consumer 설정에서 직접 override하던 `react/*` 규칙은 `@eslint-react/*` 규칙명으로 변경 필요

## [1.0.8] - 2026-04-24

> ⚠️ **v1.0.7 → v1.0.8 업그레이드 시 필수 작업 (Breaking peerDep 변경)**
>
> `eslint-plugin-import` 가 활발히 유지되는 fork `eslint-plugin-import-x` 로 교체되었습니다.
>
> **교체 사유**
>
> - 본가 `eslint-plugin-import` 의 **유지보수 정체** — 최근 release 가 1 년 이상 부재, 누적된 PR/이슈 처리 지연, eslint 10 / TypeScript 신규 버전 대응 미진
> - fork `eslint-plugin-import-x` ([un-ts/eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)) 는 동일한 규칙 베이스 위에서 정기 릴리스 + TypeScript-first 리졸버 + ESLint 9 flat config 친화적 API 를 제공, 생태계가 점차 이전 중
> - 본 패키지는 어차피 `no-duplicates`, `no-self-import` 두 규칙만 사용하므로 마이그레이션 비용 대비 유지보수 안정성 이득이 큼
>
> **업그레이드 명령**
>
> ```bash
> npm uninstall eslint-plugin-import eslint-import-resolver-typescript
> npm install -D eslint-plugin-import-x
> ```
>
> consumer 의 `eslint.config.js` 에서 `import/*` 규칙을 직접 override 한 적이 있다면 prefix 를 `import-x/*` 로 변경하세요. (이 패키지가 활성화하는 import 규칙은 `import-x/no-duplicates`, `import-x/no-self-import` 2 개뿐이라 lint 결과 자체는 동일합니다.)

### Security

- 보안 audit 환경 기록: 메인테이너 lock 환경 기준 transitive 의존성이 패치 버전으로 정상 resolve 되는지 확인 (`pnpm audit` clean)
  - `flatted` 3.4.2 (GHSA-25h7-pfq9-p65f DoS, GHSA-rf6f-7fwh-wjgh Prototype Pollution)
  - `brace-expansion` 1.1.14 / 5.0.5 (GHSA-f886-m6hf-6m8v)
  - `picomatch` 2.3.2 / 4.0.4 (GHSA-c2c7-rcm5-vvqj, GHSA-3v7f-55p6-f55p)
- 본 패키지는 lockfile 을 publish 하지 않으므로 위 transitive 패치 버전은 **upstream publish 결과로 사용자도 fresh install 시 자동 반영**됩니다. v1.0.7 환경에서도 동일하게 받습니다 (이번 릴리스가 강제하는 사항이 아님).

### Changed

- **peerDependencies `eslint`, `@eslint/js` 상한 `<10.0.0` 추가**
  - `eslint-plugin-react@7.37.x`, `eslint-plugin-jsx-a11y` 등 주요 플러그인이 아직 eslint 10 API (`context.getFilename` 제거 등) 미지원
  - 현 생태계 호환 상한을 peerDep 에 명시적으로 반영 (`>=9.0.0` → `>=9.0.0 <10.0.0`)
  - 플러그인 생태계가 eslint 10 을 지원하면 상한 완화 재검토

- **`eslint-plugin-import` → [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) 전환**
  - 본가 `eslint-plugin-import` 는 최근 release/PR 처리가 지연되어 사실상 유지보수 정체 상태. 활발히 유지되는 fork 인 `eslint-plugin-import-x` 로 이전
  - Plugin key / 규칙 prefix 변경: `import` → `import-x` (예: `import-x/no-duplicates`, `import-x/no-self-import`, `import-x/order` …)
  - 본 패키지에서 실제 활성화 중인 import 규칙은 `no-duplicates`, `no-self-import` **2 개뿐**이라 lint 결과 자체는 동일. 나머지 `import-x/*` 규칙은 종전과 같이 모두 `off`
  - resolver 의존 규칙을 사용하지 않으므로 `settings.import/resolver` 블록 제거. optional peerDep `eslint-import-resolver-typescript` 도 함께 제거
  - peerDep: `eslint-plugin-import: >=2.29.0` → `eslint-plugin-import-x: >=4.0.0`
  - **Consumer 마이그레이션**: `npm uninstall eslint-plugin-import` 후 `npm i -D eslint-plugin-import-x`. consumer 의 `eslint.config.js` 에서 `import/*` 규칙을 직접 override 한 경우 prefix 를 `import-x/*` 로 변경 필요

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
