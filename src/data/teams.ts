export interface Team {
  id: string;
  name: string;
  player: string;
  number: number;
  primary: string;
  secondary: string;
  image: string;
  bio: string;
}

export const teams: Team[] = [
  {
    id: "messi",
    name: "تیم مسی",
    player: "لیونل مسی",
    number: 10,
    primary: "#f5a3c7",
    secondary: "#1a1a1a",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Lionel_Messi_20240629_%28cropped%29.jpg/220px-Lionel_Messi_20240629_%28cropped%29.jpg",
    bio: "🏆 ۸ جایزهٔ توپ طلا — بازیکن تاریخ فوتبال 🇦🇷",
  },
  {
    id: "ronaldo",
    name: "تیم رونالدو",
    player: "کریستیانو رونالدو",
    number: 7,
    primary: "#d40000",
    secondary: "#046a38",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/220px-Cristiano_Ronaldo_2018.jpg",
    bio: "🏆 ۵ جایزهٔ توپ طلا — بازیکن برتر تاریخ فوتبال 🇵🇹",
  },
  {
    id: "haaland",
    name: "تیم هالند",
    player: "ارلینگ هالند",
    number: 9,
    primary: "#6cabdd",
    secondary: "#1c2c5b",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Erling_Haaland_2023.jpg/220px-Erling_Haaland_2023.jpg",
    bio: "⚡ مهاجم فوق‌العاده قدرتمند — ستارهٔ نوجوان",
  },
  {
    id: "mbappe",
    name: "تیم امباپه",
    player: "کیلیان امباپه",
    number: 7,
    primary: "#004170",
    secondary: "#da291c",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kylian_Mbapp%C3%A9_2018.jpg/220px-Kylian_Mbapp%C3%A9_2018.jpg",
    bio: "⚡ سرعت و مهارت بی‌نظیر — ستارهٔ فرانسه",
  },
];
