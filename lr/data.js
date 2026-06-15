/* LONGRISE — app data (faithful to server build structure, static preview values) */
window.LR = {
  user: {
    name: "DANIEL PARK",
    id: "LR-88412",
    rank: "GOLD",
    rankIndex: 2,
    nextRank: "PLATINUM",
    memberSince: "Feb 2026",
    refCode: "LR88412GOLD",
    refLink: "longrise.ai/r/LR88412GOLD",
    initials: "DP"
  },

  // wallet / "My Wealth"
  balance: {
    total: 38344.72,
    available: 12480.50,    // free USDT
    earned: 1864.22,        // earned dividends (withdrawable)
    invested: 24000.00,     // capital in packages
    cnyt: 5320.00           // CNYT rewards
  },

  dailyEarning: 412.18,     // today's dividend
  weekEarnings: [212, 248, 196, 284, 262, 318, 412],

  // Auto Betting Package tiers
  packages: [
    { id: "flexible", name: "FLEXIBLE", price: 200,  tier: "ENTRY LEVEL", roi: "84%~",  monthlyCnyt: 24,  period: "12 MONTHS", popular: false },
    { id: "basic",    name: "BASIC",    price: 300,  tier: "ENTRY LEVEL", roi: "96%~",  monthlyCnyt: 45,  period: "12 MONTHS", popular: false },
    { id: "standard", name: "STANDARD", price: 500,  tier: "ENTRY LEVEL", roi: "108%~", monthlyCnyt: 90,  period: "12 MONTHS", popular: true },
    { id: "premium",  name: "PREMIUM",  price: 1000, tier: "PRO LEVEL",   roi: "132%~", monthlyCnyt: 330, period: "12 MONTHS", popular: true },
    { id: "vip",      name: "VIP",      price: 5000, tier: "ELITE LEVEL", roi: "168%~", monthlyCnyt: 1800,period: "12 MONTHS", popular: false }
  ],

  // active investments / portfolio (CRYPTO-AI dashboard content, folded into HOME)
  activePackages: [
    { id: "ap1", name: "STANDARD", amount: 24000, dailyRoi: 0.65, start: "Mar 14, 2026", end: "Mar 14, 2027", progress: 0.51, earned: 1864.22, daysLeft: 274 }
  ],

  // REWARDS sub-tabs: HONOR / TEAM / TREE / RANKS
  honor: {
    status: "GOLD",
    title: "Imperial Vanguard",
    bodyValue: 182400,
    qualification: "Qualified",
    eliteBenefit: "Priority withdrawal · +5% commission"
  },
  team: {
    teamSales: 182400,
    target: 250000,
    directSubs: 5,
    activeAgents: 31,
    monthlyCommission: 1864.40
  },
  tree: {
    totalOrg: 48,
    maxDepth: 5,
    activeAgents: 31,
    directSubs: 5
  },
  directReferrals: [
    { name: "M. Tanaka",   pkg: "PREMIUM",  volume: 20000, date: "Jun 02" },
    { name: "S. Williams", pkg: "STANDARD", volume: 8000,  date: "May 27" },
    { name: "J. Kim",      pkg: "STANDARD", volume: 5000,  date: "May 19" },
    { name: "A. Novak",    pkg: "BASIC",    volume: 2400,  date: "May 11" },
    { name: "R. Garcia",   pkg: "FLEXIBLE", volume: 600,   date: "Apr 30" }
  ],
  ranks: [
    { name: "BRONZE",   refs: 0,   team: 200,     roi: "0.5–1.2%" },
    { name: "SILVER",   refs: 3,   team: 5000,    roi: "1.2–1.5%" },
    { name: "GOLD",     refs: 10,  team: 50000,   roi: "1.5–2.0%" },
    { name: "PLATINUM", refs: 25,  team: 250000,  roi: "2.0–2.5%" },
    { name: "DIAMOND",  refs: 50,  team: 1000000, roi: "2.5–3.0%" },
    { name: "CROWN",    refs: 100, team: 5000000, roi: "3.0%+" }
  ],
  commissions: { direct: 1240.00, matching: 486.30, pool: 138.10 },

  // wallet histories
  packageHistory: [
    { id: "ph1", name: "STANDARD", amount: 24000, date: "Mar 14, 2026", status: "ACTIVE" }
  ],
  recentActivity: [
    { id: "r1", type: "ROI",        label: "Daily dividend — STANDARD",     amount: 412.18,  date: "Jun 13, 00:00", dir: 1 },
    { id: "r2", type: "DEPOSIT",    label: "USDT deposit (TRC-20)",         amount: 5000.00, date: "Jun 10, 18:24", dir: 1 },
    { id: "r3", type: "COMMISSION", label: "Direct commission — M. Tanaka", amount: 140.00,  date: "Jun 08, 00:00", dir: 1 },
    { id: "r4", type: "WITHDRAW",   label: "USDT withdrawal (TRC-20)",      amount: 750.00,  date: "Jun 05, 01:12", dir: -1 },
    { id: "r5", type: "SWAP",       label: "Convert to CNYT",               amount: 320.00,  date: "Jun 01, 09:47", dir: -1 }
  ],
  transferHistory: [
    { id: "t1", to: "LR-77204", amount: 500.00, date: "Jun 09, 14:20" }
  ],

  // news / package updates
  news: [
    { title: "V6 engine throughput upgrade live", date: "Jun 11", tag: "ENGINE" },
    { title: "STANDARD package ROI adjusted to 108%~", date: "Jun 07", tag: "PACKAGE" },
    { title: "CNYT market maker program opens", date: "Jun 02", tag: "MARKET" }
  ],

  // market (future — preview)
  market: {
    cnytPrice: 0.1412,
    cnytChange: 2.14,
    usdtPremium: 1.012,
    orders: [
      { id: "o1", side: "BUY",  asset: "USDT", amount: 2500,  price: 1.012,  user: "drag***88", status: "OPEN" },
      { id: "o2", side: "SELL", asset: "USDT", amount: 1200,  price: 1.009,  user: "gold***41", status: "OPEN" },
      { id: "o3", side: "BUY",  asset: "CNYT", amount: 18000, price: 0.1408, user: "rise***07", status: "OPEN" }
    ]
  },

  depositAddress: "TQ5kX9vR2mLnW8eYcJ4aZbF7uHs3dGpE6N"
};

window.fmt = function (n, dec) {
  if (dec === undefined) dec = 2;
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
};
window.LR.todayRoi = 0.7;
window.LR.winRate = 92;
window.LR.cnytPrice = 0.1412;

window.LR.engines = [
  { id: "offline", name: "Offline Casino Auto-Bet", win: 92, meta: "12 tables · 3 venues", node: "Macau · Node JP_TYO_04", today: 184.20, kind: "casino" },
  { id: "online",  name: "Online Casino Auto-Bet",  win: 89, meta: "live rounds",          round: 48213,                today: 142.80, kind: "rounds" },
  { id: "futures", name: "Exchange Futures (AI)",    win: 87, meta: "BTC/USDT · signal stream", today: 85.18,            kind: "chart" }
];

window.LR._feedPool = [
  { e: "Offline Casino", t: "Table 04 · round won", c: "g" },
  { e: "DAILY_ROI", t: "+$0.55 credited", c: "g" },
  { e: "Futures BTC/USDT", t: "position synced", c: "a" },
  { e: "CNYT_AIRDROP", t: "+3.52 processed", c: "a" },
  { e: "Online Casino", t: "round #48213 settled", c: "g" },
  { e: "DAILY_ROI", t: "+$0.16 credited", c: "g" },
  { e: "Futures ETH/USDT", t: "signal executed", c: "a" },
  { e: "Offline Casino", t: "Macau · table synced", c: "g" }
];
window.LR.genEvent = function () {
  const p = window.LR._feedPool[Math.floor(Math.random() * window.LR._feedPool.length)];
  return { id: Date.now() + Math.random(), e: p.e, t: p.t, c: p.c };
};
window.LR.initialFeed = function () {
  return [0, 1, 2, 3, 4].map(function () { return window.LR.genEvent(); });
};
window.LR.initialSpark = function () {
  const out = [];
  for (var i = 0; i < 28; i++) out.push(40 + Math.sin(i / 3) * 16 + Math.random() * 12);
  return out;
};

window.LR_LOGO = "brand/icon-gold.png";
