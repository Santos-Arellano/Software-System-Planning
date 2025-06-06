# Playwright API Mocking Project

A comprehensive demonstration of API mocking techniques and UI testing using Playwright for automated testing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Activities](#activities)
- [Usage](#usage)
- [Test Results](#test-results)
- [Evidence](#evidence)
- [Author](#author)

## 🎯 Overview

This project showcases automated testing with Playwright, covering API mocking and UI testing activities:

1. **Mock API Requests** - Intercepting and mocking weather API calls.
2. **Modifying API Response** - Customizing Harry Potter character data.
3. **Mocking with HAR Files** - Recording and replaying network traffic.
4. **UI Testing with Playwright Inspector** - Testing navigation and search on Mercado Libre.

The project demonstrates how to create reliable, fast, and deterministic tests by eliminating dependencies on external APIs and services.

## ✨ Features

- ✅ **API Request Interception** - Mock HTTP/HTTPS requests.
- ✅ **Error Simulation** - Test error handling (e.g., 500 Internal Server Error).
- ✅ **Response Modification** - Add/remove data from API responses.
- ✅ **HAR File Integration** - Record and replay network traffic.
- ✅ **UI Testing** - Automate browser interactions with Playwright Inspector.
- ✅ **User-Visible Locators** - Robust element selection.
- ✅ **Auto-Retrying Assertions** - Reliable test assertions.
- ✅ **Video Recording** - Capture test execution for evidence.

## 📁 Project Structure

```
Playwright_API_Mocking/
├── html-files/
│   ├── weather.html              # Weather search application
│   └── harry-potter-list.html    # Harry Potter characters app
├── tests/
│   ├── weather-mock.spec.js      # Activity 1: Weather API mocking
│   ├── harry-potter-modify.spec.js # Activity 2: Response modification
│   ├── harry-potter-har.spec.js  # Activity 3: HAR file mocking
│   └── mercadolibre-test.spec.js # Activity 4: Mercado Libre UI testing
├── hars/                         # HAR files directory
├── Evidencia Playwright Parameterize, Record a Video, and Codegen/
│   ├── empty-input-test.webm     # Video: Weather empty input test
│   ├── error-500-test.webm      # Video: Weather 500 error test
│   ├── github HTML report.png    # Screenshot: GitHub test report
│   ├── mercadolibre.png          # Screenshot: Mercado Libre test
│   ├── paris-test.webm           # Video: Weather Paris test
├── test-results/
│   ├── ml-homepage.png           # Screenshot: Mercado Libre homepage
│   ├── ml-search-results.png     # Screenshot: Mercado Libre search results
│   ├── *.webm                    # Videos: Test execution recordings
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

## 📚 Activities

### Activity 1: Mock API Requests 🌤️

**Objective**: Simulate weather API calls and error handling.

**Implementation**:
- Mock successful weather data for Paris.
- Simulate 500 Internal Server Error.
- Test empty input validation.

**Key Features**:
```javascript
await page.route('**/api/weather**', async (route) => {
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

**Evidence**:
- Videos: `paris-test.webm`, `error-500-test.webm`, `empty-input-test.webm`.

### Activity 2: Modifying API Response ⚡

**Objective**: Customize Harry Potter character data.

**Implementation**:
- Add custom character "Santos" to Ravenclaw house.
- Remove "Ron Weasley" from the character list.
- Verify modified data appears correctly.

**Key Features**:
```javascript
const modifiedCharacters = [
  { name: "Harry Potter", house: "Gryffindor", species: "Human", ancestry: "half-blood" },
  { name: "Hermione Granger", house: "Gryffindor", species: "Human", ancestry: "muggleborn" },
  { name: "Santos", house: "Ravenclaw", species: "Human", ancestry: "muggle-born" }
];
```

### Activity 3: Mocking with HAR Files 📁

**Objective**: Demonstrate HAR file usage for network recording.

**Implementation**:
- Record network traffic patterns.
- Modify recorded responses.
- Replay modified network behavior.

**Key Features**:
- Network traffic recording.
- Response modification.
- Deterministic test replay.

### Activity 4: UI Testing with Playwright Inspector 🛒

**Objective**: Automate navigation and search on Mercado Libre using Playwright Inspector.

**Implementation**:
- Navigate to `https://www.mercadolibre.com.mx`.
- Search for "iPhone 15" using Playwright Inspector-generated selectors.
- Verify the presence of the product "Apple iPhone 15 (128 GB) - Rosa - Distribuidor Autorizado".
- Record test execution with screenshots and videos.

**Key Features**:
```javascript
await page.getByRole('combobox', { name: 'Ingresa lo que quieras encontrar' }).fill('iPhone 15');
await page.getByRole('button', { name: 'Buscar' }).click();
const productLink = page.getByRole('link', { name: 'Apple iPhone 15 (128 GB) - Rosa - Distribuidor Autorizado' });
await expect(productLink).toBeVisible();
```

**Evidence**:
- Screenshots: `ml-homepage.png`, `ml-search-results.png`, `mercadolibre.png`.
- Videos: `test-results/*.webm`.

## 🎮 Usage

### Run Individual Tests

```bash
# Activity 1: Weather API Mocking
npx playwright test tests/weather-mock.spec.js --workers=1

# Activity 2: Harry Potter Response Modification
npx playwright test tests/harry-potter-modify.spec.js --workers=1

# Activity 3: HAR File Mocking
npx playwright test tests/harry-potter-har.spec.js --workers=1

# Activity 4: Mercado Libre UI Testing
npx playwright test tests/mercadolibre-test.spec.js --workers=1
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
✅ MercadoLibre iPhone 15 search › should navigate, search, and verify product
```

### Test Coverage

| Activity | Test Cases | Status |
| :-- | :-- | :-- |
| Weather API Mocking | 3 tests | ✅ Pass |
| Response Modification | 1 test | ✅ Pass |
| HAR File Mocking | 1 test | ✅ Pass |
| Mercado Libre UI Testing | 1 test | ✅ Pass |
| **Total** | **6 tests** | **✅ 100% Pass** |

## 📸 Evidence

Screenshots and videos are stored in the `Evidencia Playwright Parameterize, Record a Video, and Codegen/` and `test-results/` directories:

- **Activity 1**:
  - `paris-test.webm`: Video of successful Paris weather test.
  - `error-500-test.webm`: Video of 500 error simulation.
  - `empty-input-test.webm`: Video of empty input validation.
- **Activity 4**:
  - `ml-homepage.png`: Screenshot of Mercado Libre homepage.
  - `ml-search-results.png`: Screenshot of iPhone 15 search results.
  - `mercadolibre.png`: Additional screenshot of Mercado Libre test.
  - `test-results/*.webm`: Videos of test execution (Chromium, Mobile Chrome, Firefox).
- **Reports**:
  - `github HTML report.png`: Screenshot of GitHub test report (reference).

## 🛠️ Technical Implementation

### Configuration

```javascript
// playwright.config.js
export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  workers: 1,
  use: {
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
```

### Key Benefits

- **🚀 Fast Execution**: No external API dependencies.
- **🔒 Reliable Tests**: Consistent, predictable responses.
- **🛡️ Error Testing**: Simulate failure scenarios safely.
- **🔧 Development**: Continue work without live services.
- **📈 Deterministic**: Same results every time.

## 🎓 Learning Outcomes

This project demonstrates:

1. **API Mocking Fundamentals**: Intercepting and mocking network requests.
2. **Error Handling**: Testing application behavior under failure conditions.
3. **Data Manipulation**: Modifying API responses for test scenarios.
4. **Network Recording**: Using HAR files for request/response patterns.
5. **UI Testing**: Automating browser interactions with Playwright Inspector.
6. **Test Reliability**: Creating deterministic tests independent of external services.

## 👨‍💻 Author

**Santos Arellano**
*Software Quality Testing - Playwright API Mocking and UI Testing*

## 📝 Notes

- Tests are independent of external APIs and services.
- Use `--workers=1` to avoid test conflicts.
- Videos and screenshots are generated automatically for evidence.
- Actividad 4 uses `https://www.mercadolibre.com.mx` directly, no local server required.

**Date**: June 6, 2025  
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