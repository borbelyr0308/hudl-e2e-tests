# SETUP

## Install dependencies:
Run `npm i` to install all dependencies
Run `npx playwright install` to install Playwrights' browser binaries


## Execution:
Run `hudle:all` to execute all tests (headless as default: see config)
Run `hudle:login` to execute just login tests
Run `hudle:happy` to execute happy path tests
Run `hudle:negative` to execute non-happy path tests
Run `debug` to run a test (tag the test as test.only first) in debug mode
Run `ui` to run tests in a headed UI format