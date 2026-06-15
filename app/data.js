/* LONGRISE Mobile — demo data (static preview values, no backend) */
window.LR_DATA = {
  user: {
    name: "Daniel Park",
    initials: "DP",
    id: "LR-88412",
    rank: "GOLD",
    nextRank: "PLATINUM",
    memberSince: "Feb 2026",
    refCode: "LR88412GOLD",
    refLink: "longrise.ai/r/LR88412GOLD"
  },

  balances: {
    available: 12480.50,
    earned: 1864.22,
    cnyt: 5320.00,
    invested: 24000.00
  },

  todayPnl: 412.18,

  engine: {
    name: "NEURAL CORE V6",
    winRate: 87.4,
    dailyRoi: 1.42,
    signals: 1284,
    latency: 14
  },

  spark: [21, 24, 22, 27, 25, 30, 28, 34, 31, 38, 36, 41, 39, 45, 43, 48],
  weekEarnings: [212, 248, 196, 284, 262, 318, 344],

  packages: [
    { id: "flexible", name: "FLEXIBLE", roi: "0.5–0.8%", mid: 0.65, min: 200,   term: "No lock",  note: "Withdraw anytime" },
    { id: "basic",    name: "BASIC",    roi: "0.8–1.0%", mid: 0.9,  min: 1000,  term: "90 days",  note: "Entry compounding" },
    { id: "standard", name: "STANDARD", roi: "1.0–1.4%", mid: 1.2,  min: 5000,  term: "180 days", note: "Most popular" },
    { id: "premium",  name: "PREMIUM",  roi: "1.4–1.8%", mid: 1.6,  min: 20000, term: "270 days", note: "Priority execution" },
    { id: "vip",      name: "VIP",      roi: "1.8–2.4%", mid: 2.1,  min: 50000, term: "365 days", note: "Private desk access", featured: true }
  ],

  dragons: [
    { id: "blue",   name: "BLUE DRAGON",   icon: "iconBlue",   min: 10000,  roi: "1.2% daily",  term: "180 days", color: "#3b82f6" },
    { id: "purple", name: "PURPLE DRAGON", icon: "iconPurple", min: 50000,  roi: "1.6% daily",  term: "270 days", color: "#a78bfa" },
    { id: "red",    name: "RED DRAGON",    icon: "iconRed",    min: 150000, roi: "2.0% daily",  term: "365 days", color: "#ef4444" },
    { id: "black",  name: "BLACK DRAGON",  icon: "iconBlack",  min: 500000, roi: "2.6% daily",  term: "365 days", color: "#e5c398", featured: true }
  ],

  portfolio: [
    { id: "p1", pkg: "STANDARD", amount: 24000, dailyRoi: 1.2, start: "Mar 14, 2026", end: "Sep 10, 2026", progress: 0.51, earned: 1864.22 },
    { id: "p2", pkg: "PREMIUM",  amount: 20000, dailyRoi: 1.6, start: "Apr 02, 2026", end: "Dec 28, 2026", progress: 0.28, earned: 1792.40 },
    { id: "p3", pkg: "FLEXIBLE", amount: 4200,  dailyRoi: 0.65, start: "May 20, 2026", end: "No lock",       progress: 0.12, earned: 168.90 }
  ],

  pairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT", "AVAX/USDT", "DOGE/USDT"],

  trades: [
    { pair: "BTC/USDT", side: "LONG",  pnl: 184.20,  time: "14:32:08" },
    { pair: "ETH/USDT", side: "SHORT", pnl: 96.75,   time: "14:31:42" },
    { pair: "SOL/USDT", side: "LONG",  pnl: -22.40,  time: "14:30:51" },
    { pair: "BNB/USDT", side: "LONG",  pnl: 61.10,   time: "14:29:33" },
    { pair: "XRP/USDT", side: "SHORT", pnl: 38.92,   time: "14:28:17" }
  ],

  referrals: [
    { name: "M. Tanaka",  pkg: "PREMIUM",  volume: 20000, date: "Jun 02" },
    { name: "S. Williams", pkg: "STANDARD", volume: 8000,  date: "May 27" },
    { name: "J. Kim",     pkg: "STANDARD", volume: 5000,  date: "May 19" },
    { name: "A. Novak",   pkg: "BASIC",    volume: 2400,  date: "May 11" },
    { name: "R. Garcia",  pkg: "FLEXIBLE", volume: 600,   date: "Apr 30" }
  ],

  orgStats: { totalOrg: 48, maxDepth: 5, active: 31, directSubs: 5, teamVolume: 182400 },

  commissions: { direct: 1240.00, matching: 486.30, pool: 138.10 },

  ranks: [
    { name: "BRONZE",   refs: 0,   team: 200,      roi: "0.5–1.2%" },
    { name: "SILVER",   refs: 3,   team: 5000,     roi: "1.2–1.5%" },
    { name: "GOLD",     refs: 10,  team: 50000,    roi: "1.5–2.0%" },
    { name: "PLATINUM", refs: 25,  team: 250000,   roi: "2.0–2.5%" },
    { name: "DIAMOND",  refs: 50,  team: 1000000,  roi: "2.5–3.0%" },
    { name: "CROWN",    refs: 100, team: 5000000,  roi: "3.0%+" }
  ],

  market: {
    cnytPrice: 0.1412,
    cnytChange: 2.14,
    usdtPremium: 1.012,
    orders: [
      { id: "o1", side: "BUY",  asset: "USDT", amount: 2500,  price: 1.012, user: "drag***88",  status: "OPEN" },
      { id: "o2", side: "SELL", asset: "USDT", amount: 1200,  price: 1.009, user: "gold***41",  status: "OPEN" },
      { id: "o3", side: "BUY",  asset: "CNYT", amount: 18000, price: 0.1408, user: "rise***07", status: "OPEN" },
      { id: "o4", side: "SELL", asset: "USDT", amount: 800,   price: 1.011, user: "neo***23",   status: "COMPLETE" },
      { id: "o5", side: "BUY",  asset: "CNYT", amount: 6400,  price: 0.1415, user: "axis***90", status: "OPEN" },
      { id: "o6", side: "SELL", asset: "CNYT", amount: 31000, price: 0.1402, user: "luna***55", status: "COMPLETE" }
    ]
  },

  history: [
    { id: "h1", type: "ROI",      label: "Daily dividend — STANDARD", amount: 288.00,  date: "Jun 13, 00:00", dir: 1 },
    { id: "h2", type: "DEPOSIT",  label: "USDT deposit (TRC-20)",     amount: 5000.00, date: "Jun 10, 18:24", dir: 1 },
    { id: "h3", type: "COMMISSION", label: "Direct commission — M. Tanaka", amount: 140.00, date: "Jun 08, 00:00", dir: 1 },
    { id: "h4", type: "WITHDRAW", label: "USDT withdrawal (TRC-20)",  amount: 750.00,  date: "Jun 05, 01:12", dir: -1 },
    { id: "h5", type: "SWAP",     label: "Rewards → CNYT swap",       amount: 320.00,  date: "Jun 01, 09:47", dir: -1 }
  ],

  news: [
    { title: "V6 Neural Engine throughput upgrade", date: "Jun 11", tag: "ENGINE" },
    { title: "CNYT market maker program opens", date: "Jun 07", tag: "MARKET" },
    { title: "Q3 roadmap: advanced integrations", date: "Jun 02", tag: "ROADMAP" }
  ],

  depositAddress: "TQ5kX9vR2mLnW8eYcJ4aZbF7uHs3dGpE6N",

  /* Login-time legal consent — shown every login, consent required each time.
     Plain text, intentionally long so the boxes scroll. No scroll-to-bottom gate. */
  riskNotice: "RISK DISCLOSURE STATEMENT\n\nLONGRISE provides access to algorithmic digital-asset strategies. Digital assets are highly volatile and trading involves substantial risk of loss. You may lose some or all of your deposited capital.\n\n1. No returns are guaranteed. Past performance, projected daily ROI, win rates and any historical figures shown in the application are illustrative and do not guarantee future results.\n\n2. Principal is at risk. Funds allocated to any package, plan or strategy are exposed to market, liquidity, counterparty and operational risk. Lock-up periods may prevent withdrawal before maturity.\n\n3. Liquidity and settlement. Withdrawals are processed in batches and may be delayed by network congestion, compliance review, or settlement windows. On-chain transactions are irreversible.\n\n4. Regulatory status. Digital-asset services may be restricted or prohibited in your jurisdiction. You are solely responsible for determining whether your participation is lawful where you reside.\n\n5. Tax. You are responsible for reporting and paying any taxes arising from your activity.\n\n6. Security. You are responsible for safeguarding your credentials, 2FA device and withdrawal PIN. LONGRISE will never ask for your password.\n\nBy continuing you confirm that you understand these risks and that you are participating using funds you can afford to lose.",

  terms: "TERMS OF SERVICE & USER AGREEMENT\n\nThese Terms govern your access to and use of the LONGRISE platform. By continuing you agree to be bound by them.\n\n1. Eligibility. You must be at least 18 years old and legally permitted to use digital-asset services in your jurisdiction. You represent that the information you provide is accurate.\n\n2. Accounts. You are responsible for all activity under your account. Keep your authentication factors confidential. Notify support immediately of any unauthorized access.\n\n3. Deposits & withdrawals. You are responsible for sending funds to the correct address on a supported network. Transactions sent to incorrect addresses or unsupported networks cannot be recovered.\n\n4. Packages & rewards. Package terms, ROI ranges, lock-up periods and referral commissions are described in the application and may be revised. Referral and team rewards require ongoing compliance with program rules; abusive or fraudulent activity may result in forfeiture.\n\n5. Prohibited use. You may not use the platform for money laundering, fraud, market manipulation, or any unlawful purpose, or attempt to interfere with platform security or operation.\n\n6. Suspension. We may suspend or restrict accounts to comply with law, investigate suspected misuse, or protect the platform and its users.\n\n7. No advice. Nothing in the platform constitutes financial, legal or tax advice. Decisions are made at your own discretion and risk.\n\n8. Limitation of liability. To the maximum extent permitted by law, LONGRISE is not liable for indirect, incidental or consequential damages, or for losses arising from market movements, network failures or events beyond our control.\n\n9. Changes. We may update these Terms; continued use after changes constitutes acceptance.\n\nThis is a static design preview. No live funds, accounts or trading are involved.",

  /* Important announcement shown as a SECOND popup after consent — only when set.
     Set to null to skip the second popup. */
  importantNotice: {
    tag: "SCHEDULED MAINTENANCE",
    title: "Withdrawal settlement window changes Jun 20",
    body: "Starting June 20, 00:00 UTC, the daily withdrawal batch moves to 02:00\u201304:00 UTC for an infrastructure upgrade. Deposits and trading are unaffected. Please plan large withdrawals accordingly."
  },

  faqs: [
    { q: "When is daily ROI credited?", a: "Daily dividends are credited at 00:00 UTC to your earned balance." },
    { q: "What is the minimum withdrawal?", a: "$50 USDT, processed in a daily batch between 00:00–02:00 UTC." },
    { q: "Which networks are supported?", a: "USDT on TRC-20 and ERC-20. Always verify the address before sending." }
  ]
};

/* Rotating trade generator for the live feed */
window.LR_DATA.genTrade = function () {
  const d = window.LR_DATA;
  const pair = d.pairs[Math.floor(Math.random() * d.pairs.length)];
  const side = Math.random() > 0.45 ? "LONG" : "SHORT";
  const win = Math.random() > 0.16;
  const pnl = (win ? 1 : -1) * (8 + Math.random() * 220);
  const t = new Date();
  const pad = function (n) { return String(n).padStart(2, "0"); };
  return {
    pair: pair,
    side: side,
    pnl: Math.round(pnl * 100) / 100,
    time: pad(t.getHours()) + ":" + pad(t.getMinutes()) + ":" + pad(t.getSeconds())
  };
};

/* Brand image resolver — uses bundled blob URLs (window.__resources) when present
   (offline standalone export), otherwise falls back to the project-relative path. */
window.LR_IMG_FALLBACK = {
  iconGold: "brand/icon-gold.png",
  iconBlue: "brand/icon-blue.png",
  iconPurple: "brand/icon-purple.png",
  iconRed: "brand/icon-red.png",
  iconBlack: "brand/icon-black.png"
};
window.LR_IMG = function (key) {
  if (window.__resources && window.__resources[key]) return window.__resources[key];
  return window.LR_IMG_FALLBACK[key] || key;
};

window.LR_FMT = function (n, dec) {
  if (dec === undefined) dec = 2;
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
};
