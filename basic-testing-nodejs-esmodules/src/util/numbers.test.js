import { it, expect } from "vitest";
import { transformToNumber } from "./numbers";

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
