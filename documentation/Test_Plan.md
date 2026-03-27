#  Test Plan — BinanceProject 

## 1. Introduction
This document defines the test plan for automated smoke testing of the public Binance website.

The testing covers only critical public (non-authenticated) entry points and main navigation paths, ensuring they are accessible and render correctly. The focus is on quickly detecting major issues in core flows, without testing full end-to-end functionality.

---

## 2. Objectives
The objectives of this testing are to:

- Verify accessibility of key public pages 
- Ensure navigation between main sections works correctly
- Detect critical failures (5xx errors, blank pages)
- Validate visibility of core UI elements
- Provide fast and reliable feedback via smoke tests

---

## 3. Assumptions and Constraints

### Assumptions
- Testing is performed on the production environment
- Users access Binance without authentication
- English locale and Europe region are used as baseline

### Constraints
- No access to login, account, or verification flows
- No access to wallet or transaction functionality
- No ability to test state-changing actions
- Dynamic content (prices, banners) may change frequently
- UI may vary based on region or anti-bot mechanisms

---



## 4. Scope

### In Scope
- Public web UI testing (Playwright)
- Core pages and navigation
- Read-only interactions (no state changes)
- Routing and redirect behavior
- Basic UI validation (visibility, layout)

### Out of Scope
- Login/authentication
- Registration
- KYC (identity verification)
- Account functionality
- Wallet / balance
- Deposit / withdrawal
- Trading execution (placing orders)
- Payment flows
- User profile
- API testing
- Database validation
- Security testing
- Accessibility full audit
- Mobile applications
- Admin/back-office functionality
- CAPTCHA / anti-bot behavior validation
- Any data-changing operations


---

## 5. Test Environment

- Environment: Production
- Base URL: https://www.binance.com/en
- Region: Europe
- Language: English
- Browsers: Chromium, WebKit
- Tool: Playwright
- CI: GitHub Actions


---
## 6. Test Items (Features to be Tested)

### P0 (Critical)
- Homepage (`/en`)
- Header Navigation (NavBar)
- Markets Page (`/en/markets`)

### P1 (High)
- Spot Trading Page (`/en/trade/BTC_USDT`) – structure only
- Buy & Sell Page (`/en/crypto/buy/USD/BTC`)

### P2 (Medium)
- Invalid URLs handling (404 / redirect)
- General routing stability

---


## 7. Test Approach

### Testing Strategy
- Type: Smoke Testing
- Level: End-to-End (UI)
- Mode: Fully automated

### Key Principles
- Test only public, read-only flows
- Focus on high-impact user paths
- Validate structure and visibility (not dynamic data)
- Avoid brittle assertions
- Use stable locators (`getByRole`, `getByText`)
- Use explicit waits only (no hard waits)

### Execution Strategy
- CI workflow is triggered on push and pull_request events targeting the main and master branches.
- Tests run in parallel to reduce overall execution time.
- Retries are applied to all failed tests in CI, not only to flaky tests, according to the configuration in playwright.config.ts.
- Tests are independent and isolated, ensuring no cross-test dependencies.

---

## 8. Test Data and Configuration

- Predefined set of URLs is used
- No user accounts or credentials required
- No user accounts or credentials are used
- Tests operate in read-only mode only


---

## 9. Test Types

- Smoke Tests (core functionality)
- Navigation Tests (header, footer, routing)
- Negative Tests (invalid URLs, error handling)

---

## 10. Test Scenarios

### 1. Header Navigation (NavBar)
- Verify all main navigation items are visible
- Validate dropdown menus open correctly
- Ensure links navigate to correct pages
- Confirm consistent behavior across header items
- Ensure predictable user experience

### 2. Redirect Behavior
- Verify redirect from root URL to `/en`
- Validate correct locale handling
- Ensure no redirect loops or errors

### 3. Core Pages Load
- Open Homepage and verify it loads successfully
- Open Markets page and verify rendering
- Open Trading page (structure only)

### 4. Buy & Sell Page
- Open `/en/crypto/buy/USD/BTC`
- Verify page loads successfully
- Check main widget/form visibility


### 5. Negative / Invalid Paths
- Open invalid URL
- Verify 404 page or proper redirect
- Ensure no 5xx server errors

---

## 11. Test Design & Standards

- Use stable selectors (`getByRole`, `getByText`)
- Avoid XPath and fragile CSS selectors
- Do not use `waitForTimeout`
- Each test must be independent

Naming convention:
```js
test('Page / Feature: expected behavior', async ({ page }) => {})
---

## 12. Team Responsibilities

Team responsibilities include:

- Implementing automated tests
- Avoiding duplicate coverage
- Reviewing pull requests
- Maintaining test stability

Suggested ownership model:
- QA 1: Homepage
- QA 2: Header
- QA 3: Markets
- QA 4: Trading pages (read-only)
- QA 5: Negative scenarios / reporting
- QA 6: Positive scenarios



---

13. CI/CD & Execution
Tool: GitHub Actions
Trigger: CI runs on push and pull_request events only for main and master branches
Browsers: Chromium, WebKit
Retries: Applied to all tests that fail in CI (configured in playwright.config.ts)
Parallel execution: Enabled to speed up test runs
Headless mode: Enabled in CI

Artifacts
Screenshots for failed steps
Test execution videos
Playwright traces for debugging
HTML test reports
Merge policy: PR merge is blocked if any test fails
Responsibility: PR author is responsible for fixing failed tests

Artifacts
Screenshots for failed steps
Test execution videos
Playwright traces for debugging
HTML test reports

Quality Gates
PR merge is blocked if any test fails
PR author is responsible for fixing failed tests

---

## 14. Entry Criteria

Testing starts when:

- Playwright project is configured
- Base URL is defined
- CI pipeline is set up
- Scope and priorities are agreed
- Test ownership is assigned

---

## 15. Exit Criteria (Definition of Done)

Testing is considered complete when:

- 100% of P0 scenarios are automated and passing
- Agreed P1 scenarios are implemented
- All tests pass in CI for target browsers
- No critical defects remain in tested scope
- Code is reviewed and approved (minimum 2 reviewers)
- Documentation is finalized and stored in repository


---

## 16. Defect Management

Defects are tracked via GitHub Issues and must include:

- Title
- Steps to reproduce
- Expected result
- Actual result
- Environment
- Severity / priority
- Screenshot / trace

---

## 17. Reporting

- HTML reports generated by Playwright
- Artifacts stored in GitHub Actions
- Failures include screenshots, videos, traces

---

## 18. Risks

- Frequent UI changes in production
- Dynamic content instability
- Geo-based differences
- Anti-bot protection
- Flaky tests

---

## 19. Risk Mitigation

- Use stable locators
- Avoid validating dynamic data
- Use retries in CI
- Keep tests small and independent
- Use fixed canonical URLs

---

## 20. Observations / Recommendations

- Header navigation is inconsistent:
  - Some items open dropdowns
  - Others navigate directly

**Recommendation:** standardize navigation behavior for consistent UX

---

## 21. Approval

This test plan is approved after team agreement on:

- Scope
- Priorities
- Responsibilities
- Execution approach


- QA Engineers  
- Team Lead  
- Project stakeholders / Product Owner  

