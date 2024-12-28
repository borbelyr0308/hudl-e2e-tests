# Test suite for Hudl Login tests (Extendable for future Hudl tests)
Tech Stack:
 - TypeScript
 - Playwright
 - HTML test report
 - VS Code

Design Pattern:
 - Page Object Model

Tests that could be considered:
* Boundary Testing
* Security Testing - Cross Site Scripting, Timeouts, SQL Injections etc
* Performance Testing - using artillery playwright 
* Integration Tests with 3rd party as mentioned on the login page and account creation
* Browser and Device testing
* API Testing

# SETUP

## Install dependencies:
Obtain a `.env` file from the author; this contains sensitive details like credentials which are never committed to GitHub.
Run `npm i` to install all dependencies
Run `npx playwright install` to install Playwrights' browser binaries


## Execution:
Run `hudl:all` to execute all tests (headless as default: see config)
Run `hudl:login` to execute just login tests
Run `hudl:happy` to execute happy path tests
Run `hudl:negative` to execute non-happy path tests
Run `debug` to run a test (tag the test as test.only first) in debug mode
Run `ui` to run tests in a headed UI format

HINT: For demo/interview purposes, please run the UI script to see the tests running.
