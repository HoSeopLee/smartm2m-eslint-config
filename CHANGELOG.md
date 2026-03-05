# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - Unreleased

> npm 배포 전, 추가 다듬기 후 체크리스트 확인하고 배포 예정.

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
