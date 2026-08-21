// اطلاعات ربات پیام‌رسان بله (جایگزین/پشتیبان تلگرام).
// همانند تلگرام، این‌ها هرگز نباید در کد نوشته یا commit شوند — از
// .env.local یا GitHub Actions secrets استفاده کنید (به توضیح در
// telegram.ts مراجعه کنید).
export const BALE_CONFIG = {
  botToken: import.meta.env.VITE_BALE_BOT_TOKEN ?? "",
  chatId: import.meta.env.VITE_BALE_CHAT_ID ?? "",
};
