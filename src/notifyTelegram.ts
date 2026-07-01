import { TELEGRAM_CONFIG } from "./data/telegram";
import type { Student } from "./types";

const RETRY_DELAYS_MS = [0, 2000, 5000, 10000];
const REQUEST_TIMEOUT_MS = 8000;

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function sendToTelegram(text: string) {
  const { botToken, chatId } = TELEGRAM_CONFIG;
  if (!botToken || !chatId) return;

  // درخواست GET ساده به‌جای POST با هدر JSON، چون هدر JSON باعث
  // preflight می‌شود و مرورگر قبل از رسیدن درخواست به تلگرام آن را مسدود می‌کند.
  const url =
    `https://api.telegram.org/bot${botToken}/sendMessage` +
    `?chat_id=${encodeURIComponent(chatId)}&text=${encodeURIComponent(text)}`;

  // چون اتصال به تلگرام از برخی شبکه‌ها ناپایدار است (تایم‌اوت یا قطعی موقت)،
  // چند بار با فاصله‌ی افزایشی تلاش می‌کنیم تا شانس رسیدن پیام بیشتر شود.
  for (const delay of RETRY_DELAYS_MS) {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    try {
      await fetchWithTimeout(url);
      return;
    } catch {
      // تلاش بعدی انجام می‌شود.
    }
  }
}

export function notifyLogin(student: Student) {
  const text = [
    "🔓 ورود دانش‌آموز",
    `👤 ${student.name} (صندلی ${student.seat})`,
    `🔑 نام‌کاربری: ${student.username}`,
    `🕒 ${new Date().toLocaleString("fa-IR")}`,
  ].join("\n");
  return sendToTelegram(text);
}

export function notifyExamResult(student: Student, score: number, total: number) {
  const text = [
    "📋 تکلیف تعاملی انجام شد",
    `👤 ${student.name} (صندلی ${student.seat})`,
    `🔑 نام‌کاربری: ${student.username}`,
    `✅ نمره: ${score} از ${total}`,
    `🕒 ${new Date().toLocaleString("fa-IR")}`,
  ].join("\n");
  return sendToTelegram(text);
}
