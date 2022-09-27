const {Given, When, Then} = require("@cucumber/cucumber");
const assert = require("assert");

Given("Open LambdaTest Website", {timeout: 99 * 9999}, async function() {
  await page.goto("https://www.lambdatest.com/");
});

When("Open HyperExecute page", async function() {
  await page.hover("text=Platform");
  await page.click("h3:has-text(\"HyperExecute\")");
});

Then("Open HyperExecute documentation", async function() {
  
 
  let title = await page.title();
  for (let i=0;i<50;i++){  
    console.log(title);
  }
  try {
    assert.equal(title,
        "HyperExecute - Blazing Fast Next Gen Testing Cloud",
        "Page title does not match");

    await this.setTestStatus("passed", "Title matched");
  } catch (e) {
    await this.setTestStatus("failed", e);
    throw(e);
  }
});
