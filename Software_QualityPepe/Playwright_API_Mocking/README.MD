<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Playwright API Mocking Project

A comprehensive demonstration of API mocking techniques using Playwright for automated testing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Activities](#activities)
- [Usage](#usage)
- [Test Results](#test-results)
- [Author](#author)


## 🎯 Overview

This project demonstrates three core API mocking activities using Playwright:

1. **Mock API Requests** - Intercepting and mocking weather API calls
2. **Modifying API Response** - Customizing Harry Potter character data
3. **Mocking with HAR Files** - Recording and replaying network traffic

The project showcases how to create reliable, fast, and deterministic tests by eliminating dependencies on external APIs.

## ✨ Features

- ✅ **API Request Interception** - Mock HTTP/HTTPS requests
- ✅ **Error Simulation** - Test 500 Internal Server Error handling
- ✅ **Response Modification** - Add/remove data from API responses
- ✅ **HAR File Integration** - Record and replay network traffic
- ✅ **User-Visible Locators** - Robust element selection
- ✅ **Auto-Retrying Assertions** - Reliable test assertions


## 📁 Project Structure

```
Playwright_API_Mocking/
├── html-files/
│   ├── weather.html              # Weather search application
│   └── harry-potter-list.html    # Harry Potter characters app
├── tests/
│   ├── weather-mock.spec.js      # Activity 1: Weather API mocking
│   ├── harry-potter-modify.spec.js # Activity 2: Response modification
│   └── harry-potter-har.spec.js  # Activity 3: HAR file mocking
├── hars/                         # HAR files directory
├── Evidencia/                    # Screenshots and evidence
├── playwright.config.js          # Playwright configuration
├── package.json                  # Project dependencies
└── README.md                     # This file
```


## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Santos-Arellano/Software-System-Planning.git
cd Playwright_API_Mocking
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Start Live Server**
```bash
# Use Live Server extension in VS Code
# Or any HTTP server on port 5500
```


## 📚 Activities

### Activity 1: Mock API Requests 🌤️

**Objective**: Simulate weather API calls and error handling

**Implementation**:

- Mock successful weather data for Paris
- Simulate 500 Internal Server Error
- Test empty input validation

**Key Features**:

```javascript
await page.route('**/api/weather**', async (route) => {
  // Mock Paris weather data
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      city: 'Paris',
      temperature: 22,
      condition: 'Sunny'
    })
  });
});
```


### Activity 2: Modifying API Response ⚡

**Objective**: Customize Harry Potter character data

**Implementation**:

- Add custom character "Santos" to Ravenclaw house
- Remove "Ron Weasley" from the character list
- Verify modified data appears correctly

**Key Features**:

```javascript
const modifiedCharacters = [
  { name: "Harry Potter", house: "Gryffindor", species: "Human", ancestry: "half-blood" },
  { name: "Hermione Granger", house: "Gryffindor", species: "Human", ancestry: "muggleborn" },
  { name: "Santos", house: "Ravenclaw", species: "Human", ancestry: "muggle-born" }
];
```


### Activity 3: Mocking with HAR Files 📁

**Objective**: Demonstrate HAR file concept for network recording

**Implementation**:

- Record network traffic patterns
- Modify recorded responses
- Replay modified network behavior

**Key Features**:

- Network traffic recording
- Response modification
- Deterministic test replay


## 🎮 Usage

### Run Individual Tests

```bash
# Activity 1: Weather API Mocking
npx playwright test tests/weather-mock.spec.js --workers=1

# Activity 2: Harry Potter Response Modification
npx playwright test tests/harry-potter-modify.spec.js --workers=1

# Activity 3: HAR File Mocking
npx playwright test tests/harry-potter-har.spec.js --workers=1
```


### Run All Tests

```bash
# Run all tests
npx playwright test --workers=1

# Run with browser visible
npx playwright test --workers=1 --headed

# Generate HTML report
npx playwright test --workers=1 --reporter=html
```


### View Test Reports

```bash
npx playwright show-report
```


## 📊 Test Results

All tests pass successfully:

```
✅ Weather App API Mocking › should mock successful weather API request for Paris
✅ Weather App API Mocking › should mock 500 Internal Server Error  
✅ Weather App API Mocking › should handle empty city input gracefully
✅ Harry Potter Characters › should modify API response to add custom character and remove one
✅ Harry Potter Characters - HAR File Mocking › should record HAR file

🎉 5 passed (3.1s)
```


### Test Coverage

| Activity | Test Cases | Status |
| :-- | :-- | :-- |
| Weather API Mocking | 3 tests | ✅ Pass |
| Response Modification | 1 test | ✅ Pass |
| HAR File Mocking | 1 test | ✅ Pass |
| **Total** | **5 tests** | **✅ 100% Pass** |

## 🛠️ Technical Implementation

### Configuration

```javascript
// playwright.config.js
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:5500',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  }
});
```


### Key Benefits

- **🚀 Fast Execution** - No external API dependencies
- **🔒 Reliable Tests** - Consistent, predictable responses
- **🛡️ Error Testing** - Simulate failure scenarios safely
- **🔧 Development** - Continue work without live APIs
- **📈 Deterministic** - Same results every time


## 📸 Evidence

Screenshots and evidence are stored in the `Evidencia/` directory:

- Test execution results
- Code implementations
- Browser interactions
- Success confirmations


## 🎓 Learning Outcomes

This project demonstrates:

1. **API Mocking Fundamentals** - How to intercept and mock network requests
2. **Error Handling** - Testing application behavior under failure conditions
3. **Data Manipulation** - Modifying API responses for specific test scenarios
4. **Network Recording** - Using HAR files for request/response patterns
5. **Test Reliability** - Creating deterministic tests independent of external services

## 👨‍💻 Author

**Santos**
*Software Quality Testing - Playwright API Mocking*

---

## 📝 Notes

- All tests are designed to work independently of external APIs
- Error 404s in local browser testing are expected (demonstrates need for mocking)
- Use `--workers=1` flag to avoid test conflicts
- Live Server must be running on port 5500 for tests to work

**Date**: June 2, 2025
**Status**: ✅ Complete - All activities successfully implemented

<div style="text-align: center">⁂</div>

[^1]: https://playwright.dev/docs/mock

[^2]: https://www.makeareadme.com

[^3]: https://playwright.dev/docs/writing-tests

[^4]: https://github.com/debs-obrien/playwright-api-mocking

[^5]: https://www.youtube.com/watch?v=7Tk15l23Ctg

[^6]: https://dzone.com/articles/effortless-api-mocking-with-playwright

[^7]: https://www.eliostruyf.com/test-unexpected-api-results-playwright-mocking/

[^8]: https://www.youtube.com/watch?v=kn3Qe-ZhLBs

[^9]: https://playwright.dev/docs/api-testing

[^10]: https://qalified.com/blog/automation-test-playwright-template/

