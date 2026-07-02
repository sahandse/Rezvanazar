export interface Team {
  id: string;
  name: string;
  player: string;
  number: number;
  primary: string;
  secondary: string;
}

export const teams: Team[] = [
  {
    id: "messi",
    name: "تیم مسی",
    player: "لیونل مسی",
    number: 10,
    primary: "#f5a3c7",
    secondary: "#1a1a1a",
  },
  {
    id: "ronaldo",
    name: "تیم رونالدو",
    player: "کریستیانو رونالدو",
    number: 7,
    primary: "#d40000",
    secondary: "#046a38",
  },
  {
    id: "haaland",
    name: "تیم هالند",
    player: "ارلینگ هالند",
    number: 9,
    primary: "#6cabdd",
    secondary: "#1c2c5b",
  },
  {
    id: "mbappe",
    name: "تیم امباپه",
    player: "کیلیان امباپه",
    number: 7,
    primary: "#004170",
    secondary: "#da291c",
  },
];
