# ESLint 설정 테스트

이 디렉토리는 ESLint 설정 파일이 올바르게 작동하는지 테스트하기 위한 파일들을 포함합니다.

## 테스트 실행 방법

```bash
# 전체 테스트
npm test

# 개별 테스트
npm run test:load
npm run test:lint
npm run test:import-sort
npm run test:rules
```

## 테스트 구조

- `fixtures/`: 테스트용 샘플 파일들
  - `good.tsx`: 올바른 코드 예시
  - `bad.tsx`: 잘못된 코드 예시 (의도된 규칙 위반)
  - `Header.tsx`: 헬퍼 컴포넌트
  - `test-next.tsx`: Next.js 전용 테스트 파일
- `test-config.js`: Node.js 기반 설정 파일 테스트 스크립트
- `test-load.js`: 설정 파일 로드 테스트 스크립트

## 테스트 방법

ESLint 설정 파일을 테스트하는 일반적인 방법은 다음과 같습니다:

1. **통합 테스트**: 실제 파일에 ESLint를 실행하여 설정이 올바르게 작동하는지 확인
2. **수동 테스트**: 실제 프로젝트에서 설정을 사용해보고 결과 확인
3. **CI/CD 통합**: GitHub Actions 등에서 자동으로 테스트 실행

## 참고

ESLint 설정 파일 자체를 직접 테스트하는 것은 일반적이지 않지만, 많은 오픈소스 프로젝트에서는 실제 파일에 대해 ESLint를 실행하는 통합 테스트 방식을 사용합니다.
