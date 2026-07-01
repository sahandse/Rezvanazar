import { exams } from "./data/exams";
import type { Student } from "./types";

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function remarkFor(percentage: number) {
  if (percentage >= 90) return "🌟 عالی";
  if (percentage >= 70) return "👍 خوب";
  if (percentage >= 50) return "🙂 قابل قبول";
  return "📉 نیاز به تمرین بیشتر";
}

export function buildLoginMessage(student: Student) {
  const name = escapeHtml(student.name);
  const username = escapeHtml(student.username);
  return [
    "🔓 <b>ورود دانش‌آموز</b>",
    `👤 <b>${name}</b> (صندلی ${student.seat})`,
    `🔑 نام‌کاربری: <code>${username}</code>`,
    `🕒 ${new Date().toLocaleString("fa-IR")}`,
  ].join("\n");
}

export function buildExamResultMessage(student: Student, score: number, total: number) {
  const name = escapeHtml(student.name);
  const username = escapeHtml(student.username);
  const examTitle = escapeHtml(exams.find((exam) => exam.id === 1)?.title ?? "تکلیف تعاملی");
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  return [
    `📋 <b>نتیجه‌ی ${examTitle}</b>`,
    `👤 <b>${name}</b> (صندلی ${student.seat})`,
    `🔑 نام‌کاربری: <code>${username}</code>`,
    `✅ نمره: <b>${score} از ${total}</b> (${percentage}٪)`,
    remarkFor(percentage),
    `🕒 ${new Date().toLocaleString("fa-IR")}`,
  ].join("\n");
}
