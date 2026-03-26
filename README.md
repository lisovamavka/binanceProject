# binanceProject

Minimal E2E project with Playwright for Binance website testing.

---

## Installation

```bash
npm install
npx playwright install
```

(Only Chromium is needed for the base setup.)

---

## Run tests

```bash
npm test
```

### Other commands

- `npm run test:ui` — run tests in UI mode  
- `npm run test:headed` — run tests with browser UI  
- `npm run report` — open HTML report  

---

## Structure

| File / folder | Purpose |
|---------------|--------|
| `playwright.config.ts` | Playwright configuration |
| `tests/*.spec.ts` | Test files |
| `package.json` | Project dependencies and scripts |
| `.github/CODEOWNERS` | Code owners configuration |

---

## Documentation

All project documentation must follow these rules:

- Documentation files must be stored in the `documentation/` folder  
- File naming format: `DOCUMENT_NAME.md`  
- Each document should clearly describe its purpose and scope  

Example:

```
documentation/
├── TEST_STRATEGY.md
├── TEST_PLAN.md
├── CHECKLIST.md
```

---

## Notes

- The project is created for UI end-to-end testing with Playwright.
- Tests are located in the `tests` folder.
- Configuration can be updated in `playwright.config.ts`.
- Additional test scripts are available in `package.json`.

---

## Usage

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

Open HTML report:

```bash
npx playwright show-report
```
