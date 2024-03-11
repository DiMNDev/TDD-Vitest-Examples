import { describe, it, expect } from "vitest";
import { cleanNumbers, transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  it("should expect a number when passed a number", () => {
    // Arrange
    const number = 6;
    // Act
    const result = transformToNumber(number);
    // Assert
    expect(result).toBeTypeOf("number");
  });

  it("should expect a number string to be a number", () => {
    // Arrange
    const numberString = "5";
    // Act
    const result = transformToNumber(numberString);
    // Assert
    expect(result).toBeTypeOf("number");
  });

  it("should return NaN if passed a non-number string", () => {
    // Arrange
    const string = "H";
    const string1 = {};
    // Act
    const result = transformToNumber(string);
    const result1 = transformToNumber(string1);
    // Assert
    expect(result).toBeNaN();
    expect(result1).toBeNaN();
  });
});

describe("cleanNumbers()", () => {
  it("should return an array of number values if an array of string number values is provided", () => {
    const numberValues = ["1", "2"];

    const cleanedNumbers = cleanNumbers(numberValues);

    expect(cleanedNumbers[0]).toBeTypeOf("number");
    // .toBe() and .toEqual() are different
    // .toBe() will check if they are the same
    expect(cleanedNumbers[0]).toEqual([1, 2]);
  });

  it("should throw an error if an array with at least one empty string is provided", () => {
    const numberValues = ["", 1];

    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
  });
});
