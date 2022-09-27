const { setWorldConstructor, World, Before, After} = require("@cucumber/cucumber");
const { chromium } = require('playwright')
var {setDefaultTimeout} = require('@cucumber/cucumber');

setDefaultTimeout(120 * 9999);

class CustomWorld extends World{
  async setTestStatus(status, remark) {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status, remark } })}`)
  }
}

Before(async (scenario) => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build with Cucumber Runner-1',
      'name': scenario.pickle.name,
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
    
    }
  }

  // Create page and browser globals to be used in the scenarios
  global.browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  }, timeout=9999)

  const context = await global.browser.newContext();

  global.page = await context.newPage();
})

After(async () => {
  await global.browser.close()
})

setWorldConstructor(CustomWorld);
