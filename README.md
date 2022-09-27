# Cucumber-Playwright-HyperExecute-Sample


<img height="100" alt="hyperexecute_logo" src="https://user-images.githubusercontent.com/1688653/159473714-384e60ba-d830-435e-a33f-730df3c3ebc6.png">

HyperExecute is a smart test orchestration platform to run end-to-end Selenium tests at the fastest speed possible. HyperExecute lets you achieve an accelerated time to market by providing a test infrastructure that offers optimal speed, test orchestration, and detailed execution logs.

The overall experience helps teams test code and fix issues at a much faster pace. HyperExecute is configured using a YAML file. Instead of moving the Hub close to you, HyperExecute brings the test scripts close to the Hub!

* <b>HyperExecute HomePage</b>: https://www.lambdatest.com/hyperexecute
* <b>Lambdatest HomePage</b>: https://www.lambdatest.com
* <b>LambdaTest Support</b>: [support@lambdatest.com](mailto:support@lambdatest.com)

To know more about how HyperExecute does intelligent Test Orchestration, do check out [HyperExecute Getting Started Guide](https://www.lambdatest.com/support/docs/getting-started-with-hyperexecute/)


## Gitpod

Follow the below steps to run Gitpod button:

1. Click '**Open in Gitpod**' button (You will be redirected to Login/Signup page).
2. Login with Lambdatest credentials and it will be redirected to Gitpod editor in new tab and current tab will show hyperexecute dashboard.

---
<!---If logged in, it will be redirected to Gitpod editor in new tab where current tab will show hyperexecute dashboard.

If not logged in, it will be redirected to Login/Signup page and simultaneously redirected to Gitpod editor in a new tab where current tab will show hyperexecute dashboard.

If not signed up, you need to sign up and simultaneously redirected to Gitpod in a new tab where current tab will show hyperexecute dashboard.--->

# How to run Selenium automation tests on HyperExecute (using WbdriverIO framework)

* [Pre-requisites](#pre-requisites)
   - [Download HyperExecute CLI](#download-hyperexecute-cli)
   - [Configure Environment Variables](#configure-environment-variables)

* [Auto-Split Execution with Cucumber](#auto-split-execution-with-Cucumber)
   - [Core](#core)
   - [Pre Steps and Dependency Caching](#pre-steps-and-dependency-caching)
   - [Artifacts Management](#artifacts-management)
   - [Test Execution](#test-execution)

* [Run Cucumber tests on Windows and Linux platforms](#run-Cucumber-tests-on-windows-and-linux-platforms)
* [Secrets Management](#secrets-management)
* [Navigation in Automation Dashboard](#navigation-in-automation-dashboard)

# Pre-requisites

Before using HyperExecute, you have to download HyperExecute CLI corresponding to the host OS. Along with it, you also need to export the environment variables *LT_USERNAME* and *LT_ACCESS_KEY* that are available in the [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile) page.

## Download HyperExecute CLI

HyperExecute CLI is the CLI for interacting and running the tests on the HyperExecute Grid. The CLI provides a host of other useful features that accelerate test execution. In order to trigger tests using the CLI, you need to download the HyperExecute CLI binary corresponding to the platform (or OS) from where the tests are triggered:

Also, it is recommended to download the binary in the project's parent directory. Shown below is the location from where you can download the HyperExecute CLI binary:

* Mac: https://downloads.lambdatest.com/hyperexecute/darwin/hyperexecute
* Linux: https://downloads.lambdatest.com/hyperexecute/linux/hyperexecute
* Windows: https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe

## Configure Environment Variables

Before the tests are run, please set the environment variables LT_USERNAME & LT_ACCESS_KEY from the terminal. The account details are available on your [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile) page.

For macOS:

```bash
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Linux:

```bash
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Windows:

```bash
set LT_USERNAME=LT_USERNAME
set LT_ACCESS_KEY=LT_ACCESS_KEY
```

## Auto-Split Execution with Cucumber

Auto-split execution mechanism lets you run tests at predefined concurrency and distribute the tests over the available infrastructure. Concurrency can be achieved at different levels - file, module, test suite, test, scenario, etc.

For more information about auto-split execution, check out the [Auto-Split Getting Started Guide](https://www.lambdatest.com/support/docs/getting-started-with-hyperexecute/#smart-auto-test-splitting)

### Core

Auto-split YAML file (*HyperExecute-Yaml\.hyperexecuteStatic.yaml*) in the repo contains the following configuration:

```yaml
globalTimeout: 90
testSuiteTimeout: 90
testSuiteStep: 90
```

Global timeout, testSuite timeout, and testSuite timeout are set to 90 minutes.
 
The *runson* key determines the platform (or operating system) on which the tests are executed. Here we have set the target OS as Windows.

```yaml
runson: win
```

Auto-split is set to true in the YAML file.

```yaml
 autosplit: true
```

*retryOnFailure* is set to true, instructing HyperExecute to retry failed command(s). The retry operation is carried out till the number of retries mentioned in *maxRetries* are exhausted or the command execution results in a *Pass*. In addition, the concurrency (i.e. number of parallel sessions) is set to 2.

```yaml
retryOnFailure: true
runson: win
maxRetries: 2
```

## Pre Steps and Dependency Caching

To leverage the advantage offered by *Dependency Caching* in HyperExecute, the integrity of *package-lock.json* is checked using the checksum functionality.

```yaml
cacheKey: '{{ checksum "package-lock.json" }}'
```

The caching advantage offered by *NPM* can be leveraged in HyperExecute, whereby the downloaded packages can be stored (or cached) in a secure server for future executions. The packages available in the cache will only be used if the checksum stage results in a Pass.



```yaml
cacheDirectories:
  - node_modules
```

The *testDiscovery* directive contains the command that gives details of the mode of execution, along with detailing the command that is used for test execution. Here, we are fetching the list of Feature file scenario that would be further executed using the *value* passed in the *testRunnerCommand*

```yaml
testDiscovery:
  type: raw
  mode: dynamic
  command: grep -nri '@SampleTest' features -ir --include=\*.feature | sed 's/:.*//
  testRunnerCommand: node_modules\.bin\cucumber-js $test
```

Running the above command on the terminal will give a list of Feature Scenario lines that are located in the Project folder:

Test Discovery Output:
features/hyperexecute.feature
features/view-hyperexecute-documentation.feature

The *testRunnerCommand* contains the command that is used for triggering the test. The output fetched from the *testDiscoverer* command acts as an input to the *testRunner* command.

```yaml
testRunnerCommand: node_modules\.bin\cucumber-js $test
```
![image](https://user-images.githubusercontent.com/47247309/160439999-aa78ffac-f8f4-4506-aef4-a69c6de652aa.png)


### Artifacts Management

The *mergeArtifacts* directive (which is by default *false*) is set to *true* for merging the artifacts and combing artifacts generated under each task.

The *uploadArtefacts* directive informs HyperExecute to upload artifacts [files, reports, etc.] generated after task completion.  In the example, *path* consists of a regex for parsing the directory (i.e. *reports* that contains the test reports).

```yaml
mergeArtifacts: true

uploadArtefacts:
  [{
    "name": "Reports",
    "path": ["Reports\\"]
  }]

```
HyperExecute also facilitates the provision to download the artifacts on your local machine. To download the artifacts, click on *Artifacts* button corresponding to the associated TestID.

### Test Execution

The CLI option *--config* is used for providing the custom HyperExecute YAML file (i.e. *HyperExecute-Yaml/.hyperexecuteStatic.yaml*). Run the following command on the terminal to trigger the tests in JS files on the HyperExecute grid. The *--download-artifacts* option is used to inform HyperExecute to download the artifacts for the job.

```bash
./hyperexecute --config hyperexecute.yaml --verbose
```

Visit [HyperExecute Automation Dashboard](https://automation.lambdatest.com/hyperexecute) to check the status of execution


Visit [HyperExecute Automation Dashboard](https://automation.lambdatest.com/hyperexecute) to check the status of execution:

## Run Cucumber tests on Windows and Linux platforms

The CLI option *--config* is used for providing the custom HyperExecute YAML file (i.e. *HyperExecute-Yaml/.hyperexecute_simple_win.yaml* for Windows and *HyperExecute-Yaml/.hyperexecute_simple_linux.yaml* for Linux).

Run the following command on the terminal to trigger tests on Windows platform:

```bash
./hyperexecute --config hyperexecute.yaml --verbose
```

Run the following command on the terminal to trigger tests on Linux platform:

```bash
./hyperexecute --config hyperexecute.yaml --verbose
```

## Secrets Management

In case you want to use any secret keys in the YAML file, the same can be set by clicking on the *Secrets* button the dashboard.


All you need to do is create an environment variable that uses the secret key:

```yaml
env:
  AccessKey: ${{.secrets.AccessKey}}
```

## Navigation in Automation Dashboard

HyperExecute lets you navigate from/to *Test Logs* in Automation Dashboard from/to *HyperExecute Logs*. You also get relevant get relevant Selenium test details like video, network log, commands, Exceptions & more in the Dashboard. Effortlessly navigate from the automation dashboard to HyperExecute logs (and vice-versa) to get more details of the test execution.


## We are here to help you :)
* LambdaTest Support: [support@lambdatest.com](mailto:support@lambdatest.com)
* HyperExecute HomePage: https://www.lambdatest.com/support/docs/getting-started-with-hyperexecute/
* Lambdatest HomePage: https://www.lambdatest.com
