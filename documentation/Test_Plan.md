Test Plan — binanceProject
1. Introduction
This document describes the test plan for the binanceProject, which contains automated end-to-end (E2E) UI tests built with Playwright.
Purpose:
Practice UI test automation, CI integration, and team collaboration.
Validate basic functionality of the Binance public website (English, Europe region).
Main goal:
Ensure that key public pages of the Binance website load correctly and work as expected using automated tests.

2. Objectives
Verify accessibility and functionality of key public pages
Detect critical failures (5xx errors, broken navigation)
Validate visibility and usability of core UI elements
Provide fast feedback via smoke tests
Maintain a stable and maintainable test suite for a small team

3. Scope
In Scope
Web UI testing (Playwright)
Public pages only (no authentication)
Read-only interactions: navigation, visibility checks, basic UI validation
Out of Scope
Login / authentication / 2FA / CAPTCHA
Trading actions (buy/sell, wallet changes)
API testing
Performance / load testing
Security testing
Mobile applications

4. Features / Test Items
Test Items define WHAT is being tested:
Home Page (/en)
Markets Page (/en/markets)
Spot Trading Page (/en/trade/BTC_USDT)
Buy & Sell Page (/en/crypto/buy/USD/BTC)
Header Navigation (NavBar)
Footer Navigation Links (Fees, Help, Support)
Redirect behavior (root URL, invalid paths)

5. Test Environment
Environment: Production
Base URL: https://www.binance.com/en
Region: Europe
Language: English
Browsers: Chromium, WebKit
Test Framework: Playwright
CI Tool: GitHub Actions
OS: macOS (local), Linux (CI)
Execution Mode: Headless (CI), Headed optional (local)

6. Test Approach
Testing Type: Smoke testing — focus on core functionality and availability
Test Level: End-to-end (UI)
Automation: Fully automated with Playwright
Test Design:
Based on user-visible behavior
Focus on critical paths and main UI elements
Read-only interactions only
Execution Strategy:
CI pipeline triggers on push/PR
Parallel execution enabled
Retries configured for stability
Validation Method:
Assertions on element visibility and page state
Ensure successful page load (no 5xx)
Test Data: Static URLs; no accounts required
Non-functional Considerations: Basic stability checks only

7. Test Data
Home Page: /en
Markets Page: /en/markets
Spot Trading Page: /en/trade/BTC_USDT
Buy & Sell Page: /en/crypto/buy/USD/BTC
Fees Page: /en/fee/schedule

8. Test Types
Smoke tests (core paths, fast feedback)
Negative tests (invalid URLs, redirects)
Navigation tests (header/footer, dropdowns)

9. Test Scenarios / Additional Test Scenarios
1. Header Navigation (NavBar)
Verify all main navigation items are visible
Validate dropdown menus open correctly
Ensure links navigate to correct pages
Confirm consistent behavior across header items
Ensure predictable user experience
2. Redirect Behavior
Verify redirect to English locale (/en)
Validate correct behavior when accessing root URL
Ensure no redirect loops or errors
3. Footer Navigation
Validate links to Fees, Help, and Support pages load correctly
Ensure pages render properly (no blank screens, no 5xx errors)
4. Negative / Invalid Paths
Open invalid URL and verify proper handling (404 page or redirect)
Ensure no server errors (5xx)

10. Test Design & Standards
Prefer stable locators (getByRole, getByText)
Avoid fragile CSS/XPath selectors
Explicit waits only; no waitForTimeout
Each test must be independent
Naming convention: test('Page / Feature: expected behavior', async ({ page }) => {})

11. Team Responsibilities
Team size: 6 members
Each member implements ≥3 tests (total 18+ expected)
Work division:
Home page
Markets page
Spot page
Footer links
Negative scenarios
No duplication unless documented in PR

12. CI/CD & Execution
CI Tool: GitHub Actions
Trigger: Push / Pull Request to protected branches
Browsers: Chromium, WebKit
Retries: 2 for failed tests
Parallel execution enabled
Headless mode in CI
Artifacts: Screenshots, videos, Playwright traces, HTML reports
Failed tests block merge
PR author must fix failures

13. Entry & Exit Criteria
Entry Criteria
Test environment ready
Playwright configured
Test data defined
Exit Criteria
All tests executed
CI pipeline green
No critical failures
Required approvals received

14. Defect Management
Bugs reported via GitHub Issues
Include steps to reproduce, expected vs actual results, and screenshots/traces

15. Reporting
Collect artifacts on failure: screenshots, videos, Playwright traces
HTML reports stored as GitHub Actions artifacts

16. Risks & Mitigation
Website instability: Use retries, keep tests lightweight
UI changes: Use stable locators
Geo-based redirects: Use fixed canonical URLs
Anti-bot mechanisms: Limit to read-only public pages
Flaky tests: Use explicit waits
Test duplication: Track ownership in PRs
CI failures: PR author fixes issues promptly

17. Observations / Recommendations
Header navigation behavior is inconsistent: some items open dropdowns, others navigate directly
Recommendation: Standardize header navigation for consistent UX

18. Approval
QA Engineer
Team Lead
Project stakeholders / Product Owner


