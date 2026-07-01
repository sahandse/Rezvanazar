import { BALE_CONFIG } from "./data/bale";
import { sendWithRetry } from "./sendWithRetry";
import type { Student } from "./types";

function sendToBale(text: string) {
  const { botToken, chatId } = BALE_CONFIG;
  if (!botToken || !chatId) return;

  // بله (Bale) از API‌ای همسو با تلگرام استفاده می‌کند: https://tapi.bale.ai/bot<token>/METHOD
  const url =
    `https://tapi.bale.ai/bot${botToken}/sendMessage` +
    `?chat_id=${encodeURIComponent(chatId)}&text=${encodeURIComponent(text)}`;

  return sendWithRetry(url);
}

export function notifyLogin(student: Student) {
  const text = [
    "🔓 ورود دانش‌آموز",
    `👤 ${student.name} (صندلی ${student.seat})`,
    `🔑 نام‌کاربری: ${student.username}`,
    `🕒 ${new Date().toLocaleString("fa-IR")}`,
  ].join("\n");
  return sendToBale(text);
}

export function notifyExamResult(student: Student, score: number, total: number) {
  const text = [
    "📋 تکلیف تعاملی انجام شد",
    `👤 ${student.name} (صندلی ${student.seat})`,
    `🔑 نام‌کاربری: ${student.username}`,
    `✅ نمره: ${score} از ${total}`,
    `🕒 ${new Date().toLocaleString("fa-IR")}`,
  ].join("\n");
  return sendToBale(text);
}
