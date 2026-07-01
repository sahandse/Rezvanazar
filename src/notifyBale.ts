import { BALE_CONFIG } from "./data/bale";
import { buildExamResultMessage, buildLoginMessage } from "./notifyMessages";
import { sendWithRetry } from "./sendWithRetry";
import type { Student } from "./types";

function sendToBale(text: string) {
  const { botToken, chatId } = BALE_CONFIG;
  if (!botToken || !chatId) return;

  // بله (Bale) از API‌ای همسو با تلگرام استفاده می‌کند: https://tapi.bale.ai/bot<token>/METHOD
  const url =
    `https://tapi.bale.ai/bot${botToken}/sendMessage` +
    `?chat_id=${encodeURIComponent(chatId)}&parse_mode=HTML&text=${encodeURIComponent(text)}`;

  return sendWithRetry(url);
}

export function notifyLogin(student: Student) {
  return sendToBale(buildLoginMessage(student));
}

export function notifyExamResult(student: Student, score: number, total: number) {
  return sendToBale(buildExamResultMessage(student, score, total));
}
