import { it, describe, expect } from "vitest";
import { validateNotEmpty } from "./validation";

describe("validateNotEmpty()", () => {
  it("should throw an error if an empty string is provided as a value", () => {
    const testInput = "";

    const validation = () => validateNotEmpty(testInput);

    expect(validation).toThrow();
  });

  it("should throw an error if a blank string is provided as a value", () => {
    const testInput = " ";

    const validation = () => validateNotEmpty(testInput);

    expect(validation).toThrow();
  });

  it("should throw an error with the provided error message", () => {
    const testInput = " ";
    const errorMessage = "arggh!";

    const validation = () => validateNotEmpty(testInput, errorMessage);

    expect(validation).toThrow(errorMessage);
  });
});
