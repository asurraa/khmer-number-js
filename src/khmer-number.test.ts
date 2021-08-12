import { Num2Word } from "./index";

test("Test number 1 roman", () => {
  expect(Num2Word("1", "")).toBe("មួយ");
});

test("Test number 12.05 roman", () => {
  expect(Num2Word("12.05", " ")).toBe("ដប់ ពីរ ចុច សូន្យ ប្រាំ");
});

test("Test number 1 khmer", () => {
  expect(Num2Word("១", "")).toBe("មួយ");
});

test("Test number 12.05 khmer", () => {
  expect(Num2Word("១២.០៥", " ")).toBe("ដប់ ពីរ ចុច សូន្យ ប្រាំ");
});
