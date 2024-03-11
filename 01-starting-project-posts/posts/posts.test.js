import { describe, it, expect, test, beforeEach } from "vitest";
import { extractPostData } from "./posts";

const testTitle = "Test title";
const testContent = "Test content";
let testFormData;
describe("extractPostData()", () => {
  beforeEach(() => {
    // Mock our own form to get the data
    testFormData = {
      title: testTitle,
      content: testContent,
      get(identifier) {
        return this[identifier];
      },
    };
  });

  it("should extract title and content from the provided form data", () => {
    const data = extractPostData(testFormData);
    expect(data.title).toBe(testTitle);
    expect(data.content).toBe(testContent);
  });
});

describe("savePost()", () => {
  it("", () => {});
});
