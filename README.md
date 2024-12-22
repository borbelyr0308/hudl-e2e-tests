# Test suite for Hudle Login tests (Extendable for future Hudle tests)
Tech Stack:
 - TypeScript
 - Playwright
 - HTML test report

Design Pattern:
 - Page Object Model
    - Areas of contention:
        * Page Object Model is actually an anti-pattern, that encourages the dev/tester to think of everything as a 'page' and therefore every test as a UI test. This is undesirable, because of course tests could be API tests, Load tests, Contract tests etc.
        
        * Page Object 'classes' could be thought of as namespaces instead, because the instance variables are non-mutable, so the state of Page Objects never changes. They are more like a convenient place to house certain logical properties.
    - Positive reasons to still use POM:
        * Reusable Page Objects that simplify tests, and (arguably) ease maintenance.
        
        * It's a useful tool to train manual QA's to start doing automation in a somewhat organised fashion.
        
        * All automation engineers are familiar with it, and so can quickly add tests in a suite that utilises it.

# SETUP

## Install dependencies:
Obtain a `.env` file from the author; this contains sensitive details like credentials which are never committed to GitHub.
Run `npm i` to install all dependencies
Run `npx playwright install` to install Playwrights' browser binaries


## Execution:
Run `hudle:all` to execute all tests (headless as default: see config)
Run `hudle:login` to execute just login tests
Run `hudle:happy` to execute happy path tests
Run `hudle:negative` to execute non-happy path tests
Run `debug` to run a test (tag the test as test.only first) in debug mode
Run `ui` to run tests in a headed UI format

HINT: For demo/interview purposes, please run the UI script to see the tests running.