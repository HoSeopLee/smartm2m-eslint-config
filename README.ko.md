# smartm2m-eslint-config

[English](./README.md) | **한국어**

SmartM2M 프로젝트를 위한 공유 ESLint 설정 패키지입니다.

- React, Next.js, TypeScript, Prettier, 접근성(a11y) 규칙 포함
- 📦 [npm 패키지](https://www.npmjs.com/package/smartm2m-eslint-config)
- 🐙 [GitHub 저장소](https://github.com/HoSeopLee/smartm2m-eslint-config)

> ⚠️ **ESLint 9 Flat Config 전용**
> 이 설정은 ESLint 9 Flat Config 형식을 사용하며, `.eslintrc`(레거시) 형식은 지원하지 않습니다.

> 📌 **버전 사용 안내 (2026-07-13 기준)**
>
> - **`1.1.1` 사용 권장** — tsconfig 탐색, Flat Config 조합, peer 호환 범위, 정적 `target="_blank"` 검사를 수정했습니다.
> - 커스텀 type-aware `typescript-eslint` 규칙이 기존 preset의 암묵적인 tsconfig 탐색에 의존했다면 [Type-aware 규칙 사용](#type-aware-규칙-사용)을 참고해 `projectService: true` 또는 명시적인 `project` 경로를 설정하세요.
> - `1.0.7` 이하에서 업그레이드한다면 소비자 override의 `react/*` 규칙명을 대응하는 `@eslint-react/*` 규칙명으로 변경해야 합니다.
> - `1.0.7` 이하에서 업그레이드한다면 `eslint-plugin-import`를 `eslint-plugin-import-x`로 교체해야 합니다.
> - 전체 버전 기록과 마이그레이션 절차는 [CHANGELOG](./CHANGELOG.md)를 확인하세요.

## 호환성

| 구성 요소                         | 지원 범위       | 참고                                       |
| --------------------------------- | --------------- | ------------------------------------------ |
| Node.js                           | `>=20.19.0`     | Node.js 20, 22, 24에서 테스트              |
| ESLint / `@eslint/js`             | `>=9 <10`       | ESLint 9 Flat Config 전용                  |
| TypeScript                        | `>=4.8.4 <6`    | TypeScript 6 지원은 v2에서 진행 예정       |
| `typescript-eslint`               | `>=8 <9`        | 최소·최신 peer 조합 모두 테스트            |
| `@eslint-react/eslint-plugin`     | `^2.13.0`       | ESLint 9 기반 v1 통합                      |
| `@next/eslint-plugin-next`        | `>=15 <17`      | 선택 사항이며 Next preset에서만 필요       |
| ESLint 10                         | 미지원          | `eslint-plugin-jsx-a11y` 공식 지원 대기 중 |

CI는 Node.js 20.19에서 선언된 최소 의존성 버전을 검사하고, Node.js 20·22·24에서 허용 범위 내 최신 의존성 조합을 검사합니다.

## Config Structure

이 패키지는 **presets**(조합된 설정)와 **rules**(도메인별 규칙)로 확장 가능한 구조입니다.

### Presets (프리셋)

| Config                                 | 설명                                           |
| -------------------------------------- | ---------------------------------------------- |
| `smartm2m-eslint-config`               | 기본 (React preset re-export)                  |
| `smartm2m-eslint-config/react`         | React 프로젝트용 전체 설정                     |
| `smartm2m-eslint-config/next`          | Next.js 프로젝트용 전체 설정                   |
| `smartm2m-eslint-config/presets/base`  | JS + import + prettier (React/TS 없음, 확장용) |
| `smartm2m-eslint-config/presets/react` | React preset (react.js와 동일)                 |
| `smartm2m-eslint-config/presets/next`  | Next.js preset (next.js와 동일)                |
| `smartm2m-eslint-config/presets/full`  | 전체 규칙 (현재는 next와 동일)                 |

### Rules (규칙 모듈)

| Config                            | 설명            |
| --------------------------------- | --------------- |
| `smartm2m-eslint-config/ts`       | TypeScript 규칙 |
| `smartm2m-eslint-config/import`   | Import 규칙     |
| `smartm2m-eslint-config/a11y`     | 접근성 규칙     |
| `smartm2m-eslint-config/prettier` | Prettier 통합   |

내부 구조: `rules/base/`, `rules/typescript/`, `rules/react/`, `rules/next/`, `rules/accessibility/`, `rules/formatting/` 에서 규칙을 조합해 presets를 만듭니다.

## 설치

```bash
# 1단계: 라이브러리 설치 (npm / yarn / pnpm)
npm install -D smartm2m-eslint-config
# yarn add -D smartm2m-eslint-config
# pnpm add -D smartm2m-eslint-config

# 2단계: 필수 의존성 설치 (yarn/pnpm 사용 시 npm을 yarn 또는 pnpm으로 교체)
npm install -D @eslint/js @eslint-react/eslint-plugin@^2.13.0 eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-jsx-a11y eslint-plugin-no-relative-import-paths eslint-plugin-prettier eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort eslint-plugin-unused-imports globals prettier typescript typescript-eslint

# Next.js 프로젝트인 경우 추가 설치 (optional)
npm install -D @next/eslint-plugin-next
```

> **참고**:
>
> - 패키지 매니저마다 peer dependency 처리 방식이 다르므로, 위에 나열한 peer를 소비자 프로젝트에 명시적으로 설치하는 것을 권장합니다.
> - `@next/eslint-plugin-next` 는 `peerDependenciesMeta`에서 `optional: true`로 지정되어 있어, 사용하지 않는 프로젝트에서는 설치 생략 가능합니다.
> - Next.js 프레임워크와 플러그인의 major가 반드시 같을 필요는 없지만, 플러그인 14.x는 ESLint 9을 지원하지 않아 제외합니다. 이 패키지에서는 플러그인 15.x 또는 16.x를 사용하세요.
> - peerDependencies는 검증한 major 범위에만 상한을 열어 둡니다. 새 major는 호환성 테스트 후 지원 범위를 확대합니다.
> - `@eslint-react/eslint-plugin@2.13.0` 은 ESLint 9와 Node.js 20.19+를 지원합니다. ESLint 9를 유지하는 현재 패키지와의 호환을 위해 2.x로 고정합니다.
> - v1.0.8 부터 `eslint`, `@eslint/js` 는 `>=9.0.0 <10.0.0` 으로 상한이 지정됩니다 — `eslint-plugin-jsx-a11y`가 아직 eslint 10 API 를 지원하지 않기 때문입니다. 생태계가 eslint 10 을 지원하면 상한 완화 재검토 예정.
> - **`eslint-plugin-import` 는 사실상 유지보수 정체 상태라 활발히 유지되는 포크인 [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) 로 교체**되었습니다. 규칙 prefix 는 `import-x/*`.

## 사용 방법

### React 프로젝트

프로젝트의 `eslint.config.js` (또는 `eslint.config.mjs`) 파일에서:

```javascript
// 방법 1: 명시적으로 react 사용 (권장)
import reactConfig from 'smartm2m-eslint-config/react';

export default reactConfig;

// 방법 2: 기본 export 사용 (하위 호환성)
import eslintConfig from 'smartm2m-eslint-config';

export default eslintConfig;
```

### Next.js 프로젝트

Next.js 프로젝트의 경우 `smartm2m-eslint-config/next`를 사용하세요:

```javascript
import nextConfig from "smartm2m-eslint-config/next";

export default nextConfig;
```

> **참고**:
>
> - Next.js 설정은 React 설정을 기반으로 하며, Next.js 전용 규칙이 추가로 적용됩니다.
> - 기본 export (`smartm2m-eslint-config`)는 React 설정을 반환하며, 하위 호환성을 위해 유지됩니다.
> - 새로운 프로젝트에서는 명시적으로 `/react` 또는 `/next`를 사용하는 것을 권장합니다.

### 개별 모듈 사용

프리셋은 Flat Config 배열이고, 규칙 모듈은 단일 config 객체입니다.

```javascript
import reactConfig from "smartm2m-eslint-config/react";

export default [
  ...reactConfig,
  {
    rules: {
      "no-console": "error",
    },
  },
];
```

`/ts`는 parser와 plugin을 포함한 독립 TypeScript config 객체이므로 단독으로 사용할 수 있습니다.

```javascript
import tsConfig from "smartm2m-eslint-config/ts";

export default [tsConfig];
```

`/a11y`, `/import`, `/prettier`는 커스텀 프리셋 제작용 규칙 조각입니다. 일반 React/Next 프로젝트에서는 이미 기본 프리셋에 포함되어 있으므로 다시 추가할 필요가 없습니다.

### 설정 확장

기본 설정을 확장하여 커스터마이징할 수 있습니다:

```javascript
import eslintConfig from "smartm2m-eslint-config";

export default [
  ...eslintConfig,
  {
    rules: {
      // 추가 규칙 또는 규칙 오버라이드
      "no-console": "error",
    },
  },
];
```

### TypeScript 프로젝트 설정

기본 프리셋은 type-aware 규칙을 사용하지 않으므로 tsconfig 탐색을 강제하지 않습니다. 일반적인 React, Vite, Next.js 프로젝트는 별도 `parserOptions.project` 설정 없이 위의 React/Next 예제를 그대로 사용하면 됩니다.

#### 프로젝트 규칙 덮어쓰기

프리셋 배열 뒤에 프로젝트 설정을 추가하면 기존 규칙을 덮어쓸 수 있습니다.

```javascript
import reactConfig from "smartm2m-eslint-config/react";

export default [
  ...reactConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
```

Next.js에서는 import 경로만 변경합니다.

```javascript
import nextConfig from "smartm2m-eslint-config/next";

export default [
  ...nextConfig,
  {
    rules: {
      "no-console": "warn",
    },
  },
];
```

#### Type-aware 규칙 사용

타입 정보가 필요한 `typescript-eslint` 규칙을 추가할 때만 `recommendedTypeChecked`와 `projectService`를 활성화합니다. `eslint.config.mjs`가 프로젝트 루트에 있다면 `import.meta.dirname`이 해당 프로젝트의 tsconfig 기준 경로가 됩니다.

```javascript
import reactConfig from "smartm2m-eslint-config/react";
import tseslint from "typescript-eslint";

export default [
  ...reactConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ...tseslint.configs.disableTypeChecked,
    files: ["**/*.{js,jsx}"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

type-aware lint는 TypeScript Program을 생성하므로 기본 설정보다 느립니다. 실제로 타입 정보가 필요한 규칙을 사용할 때만 추가하세요.

Vite처럼 타입 검사용 tsconfig를 명시해야 한다면 `projectService` 대신 `project`에 경로를 지정할 수 있습니다.

```javascript
import reactConfig from "smartm2m-eslint-config/react";
import tseslint from "typescript-eslint";

export default [
  ...reactConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ...tseslint.configs.disableTypeChecked,
    files: ["**/*.{js,jsx}"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

Next.js는 보통 루트 `tsconfig.json`을 사용하므로 `project: ["./tsconfig.json"]`으로 바꾸면 됩니다.

예전 `eslint-plugin-react` 설정에서 사용하던 다음 옵션은 현재 패키지의 `@eslint-react/eslint-plugin`에는 필요하지 않습니다.

```javascript
settings: {
  react: {
    version: "detect",
  },
},
```

소비자 프로젝트가 legacy `eslint-plugin-react`를 별도로 함께 사용한다면 그때만 프로젝트 override에 위 설정을 추가하세요.

#### 모노레포

모노레포에서는 각 앱 디렉터리에 `eslint.config.mjs`를 두고 해당 앱에서 lint를 실행하는 구성이 가장 단순합니다.

```text
apps/
  web/
    eslint.config.mjs
    tsconfig.json
  admin/
    eslint.config.mjs
    tsconfig.json
```

```bash
pnpm --filter web exec eslint .
pnpm --filter admin exec eslint .
```

각 앱의 설정 파일은 위 React/Next 예제를 그대로 사용합니다. type-aware 규칙이 필요하면 각 앱 설정에서 `tsconfigRootDir: import.meta.dirname`을 지정하세요. 이렇게 하면 workspace 루트에서 명령을 실행해도 앱별 tsconfig 기준이 바뀌지 않습니다.

#### Import alias 경로 변경

기본 import alias는 `src` 기준 `@`입니다. 다른 구조라면 프로젝트 설정에서 변경합니다.

```javascript
import reactConfig from "smartm2m-eslint-config/react";

export default [
  ...reactConfig,
  {
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        {
          allowSameFolder: true,
          rootDir: "source",
          prefix: "@",
        },
      ],
    },
  },
];
```

> **Tailwind CSS 규칙이 필요한 경우**: `better-tailwindcss`, `eslint-plugin-tailwindcss` 같은 플러그인은 이 패키지에 포함되어 있지 않습니다. 프로젝트에서 직접 설치·설정해 `settings`/`plugins`/`rules`에 추가하세요.

> **참고**: `no-relative-import-paths` 규칙은 `rootDir: 'src'`, `prefix: '@'`를 기본값으로 사용합니다. 다른 구조를 사용하는 프로젝트는 해당 규칙을 오버라이드하세요.

## 포함된 설정

### React

- React 및 React Hooks 관련 규칙
- JSX 키, 중복 props, 정의되지 않은 JSX 사용 방지
- 배열 인덱스를 key로 사용 시 경고
- boolean prop과 Fragment 축약형 사용 권장
- state 직접 변경 방지, deprecated API 사용 경고
- Context Provider에 불안정한 객체/배열 전달 경고 (`@eslint-react/no-unstable-context-value`)
- Hooks 호출 규칙 강제 (`react-hooks/rules-of-hooks`, error)
  - `react-hooks/exhaustive-deps` 는 **기본 off** (v1.0.7~, stable 값 false positive 과다). 엄격 검사 원하면 consumer 측에서 opt-in
  - `@eslint-react/no-leaked-conditional-rendering`은 **기본 off**. 필요한 프로젝트만 opt-in

### TypeScript

- TypeScript 관련 규칙 및 네이밍 컨벤션
- `any` 사용 경고, 빈 함수 경고
- `as const` 사용 권장
- interface/type 앞에 I, T 접두사 사용 불가

### 접근성 (a11y)

- JSX 접근성 규칙
- 이미지 alt 텍스트, ARIA 속성 검증
- 컨트롤과 레이블 연결, 클릭 이벤트와 키 이벤트 연결
- 테이블 헤더의 `scope` 속성 검사
- 비대화형 요소에 tabindex 사용 금지

### Import

- Import 순서 자동 정렬 (`eslint-plugin-simple-import-sort` 사용, `import-x/order`는 비활성화)
  - side-effect → `node:` → `react`/`next` → 외부 패키지 → `@/` → 절대 경로 → 상대 경로 → CSS 순
- 미사용 import 자동 정리 (`unused-imports/no-unused-imports`)
- 중복 import 방지 (`import-x/no-duplicates`, `import-x/no-self-import`)
- 절대 경로 사용 권장 (`@/` prefix, `src` 기준, 상대 경로 경고)
- 플러그인은 `eslint-plugin-import` 가 아닌 활발히 유지되는 포크 [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) 사용

### Prettier

- Prettier 통합 및 충돌 방지
- 코드 포맷팅 자동화

### 일반 JavaScript

- `===` 사용 강제 (`==` 금지)
- `eval` 사용 금지
- `debugger`, `alert` 사용 경고
- 사용되지 않은 표현식 경고
- 구조 분해 할당 권장 (객체만, `prefer-destructuring`)
- 배열 메서드 콜백에서 return 문 체크 (버그 방지)
- switch 문 fallthrough 방지
- 생성자에서 return 사용 방지
- 중첩된 삼항 연산자 경고
- `no-implicit-coercion`은 off (v1.0.5): `!!x`, `+x` 등 JS 관용 표현 허용

### Next.js (선택 사항)

- Next.js 전용 ESLint 규칙 적용
- `<a>` 태그 대신 Next.js `Link` 컴포넌트 사용 강제
- `<img>` 태그 대신 Next.js `Image` 컴포넌트 사용 권장
- Document Head 관련 규칙 (next/head 사용 권장)
- Next.js API 이름 오타 검사
- Google Fonts 최적화 체크 (`display`, `preconnect` 속성)
- `<Script>` 컴포넌트 `id` 속성 필수 (`inline-script-id`)
- Google Analytics는 `next/script` 사용 권장 (`next-script-for-ga`)
- Next.js 빌드 파일 무시 (`.next/`, `out/`, `next-env.d.ts` 등)

> **참고**: Next.js 설정은 React 설정의 모든 기능을 포함하며, Next.js 특화 규칙이 추가로 적용됩니다.

## 라이선스

MIT
