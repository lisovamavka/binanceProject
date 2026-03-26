# Test Strategy — binanceProject

This document defines the end-to-end (E2E) test strategy for this repository. It applies to Playwright-based UI tests against the Binance **public website** in **English**, **Europe** region, on **production** only.

The project is run as a **small learning exercise** by a **team of six**. The strategy balances **realistic smoke coverage** with **learning goals** (Playwright, CI, collaboration, and shared conventions).

---

## 1. Objectives

- Run **smoke** tests that cover **basic public functionality** and **site availability** (critical pages load without 5xx, main navigation and primary content are reachable for the chosen locale).
- Fail fast when critical user-visible paths are broken or unreachable.
- Keep the suite small and maintainable: **smoke only** (no separate full regression suite).

---

## 2. Team, learning context & workload

### Context

- **Educational purpose:** the repository is for learning and practice, not full production coverage of Binance.
- **Team size:** **6** participants.

### Workload rules

| Rule | Description |
|------|-------------|
| Minimum per person | Each participant delivers **at least 3** automated tests. |
| Counting tests | One **`test('...', async ({ page }) => { ... })`** block = **one** test, unless the team agrees otherwise for a specific case. |
| Team target | Expect **18+** tests in the suite overall (6 × 3), excluding purely infrastructural changes. |

### Splitting work (avoid duplication)

- Divide **public** areas among people, e.g. home/landing, markets list, a single spot pair (read-only), footer links (Fees / Support / Help), negative URLs, cookie banner visibility (if testable without flaky timing), etc.
- **Do not** implement the same user journey twice without team agreement — use a shared list in the PR description or update the **participant tracking** table below.
- If two people need the same page, they must test **different assertions** or **different sub-flows** (clearly documented in the PR).

### Pull request review (mandatory)

- Use **pull requests** for all changes.
- Every PR must receive **approval from exactly two designated reviewers** before merge:
  - **Vitaliy**
  - **Viktoria** (Team Lead)
- Both must review to catch scope violations, duplicate scenarios, and quality issues. If a PR author is one of these two, the process still requires **both** approvals (use GitHub rules or team agreement so the author does not self-approve in place of a real review from the other person).

### Participant tracking (template)

Maintain this table in the repo (e.g. in this file or `README.md`) and update it as tests land:

| Name | Focus area (public / read-only) | Tests (≥ 3 each) | Spec file(s) |
|------|----------------------------------|------------------|--------------|
| | | | `tests/...spec.ts` |
| | | | |
| | | | |

### PR checklist (Definition of Done for test work)

- [ ] Tests respect **scope**: web, **public** pages, **production**, **English**, **Europe**, **read-only**, **no login**, no 2FA/CAPTCHA/automation of anti-bot flows.
- [ ] **Green CI** on the target branch before merge.
- [ ] **Approvals from Vitaliy and Viktoria (Team Lead)** — both required.
- [ ] Participant table (or PR description) updated with **test count** and **ownership** if required by the course.

---

## 3. Scope

### In scope

- **Web** UI only.
- **Public** pages (no authenticated sessions).
- **Read-only** interactions: navigation, visibility checks, no orders, no wallet movements, no state-changing actions.

### Out of scope

- Mobile native applications.
- API-only or service-level testing (unless explicitly added later).
- Performance / load testing.
- Security testing (e.g. penetration testing).
- Flows that require **login**, **2FA**, **CAPTCHA**, or **anti-bot** handling — these are **not** automated in this project.

---

## 4. Environment & locale

| Aspect | Choice |
|--------|--------|
| Environment | **Production** only |
| Region | **Europe** |
| Language | **English** (`/en` or the canonical EN entry URL used by the product after redirect) |

If the site redirects to a region-specific host, tests should use one **canonical** base URL / entry path documented in test code or config to reduce flakiness.

---

## 5. Browsers & CI

- **Google Chrome** (via Playwright **Chromium** project) and **WebKit** (Safari engine).
- **Only these two** projects are required for **CI** (GitHub Actions): **chromium** and **webkit**.
- Other browsers (e.g. Firefox) are **not** part of the mandatory pipeline unless this strategy is updated.

CI configuration lives in **`.github/workflows/playwright.yml`** (and `playwright.config.ts` for projects and retries).

---

## 6. Stability & waits

- **Retries:** default **2** retries on CI (aligned with Playwright / workflow configuration).
- **Waits:** use **explicit** conditions only — stable locators, `expect`, network/state readiness. **Do not** use fixed `sleep` / `waitForTimeout` for timing hacks; if something is truly unavoidable, document it in the PR.

---

## 7. Smoke scenarios (critical paths)

The smoke suite should cover at least these **five** scenarios (team members may implement them across different files and extend with additional smoke-level cases):

1. **Home / landing (EN)**  
   Open the English landing entry for EU. Assert the page loads, main navigation and primary content are visible, and the response is not a server error (5xx).

2. **Markets**  
   Open the public markets page. Assert the markets list/table (or equivalent main widget) is visible and the UI is not broken.

3. **Spot trading page (read-only)**  
   Open a public spot page for a stable pair (e.g. BTC/USDT — use the URL shape Binance exposes for EN). Assert key areas (e.g. chart and/or order book) are visible. **Do not** submit orders or trigger trades.

4. **Static / help-style public page**  
   Navigate to one public informational page (e.g. Fees, Support, or Help from the footer). Assert title/content loads — no blank page and no 5xx.

5. **Negative — invalid path**  
   Request a clearly non-existent path under the same locale (e.g. `/en/...` with a bogus segment). Assert controlled behavior (404 or redirect to a valid page), **not** an unhandled 5xx.

Additional **basic negative** cases may be added as long as they stay read-only and within public pages.

---

## 8. CI & quality gates

| Topic | Policy |
|-------|--------|
| Trigger | Tests run on **push** (and PRs as configured in the workflow targeting protected branches). |
| Merge | **Red CI blocks merge** — no merge until the pipeline is green. |
| PR review | **Required:** approvals from **Vitaliy** and **Viktoria** (Team Lead) — see §2. |
| Ownership | The **PR author** fixes failing tests or infrastructure issues introduced or exposed by their change. |

---

## 9. Reporting & artifacts

- Collect **full** debugging artifacts on failure where configured: e.g. **trace**, **screenshots**, **video** (per Playwright settings in `playwright.config.ts`).
- Store run outputs in **GitHub Actions artifacts** (HTML report and related uploads as defined in **`.github/workflows/playwright.yml`**).

---

## 10. Legal / compliance

- No additional **ToS** or **formal approval** constraints are recorded for this project at strategy level. Teams should still respect Binance terms of use and reasonable request rates when hitting production.

---

## 11. Review

Revisit this strategy when scope changes (e.g. adding login, staging, or new browsers), when the course requirements change, or after repeated instability on production-only smoke tests.
