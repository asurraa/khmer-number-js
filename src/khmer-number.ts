import { sprintf } from "sprintf-js";
import voca from "voca";

const KHMER_DIGIT_WORD: string[] = [
  "",
  "មួយ",
  "ពីរ",
  "បី",
  "បួន",
  "ប្រាំ",
  "ប្រាំមួយ",
  "ប្រាំពីរ",
  "ប្រាំបី",
  "ប្រាំបួន",
];

const KHMER_TENTH: string[] = [
  "",
  "ដប់",
  "ម្ភៃ",
  "សាមសិប",
  "សែសិប",
  "ហាសិប",
  "ហុកសិប",
  "ចិតសិប",
  "ប៉ែតសិប",
  "កៅសិប",
];

const int2Khmer = (inputNum: number, space: string): string => {
  const num = Math.floor(inputNum);
  if (num >= 1000000) {
    return sprintf(
      "%sលាន%s%s",
      int2Khmer(Math.floor(num / 1000000), space),
      space,
      int2Khmer(Math.floor(num % 1000000), space)
    );
  } else if (num >= 100000) {
    return sprintf(
      "%sសែន%s%s",
      int2Khmer(Math.floor(num / 100000), space),
      space,
      int2Khmer(Math.floor(num % 100000), space)
    );
  } else if (num >= 10000) {
    return sprintf(
      "%sម៉ឺន%s%s",
      int2Khmer(Math.floor(num / 10000), space),
      space,
      int2Khmer(Math.floor(num % 10000), space)
    );
  } else if (num >= 1000) {
    return sprintf(
      "%sពាន់%s%s",
      int2Khmer(Math.floor(num / 1000), space),
      space,
      int2Khmer(Math.floor(num % 1000), space)
    );
  } else if (num >= 100) {
    return sprintf(
      "%sរយ%s%s",
      int2Khmer(Math.floor(num / 100), space),
      space,
      int2Khmer(Math.floor(num % 100), space)
    );
  } else if (num >= 10) {
    return sprintf(
      "%s%s%s",
      KHMER_TENTH[Math.floor(num / 10)],
      space,
      KHMER_DIGIT_WORD[Math.floor(num % 10)]
    );
  } else if (num > 0) {
    return KHMER_DIGIT_WORD[num];
  }

  return "";
};

const int2Word = (num: number, space: string) => {
  if (num === 0) {
    return "សូន្យ";
  } else {
    return int2Khmer(num, space);
  }
};

export const countLeading = (str: string, item: any): number => {
  let counter = 0;
  for (const value of str) {
    if (value === item) {
      counter++;
    } else {
      break;
    }
    return counter;
  }
  return counter;
};

export const khmer2RomanNum = (roman: string): string => {
  let khNum = "";
  khNum = voca.replaceAll(roman, "០", "0");
  khNum = voca.replaceAll(khNum, "១", "1");
  khNum = voca.replaceAll(khNum, "២", "2");
  khNum = voca.replaceAll(khNum, "៣", "3");
  khNum = voca.replaceAll(khNum, "៤", "4");
  khNum = voca.replaceAll(khNum, "៥", "5");
  khNum = voca.replaceAll(khNum, "៦", "6");
  khNum = voca.replaceAll(khNum, "៧", "7");
  khNum = voca.replaceAll(khNum, "៨", "8");
  khNum = voca.replaceAll(khNum, "៩", "9");
  khNum = voca.replaceAll(khNum, ",", "");
  khNum = voca.replaceAll(khNum, ".", ".");
  return khNum;
};

export const Num2Word = (num: string, space: string): string => {
  let nums = voca.split(khmer2RomanNum(num), ".");

  if (nums.length === 1) {
    let digit = Number(nums[0]);
    return int2Word(digit, space);
  }

  let digit = Number(nums[0]);

  let precision = Number(nums[1]);
  let lead_zero = "";
  for (let value of nums[1]) {
    if (value === "0") {
      lead_zero += space;
      lead_zero += "សូន្យ";
    } else {
      break;
    }
  }

  return sprintf(
    "%s%sចុច%s%s%s",
    int2Word(digit, space),
    space,
    lead_zero,
    space,
    int2Khmer(precision, space)
  );
};
