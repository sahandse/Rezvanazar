interface CertificateParams {
  name: string;
  seat: number;
  score: number;
  total: number;
  date: string;
}

const WIDTH = 640;
const HEIGHT = 420;

function starRating(percentage: number) {
  if (percentage >= 100) return 3;
  if (percentage >= 60) return 2;
  return 1;
}

export async function drawCertificate(canvas: HTMLCanvasElement, { name, seat, score, total, date }: CertificateParams) {
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

  ctx.fillStyle = "#fffaf0";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.strokeStyle = "#a9744a";
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, WIDTH - 28, HEIGHT - 28);
  ctx.strokeStyle = "#eadfc4";
  ctx.lineWidth = 2;
  ctx.strokeRect(26, 26, WIDTH - 52, HEIGHT - 52);

  ctx.fillStyle = "#6b4a2f";
  ctx.font = "20px Vazirmatn";
  ctx.fillText("دبستان پسرانه تشیع ۲", WIDTH / 2, 70);

  ctx.fillStyle = "#a9744a";
  ctx.font = "bold 36px Vazirmatn";
  ctx.fillText("کارت افتخار", WIDTH / 2, 120);

  ctx.fillStyle = "#4a2f1c";
  ctx.font = "bold 30px Vazirmatn";
  ctx.fillText(name, WIDTH / 2, 190);

  ctx.fillStyle = "#6b4a2f";
  ctx.font = "18px Vazirmatn";
  ctx.fillText(`صندلی ${seat}`, WIDTH / 2, 220);

  ctx.fillStyle = "#2f6b41";
  ctx.font = "bold 24px Vazirmatn";
  ctx.fillText(`نمره: ${score} از ${total} (${percentage}٪)`, WIDTH / 2, 265);

  const rating = starRating(percentage);
  const starSpacing = 44;
  const startX = WIDTH / 2 - starSpacing;
  ctx.font = "34px Vazirmatn";
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i < rating ? "#c9a15a" : "#e3d9c2";
    ctx.fillText("★", startX + i * starSpacing, 320);
  }

  ctx.fillStyle = "#8a7a5f";
  ctx.font = "16px Vazirmatn";
  ctx.fillText(date, WIDTH / 2, 375);
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
}
