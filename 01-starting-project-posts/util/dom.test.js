// imports to get document data
import fs from "fs";
import path from "path";

// import testing methods
import { describe, it, expect, vi, beforeEach } from "vitest";
// import mock window object
import { Window } from "happy-dom";

import { showError } from "./dom";

// Define the path to the document
const htmlDocPath = path.join(process.cwd(), "index.html");
// Get the content from the file
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

// Create a new window
const window = new Window();

// Create a document on the window object
const document = window.document;

// Fill the window document with file data
// document.write(htmlDocumentContent);

// Create a stub object for testing
vi.stubGlobal("document", document);

describe("showError()", () => {
  beforeEach(() => {
    // Reset the DOM
    document.body.innerHTML = "";
    // Fill the window document with file data
    document.write(htmlDocumentContent);
  });

  it("should add an error paragraph to the id='errors' element", () => {
    showError("test");
    const errorElement = document.getElementById("errors");
    const errorParagraph = errorElement.firstElementChild;

    expect(errorParagraph).not.toBeNull();
  });

  it("should not include an error paragraph initially", () => {
    const errorElement = document.getElementById("errors");
    const errorParagraph = errorElement.firstElementChild;

    expect(errorParagraph).toBeNull();
  });

  it("should output the provided message in the error paragraph", () => {
    const testErrorMessage = "this is an error message";
    showError(testErrorMessage);
    const errorElement = document.getElementById("errors");
    const errorParagraph = errorElement.firstElementChild;
    expect(errorParagraph.textContent).toBe(testErrorMessage);
  });
});
