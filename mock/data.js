// mock/data.js

export const lebronBets = [
  {
    stat: "Points",
    over: { value: 25.5, odds: 1.91 },
    under: { value: 25.5, odds: 1.83 }
  },
  {
    stat: "Assists",
    over: { value: 7.5, odds: 1.80 },
    under: { value: 7.5, odds: 2.10 }
  },
  {
    stat: "Rebounds",
    over: { value: 8.5, odds: 1.76 },
    under: { value: 8.5, odds: 2.20 }
  }
];

export const lakersBets = [
  {
    stat: "Victoire",
    options: [
      { label: "Lakers", odds: 1.75 },
      { label: "Celtics", odds: 2.05 }
    ]
  },
  {
    stat: "Total Points",
    over: { value: 110.5, odds: 1.85 },
    under: { value: 110.5, odds: 1.98 }
  }
];

export const lebronStats = [
  {
    date: "2025-04-19",
    opponent: "Grizzlies",
    home: false,
    teamScore: 101,
    opponentScore: 103,
    teamStats: { Points: 101, Assists: 28, Rebounds: 49 },
    opponentStats: { Points: 103, Assists: 19, Rebounds: 39 },
    lebronStats: { Points: 28, Assists: 7, Rebounds: 5}
  },
  {
    date: "2025-04-17",
    opponent: "Suns",
    home: true,
    teamScore: 103,
    opponentScore: 105,
    teamStats: { Points: 103, Assists: 22, Rebounds: 48 },
    opponentStats: { Points: 105, Assists: 21, Rebounds: 44 },
    lebronStats: { Points: 34, Assists: 9, Rebounds: 7}
  },
  {
    date: "2025-04-15",
    opponent: "Warriors",
    home: false,
    teamScore: 117,
    opponentScore: 102,
    teamStats: { Points: 117, Assists: 21, Rebounds: 43 },
    opponentStats: { Points: 102, Assists: 25, Rebounds: 45 },
    lebronStats: { Points: 32, Assists: 9, Rebounds: 5}
  },
  {
    date: "2025-04-13",
    opponent: "Celtics",
    home: true,
    teamScore: 105,
    opponentScore: 104,
    teamStats: { Points: 105, Assists: 23, Rebounds: 45 },
    opponentStats: { Points: 104, Assists: 28, Rebounds: 49 },
    lebronStats: { Points: 27, Assists: 8, Rebounds: 5}
  },
  {
    date: "2025-04-11",
    opponent: "Bucks",
    home: false,
    teamScore: 122,
    opponentScore: 119,
    teamStats: { Points: 122, Assists: 21, Rebounds: 53 },
    opponentStats: { Points: 119, Assists: 19, Rebounds: 38 },
    lebronStats: { Points: 21, Assists: 5, Rebounds: 7}
  },
  {
    date: "2025-04-09",
    opponent: "Clippers",
    home: true,
    teamScore: 102,
    opponentScore: 98,
    teamStats: { Points: 102, Assists: 20, Rebounds: 51 },
    opponentStats: { Points: 98, Assists: 18, Rebounds: 51 },
    lebronStats: { Points: 30, Assists: 9, Rebounds: 10}
  },
  {
    date: "2025-04-07",
    opponent: "Mavericks",
    home: false,
    teamScore: 107,
    opponentScore: 109,
    teamStats: { Points: 107, Assists: 21, Rebounds: 46 },
    opponentStats: { Points: 109, Assists: 27, Rebounds: 45 },
    lebronStats: { Points: 20, Assists: 9, Rebounds: 12}
  },
  {
    date: "2025-04-05",
    opponent: "Heat",
    home: true,
    teamScore: 106,
    opponentScore: 113,
    teamStats: { Points: 106, Assists: 24, Rebounds: 48 },
    opponentStats: { Points: 113, Assists: 21, Rebounds: 39 },
    lebronStats: { Points: 34, Assists: 6, Rebounds: 11}
  },
  {
    date: "2025-04-03",
    opponent: "Nuggets",
    home: false,
    teamScore: 114,
    opponentScore: 95,
    teamStats: { Points: 114, Assists: 25, Rebounds: 41 },
    opponentStats: { Points: 95, Assists: 22, Rebounds: 40 },
    lebronStats: { Points: 30, Assists: 10, Rebounds: 6}
  },
  {
    date: "2025-04-01",
    opponent: "Pelicans",
    home: true,
    teamScore: 116,
    opponentScore: 103,
    teamStats: { Points: 116, Assists: 28, Rebounds: 51 },
    opponentStats: { Points: 103, Assists: 20, Rebounds: 39 },
    lebronStats: { Points: 27, Assists: 10, Rebounds: 9}
  }
];

