import { describe, it, expect, vi } from "vitest";

import { HttpError } from "./errors";

import { sendDataRequest } from "./http";

const testResponseData = "Test Response Data";

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

it("should convert the provided data to JSON before sending the request", async () => {
  const testData = { key: "test" };
  let errorMessage;
  try {
    await sendDataRequest(testData);
  } catch (error) {
    errorMessage = error;
  }

  expect(errorMessage).not.toBe("not a string");
});

it("should throw and HttpError in case of non-ok response", () => {
  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      if (typeof options.body !== "string") {
        return reject("not a string");
      }
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
