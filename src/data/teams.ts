export interface Team {
  id: string;
  name: string;
  emoji: string;
  badge: string;
  motto: string;
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
    id: "apple",
    name: "تیم سیب",
    emoji: "🍎",
    badge: asset("mascot-apple.png"),
    motto: "هر روز مهربان، هر روز پرتلاش",
    primary: "#e8503f",
    ink: "#b8301f",
    soft: "#fdeae5",
  },
  {
    id: "pencil",
    name: "تیم مداد",
    emoji: "✏️",
    badge: asset("mascot-pencil.png"),
    motto: "تمیز و دقیق می‌نویسیم",
    primary: "#4aa867",
    ink: "#2f7d4a",
    soft: "#e8f6ec",
  },
  {
    id: "star",
    name: "تیم ستاره",
    emoji: "⭐",
    badge: asset("mascot-star.png"),
    motto: "ستارهٔ کلاس ما تویی",
    primary: "#f0a91c",
    ink: "#a06a05",
    soft: "#fdf2da",
  },
  {
    id: "book",
    name: "تیم کتاب",
    emoji: "📚",
    badge: asset("mascot-book.png"),
    motto: "کتاب، بال‌های پرواز ماست",
    primary: "#3d84c6",
    ink: "#27639b",
    soft: "#e6f1fb",
  },
];
