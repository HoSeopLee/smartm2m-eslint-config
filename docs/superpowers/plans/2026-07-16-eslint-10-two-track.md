# ESLint 10 Two-Track Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve ESLint 9 support on `release/1.x` while preparing an unmerged ESLint 10-compatible 2.x branch.

**Architecture:** `release/1.x` is created from immutable tag `v1.1.1` and accepts only 1.x maintenance PRs. `main` remains the future 2.x line, while `feature/eslint-10-support` contains compatibility work and is kept unmerged until explicit approval.

**Tech Stack:** GitHub branch rulesets, GitHub Actions, ESLint 10, TypeScript 6, `typescript-eslint`, `eslint-plugin-jsx-a11y-x`.

## Global Constraints

- Do not merge `feature/eslint-10-support` into `main`.
- Do not publish npm packages or create a `v2.0.0` tag.
- Protect `release/1.x` from deletion, force-push, and direct changes.
- Keep all existing React, Next.js, TypeScript, import, formatting, and accessibility fixtures passing.

---

### Task 1: Bootstrap the 1.x maintenance line

**Files:**
- Modify on `release/1.x`: `.github/workflows/ci.yml`

- [ ] Create `release/1.x` from `v1.1.1`.
- [ ] Add `release/1.x` to the workflow's `push` and `pull_request` branch filters.
- [ ] Run `npm test`; expect all suites and five rule fixtures to pass.
- [ ] Push `release/1.x` and create an active GitHub ruleset requiring PRs and all four CI jobs while blocking deletion and force-push.

### Task 2: Prepare ESLint 10 on the feature branch

**Files:**
- Modify: `package.json`
- Modify: `.github/workflows/ci.yml`
- Modify: `rules/accessibility/a11y.js`
- Modify as compatibility requires: existing rule and preset modules
- Modify: `README.md`
- Modify: `README.ko.md`
- Modify: `CHANGELOG.md`
- Test: existing files under `__tests__/`

- [ ] Record the current test baseline with `npm test`.
- [ ] Set the unreleased package version to `2.0.0` and update peer ranges to verified ESLint 10/TypeScript 6-compatible majors.
- [ ] Replace `eslint-plugin-jsx-a11y` with `eslint-plugin-jsx-a11y-x` and rename the configured plugin/rule prefix from `jsx-a11y` to `jsx-a11y-x`.
- [ ] Update the minimum/latest CI matrix for the 2.x support policy.
- [ ] Run `npm test` after each compatibility adjustment and keep changes minimal.
- [ ] Update English/Korean usage and migration guidance plus the changelog.
- [ ] Run `npm test`, `git diff --check`, and `npm pack --dry-run`; expect exit code 0.

### Task 3: Publish the preparation branch only

**Files:**
- No additional files.

- [ ] Commit the verified ESLint 10 preparation.
- [ ] Push `feature/eslint-10-support`.
- [ ] Open a draft PR targeting `main` so CI can run, but do not merge it.
- [ ] Confirm `release/1.x` and `main` protection rules remain active.
