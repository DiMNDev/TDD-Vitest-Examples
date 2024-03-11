# Testing Basics

### Importing a testing library

To implement testing in a project we first need to import the library that we will use. In this project we will be using vitest.

To install vitest we will run the command `npm install -D vitest`

Now we can import it into our project

```javascript
import {
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
```

We will need to import the _expect_ and _it_ methods from vitest.

##### describe

`describe((<suite name>)=>{related tests})` is the method we use to define a suite of tests. We can define tests inside a test suite to keep our related tests together.

##### it

`it((<test name>)=>{test function})` is the method we use to define a test. We can write our tests to be human readable like "it should sum all number values in an array".

##### expect

`expect(<result to check>).toBe(<result we expect></result>)` is the method we use to validate the data returned from the functionality that we are testing. Expect has many different methods, other than .toBe() to check validity.

##### beforeEach

`beforeEach(()=> {<functions to run>})` beforeEach is a method that allows us to run a function before each test is run.

##### beforeAll

`beforeAll(()=> {<functions to run>})` beforeAll is a method that allows us to run a function before any test is run.

##### afterEach

`afterEach(()=> {<functions to run>})` afterEach is a method that allows us to run a function after each test is run.

##### afterAll

`afterAll(()=> {<functions to run>})` afterAll is a method that allows us to run a function after all tests are run.

### Arrange, Act, Assert

This is a helpful structure to model our tests.
**Arrange** - Setup our data for testing
**Act** - Perform an action to test
**Assert** - Verify the results of our action

```javascript
it("Should sum all number values in an array", () => {
  // Arrange
  const numbers = [1, 2, 3];
  const expectedResult = numbers.reduce(
    (prevValue, curValue) => prevValue + curValue,
    0
  );
  // Act
  const result = add(numbers);
  // Assert
  expect(result).toBe(expectedResult);
});
```

### Using Stubs

We can use stubs to create global variables in our project, we will use this when we setup a mock function in the section down below.

```javascript
vi.stubGlobal("fetch", testFetch);
```

### Using Mocks

Mocks are used to "mock" a function. In our tests there will come times when we need to test functions that perform operations that we don't want to alter our data. Like a fetch request to interact with a database. To test the functionality, without performing altering operations, we can create a mock.

To use mocks, we will first need to import _vi_ from _vitest_

```javascript
import { vi } from "vitest";
```

After importing _vi_ we can create a mock.

```javascript
// Mock fetch
const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== "string") {
      return reject("not a string");
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal("fetch", testFetch);
```

Here we create a mock function of the fetch method. Anytime we run a fetch method from within our test, this mock function will be used instead.

Here is an example of a test using our mocked fetch function.

```javascript
it("should return any available response data", () => {
  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});
```

### Using Spys

We can use spys to look into a function when it is called.

```javascript
// Spy
it("should execute logger() if provided", () => {
  const logger = vi.fn();

  generateReportData(logger);

  expect(logger).toBeCalled();
});
```

This will execute _generateReportData()_ and when it does, it should execute the spy we made called _logger_. If logger is called, this test will pass.

### Asynchronous Testing

Asynchronous code is inevitible in web development. When one function depends on another to finish before it can run, this is asynchronous and we need a way to test for this. We can use one of these two ways to achieve the desired result.

```javascript
const testResponseData = "Test Response Data";

// Testing async with return
it("should return any available response data", () => {
  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

// Testing async with await
it("should return any available response data", async () => {
  const testData = { key: "test" };

  await expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});
```

Both of these tests will provide the same result.

### Running our tests

To run our tests we will need to create a script, if it is not already included, inside our _package.json_ like this

```JSON
"scripts": {
    "test": "vitest --run"
  },
```

To execute this script we simply run `npm run test`
This will run all of our tests and show us what tests are passing and which are failing.

\*_it is important to note, to run these tests, we must execute the command in the command line of the directory where the tests reside._

### Conclusion

These are just a few things I have learned through testing using **vitest**. This is not an exhaustive list nor a complete guide but does demonstrate a few core principles to get started with testing web applications.

Special thanks to **[Maximilian Schwarzmüller](https://www.udemy.com/course/javascript-unit-testing-the-practical-guide/?couponCode=LETSLEARNNOWPP)** for the amazing course!
