// اطلاعات ربات تلگرام برای اطلاع‌رسانی نتایج به مدیر.
// این پروژه یک سایت کاملاً استاتیک (GitHub Pages) است، پس هیچ مقداری اینجا
// واقعاً «مخفی» نمی‌ماند — همین که در باندل جاوااسکریپت قرار بگیرد با «View
// Source» قابل مشاهده است. بنابراین توکن‌ها هرگز نباید در کد نوشته یا
// commit شوند؛ آن‌ها را در فایل .env.local (که در .gitignore است) یا در
// GitHub Actions secrets قرار دهید. اگر توکنی قبلاً در تاریخچه‌ی گیت
// commit شده، باید فوراً از طریق BotFather ابطال (revoke) شود.
export const TELEGRAM_CONFIG = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? "",
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID ?? "",
};
