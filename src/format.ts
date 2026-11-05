const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

// اعداد روی کاغذ دفتر با رقم فارسی نوشته می‌شوند، نه لاتین.
export function fa(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}
