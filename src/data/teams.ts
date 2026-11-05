export interface Team {
  id: string;
  name: string;
  emoji: string;
  badge: string;
  motto: string;
  // شماره پیراهن تیم — فقط برای نمایش در تم فوتبالی پروفایل
  number: string;
  // رنگ اصلی تیم برای قاب و برچسب‌ها
  primary: string;
  // همان رنگ اما تیره‌تر، برای متنی که روی کاغذ سفید خوانا باشد
  ink: string;
  // رنگ بسیار روشن برای پس‌زمینه
  soft: string;
}

const asset = (file: string) => `${import.meta.env.BASE_URL}img/${file}`;

export const teams: Team[] = [
  {
    id: "messi",
    name: "تیم مسی",
    emoji: "⚽",
    badge: asset("team-messi.svg"),
    motto: "آرام بازی کن، دقیق گل بزن",
    number: "۱۰",
    primary: "#3d84c6",
    ink: "#27639b",
    soft: "#e6f1fb",
  },
  {
    id: "ronaldo",
    name: "تیم رونالدو",
    emoji: "🎯",
    badge: asset("team-ronaldo.svg"),
    motto: "تمرین زیاد، گل زیاد",
    number: "۷",
    primary: "#e8503f",
    ink: "#b8301f",
    soft: "#fdeae5",
  },
  {
    id: "haaland",
    name: "تیم هالند",
    emoji: "⚡",
    badge: asset("team-haaland.svg"),
    motto: "سریع بدو، قوی شوت بزن",
    number: "۹",
    primary: "#f0a91c",
    ink: "#a06a05",
    soft: "#fdf2da",
  },
  {
    id: "harry",
    name: "تیم هری پاتر",
    emoji: "🪄",
    badge: asset("team-harry.svg"),
    motto: "کتاب خواندن جادوی واقعی است",
    number: "۱۱",
    primary: "#8e6bb5",
    ink: "#6b4a92",
    soft: "#f2e9fb",
  },
];
