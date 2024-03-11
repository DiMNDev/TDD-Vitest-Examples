import { expect, it } from "vitest";
import { add } from "./math";

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

it("should yeild NaN if at least one invalid value is provided", () => {
  const inputs = ["invalid", 1];

  const result = add(inputs);

  expect(result).toBeNaN();
});

it("should yield a correct sum if an array of numeric string balues is provided", () => {
  const inputs = ["1", "2"];

  const expectedResult = inputs.reduce((prev, curr) => +prev + +curr, 0);

  const result = add(inputs);

  expect(result).toBe(expectedResult);
});

it("should yield 0 if an empty array is provided", () => {
  const input = [];

  const result = add(input);

  expect(result).toBe(0);
});

it("should throw an error if no value is passed into the function", () => {
  const resultFn = () => {
    add();
  };

  expect(resultFn).toThrowError();
});

it("should throw an error if provided with multiple arguments instead of an array", () => {
  const num1 = 1;
  const num2 = 2;

  const resultFn = () => add(num1, num2);

  expect(resultFn).toThrowError(/is not iterable/);
});
