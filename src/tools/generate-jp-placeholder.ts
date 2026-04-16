import {
  SURNAMES,
  GIVEN_NAMES_MALE,
  GIVEN_NAMES_FEMALE,
  SAMPLE_ADDRESSES,
  COMPANY_PREFIXES,
  COMPANY_NAMES,
} from "../data/names.js";
import { formatJapaneseDate } from "../data/era-years.js";
import { generateRandomPhone } from "../data/phone-formats.js";

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export interface PlaceholderParams {
  count: number;
  fields: string[];
  gender: "mixed" | "male" | "female";
  age_range?: string;
}

export function generateJpPlaceholder(params: PlaceholderParams): object[] {
  const { count, fields, gender, age_range } = params;

  let minAge = 20;
  let maxAge = 65;
  if (age_range) {
    const match = age_range.match(/(\d+)\s*-\s*(\d+)/);
    if (match) {
      minAge = parseInt(match[1]);
      maxAge = parseInt(match[2]);
    }
  }

  const results: object[] = [];
  const currentYear = new Date().getFullYear();

  for (let idx = 0; idx < Math.min(count, 50); idx++) {
    const record: Record<string, unknown> = {};
    const isMale = gender === "male" || (gender === "mixed" && Math.random() > 0.5);

    if (fields.includes("name")) {
      const surname = pick(SURNAMES);
      const givenName = isMale ? pick(GIVEN_NAMES_MALE) : pick(GIVEN_NAMES_FEMALE);
      record.sei = surname.kanji;
      record.mei = givenName.kanji;
      record.sei_kana = surname.kana;
      record.mei_kana = givenName.kana;
      record.sei_romaji = surname.romaji;
      record.mei_romaji = givenName.romaji;
    }

    if (fields.includes("email")) {
      const seiR = (record.sei_romaji as string) || pick(SURNAMES).romaji;
      const meiR = (record.mei_romaji as string) || pick(GIVEN_NAMES_MALE).romaji;
      const domains = ["example.co.jp", "example.ne.jp", "example.or.jp"];
      record.email = `${seiR.toLowerCase()}.${meiR.toLowerCase()}@${pick(domains)}`;
    }

    if (fields.includes("phone")) {
      const phone = generateRandomPhone();
      record.phone = phone.parts;
      record.phone_formatted = phone.formatted;
    }

    if (fields.includes("address")) {
      const addr = pick(SAMPLE_ADDRESSES);
      record.postal_code = addr.postalCode;
      record.prefecture = addr.prefecture;
      record.city = addr.city;
      record.address_line = `${addr.area}${addr.block}`;
      record.building = addr.building;
      record.full_address = `〒${addr.postalCode} ${addr.prefecture}${addr.city}${addr.area}${addr.block}${addr.building ? " " + addr.building : ""}`;
    }

    if (fields.includes("company")) {
      const prefix = pick(COMPANY_PREFIXES);
      const name = pick(COMPANY_NAMES);
      record.company = `${prefix}${name}`;
    }

    if (fields.includes("date_of_birth")) {
      const age = minAge + Math.floor(Math.random() * (maxAge - minAge + 1));
      const birthYear = currentYear - age;
      const birthMonth = Math.floor(Math.random() * 12) + 1;
      const birthDay = Math.floor(Math.random() * 28) + 1;
      const gregorian = `${birthYear}-${String(birthMonth).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`;
      const japanese = formatJapaneseDate(birthYear, birthMonth, birthDay);
      record.date_of_birth = { gregorian, japanese };
    }

    results.push(record);
  }

  return results;
}
