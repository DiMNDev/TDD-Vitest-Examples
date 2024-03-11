import { it, expect, beforeAll, beforeEach, afterAll, afterEach } from "vitest";

import { User } from "./hooks";

let testEmail = "test@test.com";
let user = new User(testEmail);
beforeEach(() => {
  testEmail = "test@test.com";
});
afterEach(() => {
  user = new User(testEmail);
});

beforeAll(() => {
  console.log("beforeAll");
});

beforeEach(() => {
  console.log("beforeEach");
});

afterEach(() => {
  console.log("afterEach");
});

afterAll(() => {
  console.log("afterAll");
});

it("should update the email", () => {
  const newTestEmail = "test2@test.com";
  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it("should have an email property", () => {
  expect(user).toHaveProperty("email");
});

it("should store the provided email value", () => {
  expect(user.email).toBe(testEmail);
});

// Using concurrent will run the tests in parallel whether defined on an it block or describe
it.concurrent("should clear the email", () => {
  user.clearEmail();

  expect(user.email).toBe("");
});

it.concurrent(
  "should still have an email property after clearing the email",
  () => {
    user.clearEmail();

    expect(user).toHaveProperty("email");
  }
);
