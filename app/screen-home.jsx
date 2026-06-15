/* LONGRISE Mobile — HOME screen */
function HomeScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [trades, setTrades] = React.useState(D.trades);

  React.useEffect(function () {
    if (!ctx.motionOn) return;
    const t = setInterval(function () {
      setTrades(function (prev) { return [D.genTrade()].concat(prev).slice(0, 6); });
    }, 3200);
    return function () { clearInterval(t); };
  }, [ctx.motionOn]);

  const total = ctx.bal.available + ctx.bal.earned + ctx.bal.invested;
  const weekMax = Math.max.apply(null, D.weekEarnings);
  const weekTotal = D.weekEarnings.reduce(function (a, b) { return a + b; }, 0);

  return (
    <div className="lr-screen" data-screen-label="Home">
      {/* START HERE top banner — homepage top-priority entry for new users */}
      <a className="sh-banner" href="START HERE.html">
        <span className="sh-ic"><Icon name="bolt" size={18} weight={2} /></span>
        <span className="sh-copy">
          <span className="sh-title">Start Here · New here?</span>
          <span className="sh-sub">Master LongRise in 3 minutes →</span>
        </span>
        <Icon name="chevR" size={16} style={{ color: "var(--gold-base)" }} />
      </a>

      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <Eyebrow>Welcome back</Eyebrow>
          <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
            {D.user.name}
          </div>
        </div>
        <Pill dot dotColor="var(--gold-glow)"><Icon name="crown" size={12} /> {D.user.rank}</Pill>
      </div>

      {/* Total assets hero */}
      <Card hero>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Eyebrow>Total assets</Eyebrow>
          <Pill live>Live</Pill>
        </div>
        <div className="display gold-text num" style={{ fontSize: 38, fontWeight: 800, letterSpacing: "0.01em", margin: "8px 0 2px" }}>
          ${fmt(total)}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
          <span className="green num" style={{ fontSize: 13, fontWeight: 700 }}>+${fmt(D.todayPnl)}</span>
          <span className="muted" style={{ fontSize: 11.5 }}>today · USDT</span>
        </div>
        <div style={{ margin: "12px -4px 4px" }}>
          <Sparkline points={D.spark} height={56} />
        </div>
        <button className="btn gold block" style={{ marginTop: 14 }} onClick={function () { ctx.goTab("PLANS"); }}>
          <Icon name="invest" size={16} weight={2} /> Get more Profit
        </button>
      </Card>

      {/* My packages — held positions with profit & rate (Wallet handles deposit/withdraw/send/swap) */}
      <Card>
        <SectionHead title="My packages" action="View plans" onAction={function () { ctx.goTab("PLANS"); }} />
        <div style={{ marginTop: 6 }}>
          {ctx.portfolio.map(function (p) {
            return (
              <div key={p.id} className="pkg-row">
                <div className="pkg-top">
                  <span className="pkg-name display">{p.pkg}</span>
                  <span className="num green" style={{ fontSize: 14, fontWeight: 700 }}>+${fmt(p.earned)}</span>
                </div>
                <div className="pkg-meta">
                  <span className="num">${fmt(p.amount, 0)} principal</span>
                  <span className="num gold-text" style={{ fontWeight: 700 }}>{p.dailyRoi}%/day</span>
                </div>
                <Bar value={p.progress} />
                <div className="pkg-foot muted">
                  <span>{p.start}</span><span>{Math.round(p.progress * 100)}% · ends {p.end}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI engine */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <img src={window.LR_IMG("iconGold")} alt="" style={{ width: 26, height: "auto" }} />
            <div>
              <div className="display" style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.1em" }}>{D.engine.name}</div>
              <div className="muted" style={{ fontSize: 10.5 }}>AI execution engine</div>
            </div>
          </div>
          <Pill live>Active</Pill>
        </div>
        <div className="stat-grid">
          <StatTile value={D.engine.winRate} unit="%" label="Win rate" />
          <StatTile value={D.engine.dailyRoi} unit="%" label="Daily ROI" />
          <StatTile value={fmt(D.engine.signals, 0)} unit="/s" label="Signals" />
          <StatTile value={D.engine.latency} unit="ms" label="Latency" />
        </div>
        <div className="terminal" style={{ marginTop: 12 }}>
          <div><span className="g">▸</span> neural.core.v6 — session synced · 3 exchanges</div>
          <div><span className="a">▸</span> pattern.match BTC/USDT conf 0.94 → <span className="g">executed</span></div>
          <div><span className="g">▸</span> pnl.stream +{fmt(D.todayPnl)} USDT realized today</div>
        </div>
      </Card>

      {/* Live trades */}
      <Card void>
        <SectionHead title="Live trades" />
        <div className="rowlist" style={{ marginTop: 4 }}>
          {trades.map(function (t, i) {
            const win = t.pnl >= 0;
            return (
              <RowItem key={t.time + t.pair + i}
                lead={
                  <LeadDisc color={win ? "var(--green-success)" : "var(--red-alert)"}>
                    <Icon name={win ? "arrowUp" : "arrowDown"} size={16} />
                  </LeadDisc>
                }
                title={t.pair}
                sub={t.side + " · " + t.time}
                trail={
                  <span className={"num " + (win ? "green" : "red")} style={{ fontSize: 13.5, fontWeight: 700 }}>
                    {win ? "+" : "−"}${fmt(Math.abs(t.pnl))}
                  </span>
                } />
            );
          })}
        </div>
      </Card>

      {/* 7-day earnings */}
      <Card>
        <SectionHead title="Last 7 days" />
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 12px" }}>
          <span className="display gold-text num" style={{ fontSize: 24, fontWeight: 800 }}>+${fmt(weekTotal)}</span>
          <span className="muted" style={{ fontSize: 11.5 }}>dividends credited</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 7, alignItems: "end", height: 64 }}>
          {D.weekEarnings.map(function (v, i) {
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, height: "100%", justifyContent: "flex-end" }}>
                <div style={{
                  width: "100%", borderRadius: 4,
                  height: Math.round((v / weekMax) * 48) + "px",
                  background: i === 6
                    ? "linear-gradient(180deg, var(--gold-glow), var(--gold-base))"
                    : "rgba(185,154,107,0.28)"
                }}></div>
                <span className="muted" style={{ fontSize: 8.5, letterSpacing: "0.1em" }}>{["S", "M", "T", "W", "T", "F", "S"][i]}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* News */}
      <Card void>
        <SectionHead title="News & updates" />
        <div className="rowlist" style={{ marginTop: 4 }}>
          {D.news.map(function (n, i) {
            return (
              <RowItem key={i}
                lead={<LeadDisc><Icon name="news" size={16} /></LeadDisc>}
                title={n.title} sub={n.tag + " · " + n.date} chev
                onClick={function () { ctx.notify("Opening announcement — preview only"); }} />
            );
          })}
        </div>
      </Card>
    </div>
  );
}

window.HomeScreen = HomeScreen;
