import { fa } from "./format";

interface CertificateParams {
  name: string;
  seat: number;
  score: number;
  total: number;
  date: string;
  title?: string;
}

const WIDTH = 640;
const HEIGHT = 420;

const PAPER = "#fffdf6";
const RULE = "rgba(61, 132, 198, 0.14)";
const CRAYON = "#46372b";
const RED = "#e8503f";
const BLUE = "#3d84c6";
const GREEN_INK = "#2f7d4a";
const YELLOW = "#f7c948";
const GOLD = "#f0a91c";
const GOLD_OFF = "#e6dcc4";
const TEXT = "#33291f";
const TEXT_SOFT = "#6a5a48";
const TEXT_MUTED = "#8b7c68";

function starRating(percentage: number) {
  if (percentage >= 100) return 3;
  if (percentage >= 60) return 2;
  return 1;
}

// قاب کج، مثل خطی که بچه با مدادشمعی دور کاغذ می‌کشد
function crayonFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, seed: number) {
  const offset = (i: number) => Math.sin(seed * 7 + i * 3.3) * 2.6;
  ctx.beginPath();
  ctx.moveTo(x + offset(0), y + offset(1));
  ctx.lineTo(x + w + offset(2), y + offset(3));
  ctx.lineTo(x + w + offset(4), y + h + offset(5));
  ctx.lineTo(x + offset(6), y + h + offset(7));
  ctx.closePath();
  ctx.stroke();
}

// ستارهٔ پنج‌پر که بچه با مدادشمعی می‌کشد: اضلاع کمی لنگ می‌زنند
function crayonStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, seed: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const wobble = 1 + Math.sin(seed * 5 + i * 2.1) * 0.09;
    const r = (i % 2 === 0 ? radius : radius * 0.45) * wobble;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export async function drawCertificate(
  canvas: HTMLCanvasElement,
  { name, seat, score, total, date, title = "کارت افتخار" }: CertificateParams
) {
  if ("fonts" in document) {
    await document.fonts.ready;
  }

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  ctx.direction = "rtl";
  ctx.textAlign = "center";

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // خط‌های دفتر مشق
  ctx.strokeStyle = RULE;
  ctx.lineWidth = 1.5;
  for (let y = 96; y < HEIGHT - 40; y += 34) {
    ctx.beginPath();
    ctx.moveTo(46, y);
    ctx.lineTo(WIDTH - 46, y);
    ctx.stroke();
  }

  // قاب مدادشمعی: بیرونی جوهری، درونی ماژیک زرد
  ctx.strokeStyle = CRAYON;
  ctx.lineWidth = 6;
  crayonFrame(ctx, 16, 16, WIDTH - 32, HEIGHT - 32, 1);
  ctx.strokeStyle = YELLOW;
  ctx.lineWidth = 4;
  crayonFrame(ctx, 30, 30, WIDTH - 60, HEIGHT - 60, 2);

  ctx.fillStyle = TEXT_SOFT;
  ctx.font = "20px Vazirmatn";
  ctx.fillText("دبستان پسرانه تشیع ۲", WIDTH / 2, 74);

  ctx.fillStyle = RED;
  ctx.font = "40px Lalezar, Vazirmatn";
  ctx.fillText(title, WIDTH / 2, 128);

  ctx.fillStyle = TEXT;
  ctx.font = "bold 30px Vazirmatn";
  ctx.fillText(name, WIDTH / 2, 192);

  ctx.fillStyle = BLUE;
  ctx.font = "18px Vazirmatn";
  ctx.fillText(`صندلی ${fa(seat)}`, WIDTH / 2, 222);

  ctx.fillStyle = GREEN_INK;
  ctx.font = "bold 24px Vazirmatn";
  ctx.fillText(`نمره: ${fa(score)} از ${fa(total)} (${fa(percentage)}٪)`, WIDTH / 2, 266);

  const rating = starRating(percentage);
  const starSpacing = 54;
  const startX = WIDTH / 2 - starSpacing;
  for (let i = 0; i < 3; i++) {
    const earned = i < rating;
    crayonStar(ctx, startX + i * starSpacing, 314, 21, i + 1);
    ctx.fillStyle = earned ? GOLD : GOLD_OFF;
    ctx.fill();
    ctx.strokeStyle = earned ? "#a06a05" : "#c3b795";
    ctx.lineWidth = 3.5;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "16px Vazirmatn";
  ctx.fillText(date, WIDTH / 2, 372);
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
}
