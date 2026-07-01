import { TELEGRAM_CONFIG } from "./data/telegram";
import type { Student } from "./types";

export async function notifyTelegram(student: Student, score: number, total: number) {
  const { botToken, chatId } = TELEGRAM_CONFIG;
  if (!botToken || !chatId) return;

  const text = [
    "📋 تکلیف تعاملی انجام شد",
    `👤 ${student.name} (صندلی ${student.seat})`,
    `🔑 نام‌کاربری: ${student.username}`,
    `✅ نمره: ${score} از ${total}`,
    `🕒 ${new Date().toLocaleString("fa-IR")}`,
  ].join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch {
    // اگر شبکه در دسترس نبود، بی‌صدا نادیده گرفته می‌شود؛ نتیجه هنوز در localStorage ذخیره است.
  }
}
