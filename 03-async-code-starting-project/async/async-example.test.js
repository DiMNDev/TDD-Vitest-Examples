import { expect, it } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example";

it("should generate a token value", (done) => {
  const testUserEmail = "test@test.com";

  generateToken(testUserEmail, (err, token) => {
    // expect(token).toBeDefined();
    // done();
    try {
      expect(token).toBeDefined();
      //   expect(token).toBe(2);
      done();
    } catch (error) {
      done(error);
    }
  });
});

// Testing asynchronous code with callbacks
it("should generate a token value", () => {
  const testUserEmail = "test@test.com";

  return expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});

// Testing asynchronous code with async / await
it("should generate a token value", async () => {
  const testUserEmail = "test@test.com";

  const token = await generateTokenPromise(testUserEmail);

  expect(token).toBeDefined();
});
