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

// چون اتصال به برخی سرویس‌های پیام‌رسان از بعضی شبکه‌ها ناپایدار است،
// چند بار با فاصله‌ی افزایشی تلاش می‌کنیم تا شانس رسیدن پیام بیشتر شود.
export async function sendWithRetry(url: string) {
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
