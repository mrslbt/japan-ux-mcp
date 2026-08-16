# Changelog

## 2.1.0 (2026-07-17)

Accuracy audit release. Every rule and data claim in the package was fact-checked against JLReq, JIS X 4051, Japanese law, and documented practice (~574 claims reviewed across three independent audit passes). 67 corrections landed.

### Correctness: typography

- **Kinsoku shori rewritten.** `line-break: strict` is now the detected and recommended kinsoku control. Removed the false claims that `word-break: keep-all` "activates the kinsoku engine" and that browsers "default to break-all". Browsers apply default kinsoku to Japanese text automatically.
- **New rule: `word-break: break-all` is flagged as a kinsoku violation** (permits 、。 and small kana at line starts; JIS X 4051 basis).
- **`word-break: keep-all` demoted to an overflow-risk warning** on Japanese body text (it is primarily for Korean); acceptable for short headings with `<wbr>`.
- Font-size thresholds now consistent with the package's own TYPE_SCALE: error below 12px, captions/fine-print exception at 12-13px, 14px body minimum, 16px recommended.
- Line-height checker: error only below 1.5, body-text caveat at 1.5-1.7, and unit-bearing values (`px`/`%`/`em`) are no longer misparsed as unitless ratios.
- `palt` recommendation scoped to headings/display, paired with `font-kerning: normal`, no longer deducts points; body text keeps full-width metrics.
- Removed the fabricated term "jusuji" from the text-align citation; the rule is now labeled convention, and justify is acknowledged as acceptable for CJK.
- Google Fonts `font-display` check now looks for `display=swap` in the import URL instead of demanding an impossible third-party `@font-face` edit.
- New rules: `font-synthesis: none` suggestion (prevents faux bold/italic) and a `lang="ja"` markup check (missing lang causes Chinese-glyph fallback).
- Japanese-font detection no longer matches plain "Noto Sans" without the JP subset.

### Correctness: color and culture

- Red-name taboo rationale corrected (red marks the names of the living on gravestones; funeral documents use black or diluted ink).
- Monochrome black+white finding downgraded to info with corrected romaji (kuroshiro), acknowledging monochrome as normal in fashion, luxury, and editorial design.
- Removed unverifiable claims: "dark mode 2-3 years behind", gold-in-banking branding, absolute animation-restraint preference.

### Correctness: law and compliance

- 総額表示 (tax-inclusive pricing): mandatory since April 1, 2021 under the Consumption Tax Act, not the Tokushoho and not 2022.
- APPI: 5,000-record exemption removal correctly attributed to the 2015 amendment (effective 2017); GDPR-style consent formalities no longer stated as APPI law.
- 景品表示法 prize rules corrected: 一般懸賞 20x transaction value capped at ¥100,000 and 2% of sales; 総付景品 20%; オープン懸賞 uncapped since 2006.
- KK minimum capital is ¥1 (2006 Companies Act); 古物商許可番号 is 12 digits; TRUSTe Japan attributed to JPAC; Telecom Business Act 外部送信規律 dates fixed (passed June 2022, effective June 16, 2023); prepaid instruments over ¥10M require notification, not registration.
- Accessibility citations fixed: JIS X 8341-3:2016 corresponds to WCAG 2.0; the 44px touch target is WCAG 2.1 AAA / JP convention (WCAG 2.2 AA minimum is 24px); government conformance guidance no longer described as a statutory mandate.

### Correctness: platform and seasonal

- **LINE Pay Japan integration removed** (domestic service terminated April 30, 2025); entries now point to PayPay.
- Apple Pay: Japan supports both FeliCa and EMV contactless (not FeliCa-only).
- 特定電子メール法 no longer cited for LINE push messages; LINE user count standardized to 97M MAU (2024).
- Mountain Day (山の日, Aug 11) added; Golden Week now surfaces in both April and May; Setsubun/equinox/Black Friday date definitions corrected; Tanabata added to the canonical events list; microseason id shoukan fixed.

### Correctness: forms and language

- Name validation no longer rejects legal Japanese names: kanji patterns accept CJK Compatibility Ideographs and Extension A (山﨑 now validates); kana patterns accept the nakaguro and spaces (ジョン・スミス now validates). Applied across generate, validate, and transform tools.
- Keigo fixes: 「ご送信」→「送信する」, 「取り消す」→「キャンセル」, 「〜をご確認」fragments completed, して-form corrected.
- Single-field phone inputs are no longer penalized (Digital Agency design system recommends single-field); the two-field case now gets an explicit note.
- Date-field detection regex no longer false-positives on `data-update`/`candidate`/`validate`.
- Okinawa region label is now 九州・沖縄; Tokyo 03 description covers the wider 03 area.

### Softened from fact to tendency

- "More text is always better", "Japanese users are passive browsers", the chirashi-lineage theory, desktop-hamburger and tablet-design absolutes, and Hofstede framing (score standardized to 92, "among the highest").

## 2.0.1

Previous release.
## [2.1.1] — 2026-08-16

Accuracy pass ahead of launch: every spec citation was re-verified against the
cited documents, and the kinsoku claims were tested empirically in Blink.

### Fixed

- **transform_for_japan no longer deletes fields.** With sibling markup
  (`<label>Name</label><input name="name">`) the wrapped-label regex crossed
  `</label>` boundaries, consumed the input, and the 姓/名+furigana fieldset
  silently never inserted. Regexes are now tempered (never cross a closing
  label), insertion happens before cleanup, and bare sibling labels are
  removed instead of orphaned. Regression tests cover the exact failing markup.
- **break-all finding corrected and relabeled.** CSS Text Level 3 says
  word-break: break-all does not affect punctuation kinsoku (that is
  line-break's job), confirmed by in-browser testing. The finding now states
  the real hazard (mid-word breaks in embedded Latin/URLs), cites CSS Text 3
  §5.1, and is labeled convention rather than spec.
- **No-italics finding relabeled convention.** True in practice, but JLReq
  documents kenten and brackets without stating "no italic forms" — the old
  citation overstated the source.
- **Phone philosophy unified: single field everywhere.** validate_jp_form
  already praised the single-field pattern (デジタル庁 design system);
  transform_for_japan and generate_jp_form now emit it too, with
  autocomplete="tel-national" and inputmode="numeric", instead of imposing the
  legacy 3-field split the validator called optional.
- check_jp_typography no longer lists "font sizes meet kanji minimum" as
  passed while warning about a 12-13px size in the same report.

### Added

- 0800 toll-free range in phone formats (alongside 0120).
- get_seasonal_context now defaults to today when month is omitted.

