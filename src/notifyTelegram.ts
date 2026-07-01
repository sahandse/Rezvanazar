import { TELEGRAM_CONFIG } from "./data/telegram";
import { buildExamResultMessage, buildLoginMessage } from "./notifyMessages";
import { sendWithRetry } from "./sendWithRetry";
import type { Student } from "./types";

function sendToTelegram(text: string) {
  const { botToken, chatId } = TELEGRAM_CONFIG;
  if (!botToken || !chatId) return;

  // درخواست GET ساده به‌جای POST با هدر JSON، چون هدر JSON باعث
  // preflight می‌شود و مرورگر قبل از رسیدن درخواست به تلگرام آن را مسدود می‌کند.
  const url =
    `https://api.telegram.org/bot${botToken}/sendMessage` +
    `?chat_id=${encodeURIComponent(chatId)}&parse_mode=HTML&text=${encodeURIComponent(text)}`;

  return sendWithRetry(url);
}

export function notifyLogin(student: Student) {
  return sendToTelegram(buildLoginMessage(student));
}

export function notifyExamResult(student: Student, score: number, total: number) {
  return sendToTelegram(buildExamResultMessage(student, score, total));
}
