// اطلاعات ربات پیام‌رسان بله (جایگزین/پشتیبان تلگرام).
// مثل تلگرام، توکن و شناسه گفتگو باید از .env.local یا GitHub Actions secrets
// خوانده شوند و هیچ‌وقت در کد commit نشوند.
export const BALE_CONFIG = {
  botToken: import.meta.env.VITE_BALE_BOT_TOKEN ?? "",
  chatId: import.meta.env.VITE_BALE_CHAT_ID ?? "",
};
