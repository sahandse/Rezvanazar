// اطلاعات ربات تلگرام برای اطلاع‌رسانی نتایج به مدیر.
// این پروژه یک سایت استاتیک (GitHub Pages) است، پس مقدار اینجا هیچ‌وقت واقعاً
// «مخفی» نمی‌ماند و در باندل جاوااسکریپت عمومی قابل مشاهده است. بنابراین
// توکن را هرگز در کد ننویسید و commit نکنید؛ آن را در .env.local (محلی) یا
// GitHub Actions secrets (برای دیپلوی) بگذارید. اگر توکنی اشتباهی commit شد،
// فوراً آن را در BotFather ابطال (revoke) و توکن تازه بسازید.
export const TELEGRAM_CONFIG = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? "",
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID ?? "",
};
