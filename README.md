# smartm2m-eslint-config

**English** | [한국어](./README.ko.md)

Shared ESLint configuration for SmartM2M projects.

- Includes rules for React, Next.js, TypeScript, Prettier, and accessibility (a11y)
- 📦 [npm package](https://www.npmjs.com/package/smartm2m-eslint-config)
- 🐙 [GitHub repository](https://github.com/HoSeopLee/smartm2m-eslint-config)

> ⚠️ **ESLint 10 Flat Config only**
> Version 2 uses ESLint 10 Flat Config. Use `1.1.1` for ESLint 9 projects. Legacy `.eslintrc` configurations are not supported.

> 📌 **Version guidance (as of July 16, 2026)**
>
> - **`2.0.0` is the ESLint 10 line**; use **`1.1.1` for ESLint 9 maintenance**.
> - Version 2 requires Node.js 22.13+, TypeScript 6, and the peer versions shown below.
> - If custom type-aware `typescript-eslint` rules relied on the preset's previous implicit tsconfig discovery, configure `projectService: true` or an explicit `project` path as shown in [Enabling type-aware rules](#enabling-type-aware-rules).
> - When upgrading from `1.0.7` or earlier, migrate consumer overrides from `react/*` to the corresponding `@eslint-react/*` rule names.
> - When upgrading from `1.0.7` or earlier, replace `eslint-plugin-import` with `eslint-plugin-import-x`.
> - See the [CHANGELOG](./CHANGELOG.md) for the complete version history and migration notes.

## Compatibility

| Component                         | Supported range | Notes                                      |
| --------------------------------- | --------------- | ------------------------------------------ |
| Node.js                           | `>=22.13.0`     | Tested on Node.js 22, 24, and 25           |
| ESLint / `@eslint/js`             | `>=10.0.1 <11`  | ESLint 10 Flat Config only                 |
| TypeScript                        | `>=6.0.2 <6.1`  | TypeScript 7 awaits `typescript-eslint` support |
| `typescript-eslint`               | `>=8.64 <9`     | Both minimum and latest peers are tested   |
| `@eslint-react/eslint-plugin`     | `>=5.16.1 <6`   | ESLint 10-compatible v2 integration        |
| `@next/eslint-plugin-next`        | `>=16 <17`      | Optional; required only for the Next preset |
| `eslint-plugin-jsx-a11y-x`        | `>=0.2 <1`      | ESLint 10-compatible accessibility fork    |

CI tests the declared minimum dependency versions on Node.js 22.13 and the latest allowed dependency versions on Node.js 22, 24, and 25.

## Configuration structure

The package separates composed **presets** from domain-specific **rule modules**, making it possible to use a complete setup or build a custom one.

### Presets

| Config                                 | Description                                      |
| -------------------------------------- | ------------------------------------------------ |
| `smartm2m-eslint-config`               | Default export; re-exports the React preset      |
| `smartm2m-eslint-config/react`         | Complete configuration for React projects       |
| `smartm2m-eslint-config/next`          | Complete configuration for Next.js projects     |
| `smartm2m-eslint-config/presets/base`  | JS + import + Prettier, without React/TypeScript |
| `smartm2m-eslint-config/presets/react` | React preset; equivalent to `/react`             |
| `smartm2m-eslint-config/presets/next`  | Next.js preset; equivalent to `/next`            |
| `smartm2m-eslint-config/presets/full`  | Full configuration; currently equivalent to Next.js |

### Rule modules

| Config                            | Description          |
| --------------------------------- | -------------------- |
| `smartm2m-eslint-config/ts`       | TypeScript rules     |
| `smartm2m-eslint-config/import`   | Import rules         |
| `smartm2m-eslint-config/a11y`     | Accessibility rules  |
| `smartm2m-eslint-config/prettier` | Prettier integration |

Internally, presets combine modules from `rules/base/`, `rules/typescript/`, `rules/react/`, `rules/next/`, `rules/accessibility/`, and `rules/formatting/`.

## Installation

```bash
# Step 1: install this package (npm / Yarn / pnpm)
npm install -D smartm2m-eslint-config
# yarn add -D smartm2m-eslint-config
# pnpm add -D smartm2m-eslint-config

# Step 2: install required peer dependencies
# Replace npm with yarn or pnpm when needed.
npm install -D @eslint/js@^10 @eslint-react/eslint-plugin@^5.16.1 eslint@^10 eslint-config-prettier eslint-plugin-import-x eslint-plugin-jsx-a11y-x eslint-plugin-prettier eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort eslint-plugin-unused-imports globals prettier typescript@^6.0.2 typescript-eslint

# Next.js projects only (optional)
npm install -D @next/eslint-plugin-next
```

> **Notes**
>
> - Package managers handle peer dependencies differently, so explicitly installing the listed peers in the consumer project is recommended.
> - `@next/eslint-plugin-next` is optional through `peerDependenciesMeta` and may be omitted outside Next.js projects.
> - Version 2 supports `@next/eslint-plugin-next` 16.x. Version 1 supports plugin 15.x or 16.x.
> - Peer dependency upper bounds cover only tested major versions. Support for a new major is added after compatibility testing.
> - Version 2 replaces `eslint-plugin-jsx-a11y` with the ESLint 10-compatible `eslint-plugin-jsx-a11y-x` fork. Consumer overrides must rename `jsx-a11y/*` to `jsx-a11y-x/*`.
> - Version 2 replaces `eslint-plugin-no-relative-import-paths` with ESLint's built-in `no-restricted-imports`; uninstall the old plugin when upgrading.
> - `eslint-plugin-import` was replaced with the actively maintained [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) fork. Import rule names use the `import-x/*` prefix.

## Usage

### React projects

In the project's `eslint.config.js` or `eslint.config.mjs`:

```javascript
// Option 1: explicit React entry point (recommended)
import reactConfig from 'smartm2m-eslint-config/react';

export default reactConfig;

// Option 2: default export (backward compatibility)
import eslintConfig from 'smartm2m-eslint-config';

export default eslintConfig;
```

### Next.js projects

Use the `/next` entry point for Next.js projects:

```javascript
import nextConfig from "smartm2m-eslint-config/next";

export default nextConfig;
```

> **Notes**
>
> - The Next.js configuration includes the React configuration and adds Next.js-specific rules.
> - The default `smartm2m-eslint-config` export returns the React preset for backward compatibility.
> - New projects should import `/react` or `/next` explicitly.

### Individual modules

Presets are Flat Config arrays, while rule modules are individual config objects.

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

The `/ts` entry point is a standalone TypeScript config object that includes its parser and plugin:

```javascript
import tsConfig from "smartm2m-eslint-config/ts";

export default [tsConfig];
```

`/a11y`, `/import`, and `/prettier` are rule fragments intended for custom presets. They are already included in the standard React and Next.js presets and should not be added again there.

### Extending a preset

Add project-specific configuration after the preset to override it:

```javascript
import eslintConfig from "smartm2m-eslint-config";

export default [
  ...eslintConfig,
  {
    rules: {
      "no-console": "error",
    },
  },
];
```

### TypeScript project setup

The standard presets do not enable type-aware rules and therefore do not force tsconfig discovery. Typical React, Vite, and Next.js projects can use the React or Next.js examples above without setting `parserOptions.project`.

#### Overriding project rules

Place project-specific rules after the preset:

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

For Next.js, only change the import path:

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

#### Enabling type-aware rules

Enable `recommendedTypeChecked` and `projectService` only when adding `typescript-eslint` rules that require type information. When `eslint.config.mjs` is at the project root, `import.meta.dirname` provides the correct tsconfig root.

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

Type-aware linting creates a TypeScript Program and is slower than the standard setup. Enable it only when a rule actually requires type information.

For projects such as Vite that use a dedicated type-checking tsconfig, specify `project` instead of `projectService`:

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

Next.js normally uses the root `tsconfig.json`; use `project: ["./tsconfig.json"]` in that case.

The following legacy `eslint-plugin-react` setting is not required by the current `@eslint-react/eslint-plugin` integration:

```javascript
settings: {
  react: {
    version: "detect",
  },
},
```

Add it to a project override only when the consumer project separately uses the legacy `eslint-plugin-react` package.

#### Monorepos

The simplest monorepo setup places an `eslint.config.mjs` in each application directory and runs ESLint for each application:

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

Each app can use the React or Next.js examples above. For type-aware rules, set `tsconfigRootDir: import.meta.dirname` in each app's config. This keeps tsconfig resolution stable even when the command runs from the workspace root.

#### Allowing parent-relative imports

Parent-relative imports such as `../shared` produce a warning. Disable the built-in rule if a project intentionally uses them:

```javascript
import reactConfig from "smartm2m-eslint-config/react";

export default [
  ...reactConfig,
  {
    rules: {
      "no-restricted-imports": "off",
    },
  },
];
```

> **Tailwind CSS:** Tailwind-specific plugins such as `better-tailwindcss` and `eslint-plugin-tailwindcss` are not included. Install and configure them in the consumer project.

## Included rules

### React

- React and React Hooks rules
- Missing JSX keys, undefined components, invalid children props, and unnecessary Fragment checks
- Warning for array indices used as keys
- Direct state mutation prevention and deprecated API warnings
- Warning for unstable objects or arrays passed to Context providers (`@eslint-react/no-unstable-context-value`)
- Hooks call order enforcement (`react-hooks/rules-of-hooks`, error)
  - `react-hooks/exhaustive-deps` is **off by default** since v1.0.7 because of excessive false positives for stable values; consumers may opt in
  - `@eslint-react/no-leaked-conditional-rendering` is **off by default**; consumers may opt in when needed

### TypeScript

- TypeScript rules and naming conventions
- Warnings for `any` and empty functions
- `as const` preference
- Disallows `I` and `T` prefixes for interfaces and types

### Accessibility (a11y)

- JSX accessibility rules
- Image alt text and ARIA attribute validation
- Label/control associations and keyboard events for click handlers
- `scope` validation for table headers
- Prevents `tabIndex` on non-interactive elements

### Imports

- Automatic import sorting with `eslint-plugin-simple-import-sort`; `import-x/order` is disabled
  - side effects → `node:` → `react`/`next` → external packages → `@/` → absolute paths → relative paths → CSS
- Unused import cleanup (`unused-imports/no-unused-imports`)
- Duplicate and self-import prevention (`import-x/no-duplicates`, `import-x/no-self-import`)
- Encourages the `@/` absolute alias from `src` and warns on relative paths
- Uses the actively maintained [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) fork instead of `eslint-plugin-import`

### Prettier

- Prettier integration and conflicting-rule prevention
- Automatic formatting through ESLint

### General JavaScript

- Requires `===` instead of `==`
- Disallows `eval`
- Warns on `debugger` and `alert`
- Warns on unused expressions
- Prefers object destructuring
- Checks return statements in array callbacks
- Prevents switch fallthrough
- Prevents constructor returns
- Warns on nested ternaries
- Keeps `no-implicit-coercion` off so common expressions such as `!!x` and `+x` remain allowed

### Next.js (optional)

- Next.js-specific ESLint rules
- Requires the Next.js `Link` component instead of plain `<a>` navigation
- Recommends the Next.js `Image` component instead of plain `<img>`
- Document Head rules
- Next.js API typo detection
- Google Fonts optimization checks (`display` and `preconnect`)
- Requires an `id` on inline `<Script>` components
- Recommends `next/script` for Google Analytics
- Ignores Next.js build artifacts such as `.next/`, `out/`, and `next-env.d.ts`

> **Note:** The Next.js configuration includes every React rule and adds Next.js-specific rules.

## License

MIT
