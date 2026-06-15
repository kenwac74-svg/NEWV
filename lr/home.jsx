/* LONGRISE — HOME = live earning dashboard (first screen after login) */
function Sparkline(p) {
  const pts = p.points, w = 300, h = 30;
  const min = Math.min.apply(null, pts), max = Math.max.apply(null, pts), span = (max - min) || 1;
  const step = w / (pts.length - 1);
  const line = pts.map(function (v, i) { return (i * step).toFixed(1) + "," + (h - 3 - ((v - min) / span) * (h - 6)).toFixed(1); }).join(" ");
  return (
    <svg className="esprk" viewBox={"0 0 " + w + " " + h} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={line} fill="none" stroke="var(--gold-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></polyline>
    </svg>
  );
}

function Home() {
  const ctx = React.useContext(Ctx);
  const D = window.LR, fmt = window.fmt;
  const b = ctx.balance;
  const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [earn, setEarn] = React.useState(D.dailyEarning);
  const [feed, setFeed] = React.useState(function () { return D.initialFeed(); });
  const [round, setRound] = React.useState(D.engines[1].round);
  const [streak, setStreak] = React.useState(["w", "w", "l", "w", "w"]);
  const chartRef = React.useRef(null);
  const priceRef = React.useRef(null);
  const chgRef = React.useRef(null);
  const pairRef = React.useRef(null);
  const footRef = React.useRef(null);

  React.useEffect(function () {
    if (!chartRef.current || !window.LRChart) return;
    const SY = [
      { sym: "BTC/USDT", start: 68200, dec: 1 },
      { sym: "ETH/USDT", start: 3520, dec: 2 },
      { sym: "SOL/USDT", start: 166, dec: 2 }
    ];
    let ci = 0;
    const c = window.LRChart(chartRef.current, {
      compact: true, start: SY[0].start, decimals: SY[0].dec,
      onPrice: function (last, openRef) {
        const dec = SY[ci].dec;
        if (priceRef.current) priceRef.current.textContent = last.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (chgRef.current) {
          const chg = ((last - openRef) / openRef) * 100;
          chgRef.current.textContent = (chg >= 0 ? "+" : "") + chg.toFixed(2) + "%";
          chgRef.current.style.color = chg >= 0 ? "var(--green-success)" : "var(--red-alert)";
        }
      }
    });
    let rollT, footT;
    if (!reduce) {
      rollT = setInterval(function () {
        ci = (ci + 1) % SY.length; const s = SY[ci];
        if (pairRef.current) pairRef.current.textContent = s.sym;
        c.reseed(s.start, s.dec);
      }, 20000);
      const syms = ["BTC", "ETH", "SOL"], acts = ["position synced", "signal executed", "pattern matched", "entry confirmed"]; let fi = 0;
      footT = setInterval(function () {
        const sym = syms[fi % 3]; fi++;
        if (footRef.current) footRef.current.textContent = "AI · " + sym + "/USDT · " + acts[Math.floor(Math.random() * acts.length)] + " · conf " + (0.86 + Math.random() * 0.12).toFixed(2);
      }, 2800);
    }
    return function () { c.stop(); clearInterval(rollT); clearInterval(footT); };
  }, []);

  React.useEffect(function () {
    if (reduce) return;
    const t1 = setInterval(function () { setEarn(function (e) { return e + Math.random() * 0.7; }); setRound(function (r) { return r + Math.floor(Math.random() * 3) + 1; }); }, 2000);
    const t2 = setInterval(function () { setFeed(function (f) { return [D.genEvent()].concat(f).slice(0, 6); }); }, 2700);
    const t4 = setInterval(function () { setStreak(function () { const a = []; for (var i = 0; i < 5; i++) a.push(Math.random() > 0.12 ? "w" : "l"); return a; }); }, 3400);
    return function () { clearInterval(t1); clearInterval(t2); clearInterval(t4); };
  }, [reduce]);

  const cnytUsd = b.cnyt * D.cnytPrice;
  const grid = [
    { id: "earnings", icon: "earnings", label: "Daily Earnings", to: function () { ctx.openSub("earnings"); } },
    { id: "referral", icon: "referral", label: "Referral", to: function () { ctx.goTab("REWARDS", "TEAM"); } },
    { id: "news", icon: "news", label: "Package News", to: function () { ctx.openSub("news"); } },
    { id: "guide", icon: "bolt", label: "Start Here", to: function () { ctx.openSub("news"); } }
  ];

  return (
    <div className="screen" data-screen-label="Home">
      {/* greeting */}
      <div className="full" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <Eyebrow>Welcome back</Eyebrow>
          <div className="h-title" style={{ marginTop: 3, fontSize: 22, whiteSpace: "nowrap" }}>{D.user.name}</div>
        </div>
        <Pill dot><Icon name="crown" size={14} /> {D.user.rank}</Pill>
      </div>

      {/* TODAY'S EARNINGS hero — live count-up */}
      <Card hero className="earn-hero full">
        <div className="earn-label">
          <Eyebrow>Today's Earnings</Eyebrow>
          <span className="earn-now"><span className="live-dot"></span>earning now</span>
        </div>
        <div className="earn-big gold">+${fmt(earn)}</div>
        <div className="earn-row">
          <span className="roi-badge"><Icon name="arrowUp" size={14} weight={2.4} /> ROI {fmt(D.todayRoi, 1)}%</span>
          <span className="muted" style={{ fontSize: 13 }}>USDT · credited live</span>
        </div>
        <div className="balstrip">
          <div><div className="bk">Total</div><div className="bv">${fmt(b.total, 0)}</div></div>
          <div><div className="bk">Available</div><div className="bv">${fmt(b.available, 0)}</div></div>
          <div><div className="bk">CNYT</div><div className="bv">{fmt(b.cnyt, 0)}<small>≈ ${fmt(cnytUsd, 0)}</small></div></div>
        </div>
        <div className="act-row">
          <button className="act" onClick={function () { ctx.openFlow("deposit"); }}><span className="ic"><Icon name="deposit" size={20} /></span>Deposit</button>
          <button className="act" onClick={function () { ctx.openFlow("withdraw"); }}><span className="ic"><Icon name="withdraw" size={20} /></span>Withdraw</button>
          <button className="act" onClick={function () { ctx.openFlow("send"); }}><span className="ic"><Icon name="send" size={19} /></span>Send</button>
          <button className="act" onClick={function () { ctx.openFlow("swap"); }}><span className="ic"><Icon name="swap" size={20} /></span>Swap</button>
        </div>
      </Card>

      {/* stat tiles */}
      <div className="dash-stats full">
        <div className="dtile"><div className="dk">Profit</div><div className="dv green num">+${fmt(b.earned, 0)}</div></div>
        <div className="dtile"><div className="dk">CNYT</div><div className="dv gold num">{fmt(b.cnyt, 0)}</div></div>
        <div className="dtile"><div className="dk">ROI today</div><div className="dv num" style={{ color: "var(--color-cream)" }}>{fmt(D.todayRoi, 1)}%</div></div>
        <div className="dtile win"><div className="dk">Win rate</div><div className="dv gold num">{D.winRate}%</div></div>
      </div>

      {/* HOW LONGRISE EARNS — 3 engines (live activity) */}
      <Card className="full">
        <SecHead title="How LongRise Earns" />
        <div style={{ marginTop: 6 }}>
          {/* offline casino */}
          <div className="engine">
            <span className="e-ic"><Icon name="crown" size={22} /></span>
            <div className="e-body">
              <div className="e-name">{D.engines[0].name}</div>
              <div className="e-meta">{D.engines[0].win}% win · {D.engines[0].meta}</div>
              <div className="streak">{streak.map(function (s, i) { return <i key={i} className={s}></i>; })}</div>
            </div>
            <div className="e-right">
              <span className="e-status"><span className="heartbeat"></span>Active</span>
              <span className="e-today">+${fmt(D.engines[0].today)}</span>
            </div>
          </div>
          {/* online casino */}
          <div className="engine">
            <span className="e-ic"><Icon name="bolt" size={22} /></span>
            <div className="e-body">
              <div className="e-name">{D.engines[1].name}</div>
              <div className="e-meta num">round #{fmt(round, 0)} · {D.engines[1].win}% win</div>
            </div>
            <div className="e-right">
              <span className="e-status"><span className="heartbeat"></span>Active</span>
              <span className="e-today">+${fmt(D.engines[1].today)}</span>
            </div>
          </div>
          {/* futures */}
          <div className="engine">
            <span className="e-ic"><Icon name="market" size={22} /></span>
            <div className="e-body">
              <div className="e-name">{D.engines[2].name}</div>
              <div className="e-meta">BTC/USDT · live terminal below</div>
            </div>
            <div className="e-right">
              <span className="e-status"><span className="heartbeat"></span>Active</span>
              <span className="e-today">+${fmt(D.engines[2].today)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* live trading terminal (mobile) */}
      <Card className="full term-card">
        <div className="term-head">
          <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <span ref={pairRef} style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 800, letterSpacing: "0.03em", color: "var(--color-cream)" }}>BTC/USDT</span>
            <span className="term-perp">PERP</span>
            <span ref={priceRef} className="gold num" style={{ fontSize: 16, fontWeight: 800 }}>—</span>
            <span ref={chgRef} className="num" style={{ fontSize: 13, fontWeight: 800, color: "var(--green-success)" }}>+0.00%</span>
          </div>
          <span className="e-status"><span className="heartbeat"></span>AI</span>
        </div>
        <div className="term-wrap"><canvas ref={chartRef}></canvas></div>
        <div ref={footRef} className="muted" style={{ fontSize: 11, marginTop: 8, textAlign: "center" }}>AI · BTC/USDT · signal stream · EMA 9</div>
      </Card>

      {/* real-time pulse feed */}
      <Card void className="full" style={{ padding: 16 }}>
        <div className="feed" style={{ border: 0, padding: 0, background: "none" }}>
          <div className="feed-head"><span className="fl">Real-time Pulse Feed</span><span className="fn">NODE: JP_TYO_04</span></div>
          {feed.map(function (x) {
            return <div key={x.id} className={"feed-line " + x.c}><span>▸</span><b>{x.e}</b><span>{x.t}</span></div>;
          })}
        </div>
      </Card>

      {/* quick grid — deep-link shortcuts */}
      <Card void className="full">
        <div className="grid4">
          {grid.map(function (g) {
            return (
              <button key={g.id} className="qa" onClick={g.to}>
                <span className="orb"><Icon name={g.icon} size={28} /></span>
                <span className="lbl">{g.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* active package */}
      <Card className="span1">
        <SecHead title="My Package" action="View" onAction={function () { ctx.goTab("PACKAGES"); }} />
        {D.activePackages.map(function (ap) {
          return (
            <div key={ap.id} style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "0.06em" }}>{ap.name}</span>
                <span className="gold num" style={{ fontSize: 19, fontWeight: 800 }}>${fmt(ap.amount, 0)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "6px 0 10px" }}>
                <span className="muted" style={{ fontSize: 13 }}>{ap.daysLeft} days left</span>
                <span className="green num" style={{ fontSize: 13, fontWeight: 700 }}>+${fmt(ap.earned)} earned</span>
              </div>
              <Bar value={ap.progress} />
            </div>
          );
        })}
      </Card>
    </div>
  );
}
window.Home = Home;
