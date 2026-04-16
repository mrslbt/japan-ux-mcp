export interface Era {
  name: string;
  nameRomaji: string;
  abbrev: string;
  startDate: string;
  endDate: string | null;
}

export const ERAS: Era[] = [
  { name: "令和", nameRomaji: "Reiwa", abbrev: "R", startDate: "2019-05-01", endDate: null },
  { name: "平成", nameRomaji: "Heisei", abbrev: "H", startDate: "1989-01-08", endDate: "2019-04-30" },
  { name: "昭和", nameRomaji: "Showa", abbrev: "S", startDate: "1926-12-25", endDate: "1989-01-07" },
  { name: "大正", nameRomaji: "Taisho", abbrev: "T", startDate: "1912-07-30", endDate: "1926-12-24" },
  { name: "明治", nameRomaji: "Meiji", abbrev: "M", startDate: "1868-01-25", endDate: "1912-07-29" },
];

export function gregorianToEra(year: number, month: number = 1, day: number = 1): { era: string; year: number } {
  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  for (const era of ERAS) {
    if (dateStr >= era.startDate && (era.endDate === null || dateStr <= era.endDate)) {
      const eraStartYear = parseInt(era.startDate.substring(0, 4));
      const eraYear = year - eraStartYear + 1;
      return { era: era.name, year: eraYear };
    }
  }

  return { era: "西暦", year };
}

export function eraToGregorian(eraName: string, eraYear: number): number {
  const era = ERAS.find((e) => e.name === eraName || e.nameRomaji === eraName || e.abbrev === eraName);
  if (!era) throw new Error(`Unknown era: ${eraName}`);
  const startYear = parseInt(era.startDate.substring(0, 4));
  return startYear + eraYear - 1;
}

export function formatJapaneseDate(year: number, month: number, day: number): string {
  const { era, year: eraYear } = gregorianToEra(year, month, day);
  const eraYearStr = eraYear === 1 ? "元" : String(eraYear);
  return `${era}${eraYearStr}年${month}月${day}日`;
}
