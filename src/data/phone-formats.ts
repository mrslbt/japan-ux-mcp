export interface PhoneFormat {
  type: string;
  prefixes: string[];
  totalDigits: number;
  fields: [number, number, number];
  description: string;
}

export const PHONE_FORMATS: PhoneFormat[] = [
  {
    type: "mobile",
    prefixes: ["070", "080", "090"],
    totalDigits: 11,
    fields: [3, 4, 4],
    description: "Mobile phone numbers",
  },
  {
    type: "ip_phone",
    prefixes: ["050"],
    totalDigits: 11,
    fields: [3, 4, 4],
    description: "IP phone numbers",
  },
  {
    type: "tokyo",
    prefixes: ["03"],
    totalDigits: 10,
    fields: [2, 4, 4],
    description: "Tokyo 23 wards",
  },
  {
    type: "osaka",
    prefixes: ["06"],
    totalDigits: 10,
    fields: [2, 4, 4],
    description: "Osaka",
  },
  {
    type: "toll_free",
    prefixes: ["0120"],
    totalDigits: 10,
    fields: [4, 3, 3],
    description: "Toll-free numbers",
  },
  {
    type: "navi_dial",
    prefixes: ["0570"],
    totalDigits: 10,
    fields: [4, 3, 3],
    description: "Navi Dial (unified national numbers)",
  },
];

export const PHONE_VALIDATION = {
  field1: { pattern: "[0-9]{2,5}", maxLength: 5 },
  field2: { pattern: "[0-9]{1,4}", maxLength: 4 },
  field3: { pattern: "[0-9]{4}", maxLength: 4 },
};

export function generateRandomPhone(): { parts: [string, string, string]; formatted: string } {
  const prefix = ["090", "080", "070"][Math.floor(Math.random() * 3)];
  const mid = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  const last = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return {
    parts: [prefix, mid, last],
    formatted: `${prefix}-${mid}-${last}`,
  };
}
