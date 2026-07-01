import { TELEGRAM_CONFIG } from "./data/telegram";
import type { Student } from "./types";

async function sendToTelegram(text: string) {
  const { botToken, chatId } = TELEGRAM_CONFIG;
  if (!botToken || !chatId) return;

  // درخواست GET ساده به‌جای POST با هدر JSON، چون هدر JSON باعث
  // preflight می‌شود و مرورگر قبل از رسیدن درخواست به تلگرام آن را مسدود می‌کند.
  const url =
    `https://api.telegram.org/bot${botToken}/sendMessage` +
    `?chat_id=${encodeURIComponent(chatId)}&text=${encodeURIComponent(text)}`;

  try {
    await fetch(url);
  } catch {
    // اگر شبکه در دسترس نبود، بی‌صدا نادیده گرفته می‌شود.
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
