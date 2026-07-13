# 1.x와 2.x 동시 릴리스 관리

이 문서는 `main`이 2.x를 개발·릴리스하고, 1.x도 보안 수정 또는 호환성 수정으로 계속 지원하는 시점의 운영 기준이다.

## 결론

```text
main                  -> 2.x 개발, 다음 2.x 릴리스
release/1.x           -> 1.x 유지보수, 다음 1.x 릴리스
npm latest            -> 최신 2.x
npm legacy-v1         -> 최신 1.x
Git tag v1.1.1/v2.0.1 -> 각각의 실제 릴리스 커밋 (절대 이동·재사용하지 않음)
```

`v1.1.0`과 `v2.0.0`은 Git 태그이며, 한 번 만든 태그의 내용은 바꾸지 않는다. 1.x를 고쳐야 하면 `v1.1.1` 또는 `v1.2.0`을 새로 발행한다. 2.x도 같은 방식으로 `v2.0.1`, `v2.1.0`을 만든다.

## 처음 2.x를 릴리스할 때 한 번만 하는 일

2.0.0 릴리스 직전에 현재 1.x 최종 태그에서 유지보수 브랜치를 만들고, 해당 버전에 npm `legacy-v1` 태그를 지정한다. 예시는 `v1.1.0`이 1.x의 마지막 릴리스인 경우다.

```bash
git fetch origin --tags
git switch -c release/1.x v1.1.0
git push -u origin release/1.x
npm dist-tag add smartm2m-eslint-config@1.1.0 legacy-v1
npm dist-tag ls smartm2m-eslint-config

git switch main
git pull --ff-only
git switch -c chore/release-v2.0.0
npm version 2.0.0 --no-git-tag-version
# CHANGELOG의 Unreleased를 [2.0.0] - YYYY-MM-DD로 변경
npm test
git add package.json CHANGELOG.md
git commit -m "chore(release): prepare v2.0.0"
git push -u origin chore/release-v2.0.0
# main 대상 PR을 열어 CI·리뷰 후 병합

git switch main
git pull --ff-only
git tag -a v2.0.0 -m "v2.0.0"
git push origin v2.0.0
npm publish --tag latest
npm dist-tag ls smartm2m-eslint-config
```

`release/1.x`는 v1 소비자 지원 기간 동안 삭제하지 않는다. 1.x 지원 종료 뒤에는 Git 태그가 남아 있으므로 브랜치를 삭제해도 과거 릴리스는 보존된다.

## npm 태그의 의미

Git 태그와 npm 태그는 다르다.

| 용도 | 값 | 소비자 영향 |
| --- | --- | --- |
| Git 태그 | `v1.1.1`, `v2.0.0` | 어떤 커밋을 릴리스했는지 고정 |
| npm `latest` | 최신 2.x | `npm install smartm2m-eslint-config`가 받는 버전 |
| npm `legacy-v1` | 최신 1.x | `npm install smartm2m-eslint-config@legacy-v1`가 받는 버전 |

2.0.0 전환 시 마지막 1.x에 `legacy-v1` 태그를 미리 지정한다. 이후 1.x 유지보수 릴리스는 발행할 때 같은 태그를 사용한다.

```bash
npm publish --tag legacy-v1
npm dist-tag ls smartm2m-eslint-config
```

이미 npm에 발행된 버전에 태그만 추가할 때는 다음을 사용한다.

```bash
npm dist-tag add smartm2m-eslint-config@1.1.0 legacy-v1
```

2.x가 `latest`인 상태에서 1.x를 `latest`로 발행하면 안 된다. 기존 소비자가 의도치 않게 1.x로 내려갈 수 있다.

## 1.x만 수정해야 할 때

대상은 `main`이 아니라 `release/1.x`다. 예: ESLint 9 환경에서만 발생하는 버그·보안 수정·문서 수정.

1. `release/1.x`에서 작업 브랜치를 만든다.

```bash
git fetch origin
git switch release/1.x
git pull --ff-only
git switch -c fix/1.x-<short-description>
```

2. 수정, CHANGELOG의 `Unreleased` 갱신, `npm test`를 실행한다.
3. `release/1.x` 대상으로 PR을 열고 CI·리뷰를 통과시킨 뒤 병합한다.
4. 병합된 `release/1.x`에서 릴리스 준비 브랜치를 만들고 버전·CHANGELOG PR을 병합한다.
5. 갱신된 `release/1.x` 커밋에 태그를 만들고 발행한다.

```bash
git switch release/1.x
git pull --ff-only
git switch -c chore/release-v1.1.1
npm version patch --no-git-tag-version # 예: 1.1.0 -> 1.1.1
# CHANGELOG의 Unreleased를 [1.1.1] - YYYY-MM-DD로 변경
npm test
git add package.json CHANGELOG.md
git commit -m "chore(release): prepare v1.1.1"
git push -u origin chore/release-v1.1.1
# release/1.x 대상 PR을 열어 CI·리뷰 후 병합

git switch release/1.x
git pull --ff-only
git tag -a v1.1.1 -m "v1.1.1"
git push origin v1.1.1
npm publish --tag legacy-v1
npm dist-tag ls smartm2m-eslint-config
```

새 기능이지만 1.x와 하위 호환이면 `npm version minor --no-git-tag-version`으로 `v1.2.0`을 발행한다. 소비자가 바꾸어야 하는 변경은 1.x에 넣지 않고 2.x `main`에만 넣는다.

1.x의 수정이 2.x에도 필요한 경우에는 `main`에 별도 PR을 열거나, `release/1.x` 병합 커밋을 `main`에 cherry-pick 한다. 반대로 2.x의 변경을 1.x로 그대로 병합하지 않는다. 의존성·API가 달라 충돌하거나 의도치 않은 breaking change가 섞일 수 있다.

## 2.x만 수정해야 할 때

대상은 `main`이다.

```bash
git fetch origin
git switch main
git pull --ff-only
git switch -c fix/2.x-<short-description>
```

수정 후 `main` 대상으로 PR을 병합한다. 이어서 별도 릴리스 준비 PR에서 버전과 CHANGELOG를 갱신하고, 병합된 `main` 커밋을 `latest`로 발행한다.

```bash
git switch main
git pull --ff-only
git switch -c chore/release-v2.0.1
npm version patch --no-git-tag-version # 예: 2.0.0 -> 2.0.1
# CHANGELOG의 Unreleased를 [2.0.1] - YYYY-MM-DD로 변경
npm test
git add package.json CHANGELOG.md
git commit -m "chore(release): prepare v2.0.1"
git push -u origin chore/release-v2.0.1
# main 대상 PR을 열어 CI·리뷰 후 병합

git switch main
git pull --ff-only
git tag -a v2.0.1 -m "v2.0.1"
git push origin v2.0.1
npm publish --tag latest
npm dist-tag ls smartm2m-eslint-config
```

하위 호환 기능은 `minor`, breaking change는 다음 major를 사용한다. `npm version`이 바꾸는 파일을 확인하고, lockfile을 배포하지 않는 이 저장소에서는 `package.json`과 CHANGELOG만 릴리스 커밋에 포함한다.

## 병합과 브랜치 삭제 원칙

기능·수정 브랜치는 PR 병합 후 삭제한다. 릴리스는 **병합된 대상 브랜치의 커밋**에서 태그를 찍고 npm에 발행한다.

브랜치에서만 작업해 태그를 찍고 브랜치를 삭제하는 방식은 기술적으로 가능하지만 사용하지 않는다. 태그가 남아도 `main`/`release/1.x`의 이력이 릴리스와 달라져 hotfix, CI, 코드 리뷰 기준이 흐려진다.

- `main`: 2.x 지원 중에는 유지한다.
- `release/1.x`: 1.x 지원 중에는 유지한다.
- `fix/*`, `docs/*`, `chore/*`: PR 병합 뒤 삭제한다.
- 1.x 지원 종료: 마지막 1.x 태그와 CHANGELOG를 확인한 뒤 `release/1.x`를 삭제할 수 있다. npm `legacy-v1`은 마지막 1.x 버전을 가리킨 채 남긴다.

## 여러 명이 관리할 때의 최소 규칙

GitHub에서 `main`과 `release/1.x`에 다음 보호 규칙을 적용한다.

1. 직접 push 금지, PR로만 병합.
2. CI 필수 통과. 현재 CI는 `main`만 대상으로 하므로 `release/1.x`를 만들 때 workflow의 `push`/`pull_request` 대상에 추가한다.
3. 최소 한 명의 승인. 본인 변경은 다른 maintainer가 승인한다.
4. 태그 생성과 npm publish 권한은 release maintainer에게만 준다.
5. 릴리스 전 `npm test`, `npm pack --dry-run`, `npm dist-tag ls smartm2m-eslint-config`를 확인한다.

릴리스 담당자는 PR 병합 권한과 npm publish 권한을 분리할 수 있다. 작은 팀에서는 한 사람이 담당해도 되지만, npm 토큰은 개인 계정 공유 대신 npm organization/automation token으로 관리한다.

## 매 릴리스 체크리스트

```text
[ ] 대상 브랜치 확인: 1.x는 release/1.x, 2.x는 main
[ ] SemVer 확인: patch/minor/major 선택
[ ] CHANGELOG의 Unreleased를 실제 버전으로 변경
[ ] package.json 버전 변경
[ ] npm test 통과
[ ] npm pack --dry-run으로 배포 파일 확인
[ ] 대상 브랜치에 릴리스 커밋 병합
[ ] 해당 커밋에 vX.Y.Z annotated tag 생성·push
[ ] 1.x는 npm publish --tag legacy-v1, 2.x는 --tag latest
[ ] npm dist-tag ls로 latest/legacy-v1 확인
[ ] GitHub Release 작성 및 작업 브랜치 삭제
```

`npm publish`는 되돌릴 수 없는 외부 배포다. 태그 push와 publish는 항상 대상 브랜치가 깨끗하고 원하는 커밋인지 `git status`, `git log -1`, `npm pack --dry-run`으로 확인한 다음 실행한다.
