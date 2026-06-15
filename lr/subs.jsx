/* LONGRISE — sub-screen overlays (deep-link targets) */
function SubHeader(p) {
  return (
    <div className="hdr">
      <button className="iconbtn" onClick={p.onClose} aria-label="Back"><Icon name="chevL" size={22} /></button>
      <span className="eyebrow" style={{ color: "var(--color-cream)" }}>{p.title}</span>
      <span style={{ width: 46 }}></span>
    </div>
  );
}

function SubScreen(p) {
  const ctx = React.useContext(Ctx);
  const D = window.LR, fmt = window.fmt;
  const name = p.name;
  const weekMax = Math.max.apply(null, D.weekEarnings);

  let body = null, title = "";

  if (name === "earnings") {
    title = "Daily Earnings";
    body = (
      <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="Daily Earnings">
        <Card hero className="full">
          <Eyebrow>Credited today</Eyebrow>
          <div className="asset-value gold num" style={{ fontSize: 38 }}>+${fmt(D.dailyEarning)}</div>
          <div className="muted" style={{ fontSize: 14 }}>USDT · 00:00 UTC dividend</div>
        </Card>
        <Card className="full">
          <SecHead title="Last 7 days" />
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "10px 0 14px" }}>
            <span className="gold num" style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800 }}>+${fmt(D.weekEarnings.reduce((a, c) => a + c, 0))}</span>
            <span className="muted" style={{ fontSize: 13 }}>total dividends</span>
          </div>
          <div className="weekbars">
            {D.weekEarnings.map((v, i) => (
              <div key={i} className={"col" + (i === 6 ? " on" : "")}><i style={{ height: Math.round((v / weekMax) * 62) + "px" }}></i><span>{["S", "M", "T", "W", "T", "F", "S"][i]}</span></div>
            ))}
          </div>
        </Card>
        <Card void className="full">
          <SecHead title="Breakdown" />
          <div className="rows" style={{ marginTop: 4 }}>
            <Row lead={<Disc color="var(--green-success)"><Icon name="earnings" size={18} /></Disc>} title="STANDARD package dividend" sub="Daily ROI 0.65%" trail={<span className="green num" style={{ fontSize: 15, fontWeight: 800 }}>+${fmt(D.dailyEarning - 28)}</span>} />
            <Row lead={<Disc color="var(--green-success)"><Icon name="referral" size={18} /></Disc>} title="Matching commission" sub="From team ROI" trail={<span className="green num" style={{ fontSize: 15, fontWeight: 800 }}>+$28.00</span>} />
          </div>
        </Card>
        <Btn block className="full" onClick={() => { ctx.openFlow("withdraw"); }}>Withdraw Earnings</Btn>
      </div>
    );
  } else if (name === "news") {
    title = "News & Updates";
    body = (
      <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="News">
        <Card void className="full">
          <div className="rows">
            {D.news.map((n, i) => (
              <Row key={i} lead={<Disc><Icon name="news" size={18} /></Disc>} title={n.title} sub={n.tag + " · " + n.date} chev onClick={() => ctx.notify("Article — preview only")} />
            ))}
          </div>
        </Card>
      </div>
    );
  } else if (name === "market") {
    title = "Market";
    body = (
      <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="Market">
        <Card hero className="full">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Eyebrow>CNYT / USDT</Eyebrow>
              <div className="asset-value gold num" style={{ fontSize: 32 }}>{fmt(D.market.cnytPrice, 4)}</div>
              <span className="green num" style={{ fontSize: 14, fontWeight: 700 }}>+{D.market.cnytChange}% · 24h</span>
            </div>
            <Pill>Preview</Pill>
          </div>
        </Card>
        <Card void className="full">
          <SecHead title="Live order stream" />
          <div className="rows" style={{ marginTop: 4 }}>
            {D.market.orders.map(o => {
              const buy = o.side === "BUY";
              return <Row key={o.id} lead={<Disc color={buy ? "var(--green-success)" : "var(--red-alert)"}><span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em" }}>{o.side}</span></Disc>}
                title={fmt(o.amount, 0) + " " + o.asset} sub={o.user + " · @ " + fmt(o.price, o.asset === "CNYT" ? 4 : 3)} trail={<Pill style={{ padding: "4px 10px" }}>{o.status}</Pill>} />;
            })}
          </div>
        </Card>
        <div className="muted full" style={{ fontSize: 13, textAlign: "center", padding: "4px 16px" }}>P2P trading launches in a future update. This is a preview.</div>
      </div>
    );
  } else if (name === "profile") {
    title = "My Profile";
    body = <ProfileBody />;
  } else if (name === "security") {
    title = "Security Center";
    body = <SecurityBody />;
  } else if (name === "docs") {
    title = "Documentation";
    body = (
      <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="Docs">
        <Card void className="full">
          <div className="rows">
            {["Getting Started", "User Guide", "Commission System", "Rank System", "Whitepaper V8.9", "Project Roadmap"].map(t => (
              <Row key={t} lead={<Disc><Icon name="doc" size={18} /></Disc>} title={t} chev onClick={() => ctx.notify(t + " — preview only")} />
            ))}
          </div>
        </Card>
      </div>
    );
  } else if (name === "support") {
    title = "Support";
    body = (
      <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="Support">
        <Card hero className="full" style={{ textAlign: "center" }}>
          <div className="success" style={{ padding: 0 }}><div className="orb"><Icon name="support" size={32} /></div><div className="t">Customer Support</div><div className="muted" style={{ fontSize: 15 }}>We're here 24/7. Average reply under 1 hour.</div></div>
          <Btn block style={{ marginTop: 18 }} onClick={() => ctx.notify("Opening chat — preview only")}>Start a Ticket</Btn>
        </Card>
        <Card void className="full">
          <div className="rows">
            <Row lead={<Disc><Icon name="support" size={18} /></Disc>} title="My Tickets" sub="Live operational queue" chev onClick={() => ctx.notify("Tickets — preview only")} />
            <Row lead={<Disc><Icon name="shield" size={18} /></Disc>} title="Report Fraud" sub="USDT deposit issues" chev onClick={() => ctx.notify("Report — preview only")} />
          </div>
        </Card>
      </div>
    );
  } else if (name === "settings") {
    title = "Settings";
    body = (
      <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="Settings">
        <Card void className="full">
          <div className="rows">
            <Row lead={<Disc><Icon name="gear" size={18} /></Disc>} title="Language" sub="English" chev onClick={() => ctx.notify("Language — preview only")} />
            <Row lead={<Disc><Icon name="wallet" size={18} /></Disc>} title="Currency display" sub="USD" chev onClick={() => ctx.notify("Currency — preview only")} />
            <Row lead={<Disc><Icon name="bell" size={18} /></Disc>} title="Notifications" sub="Enabled" chev onClick={() => ctx.notify("Notifications — preview only")} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="over">
      <SubHeader title={title} onClose={p.onClose} />
      {body}
    </div>
  );
}

function Toggle(p) {
  return (
    <button onClick={p.onChange} aria-label={p.label} style={{ appearance: "none", cursor: "pointer", border: "1px solid " + (p.on ? "var(--line-gold-mid)" : "var(--line-white-soft)"), background: p.on ? "linear-gradient(125deg, var(--gold-highlight), var(--gold-base))" : "var(--surface-void)", width: 52, height: 30, borderRadius: 999, position: "relative", flex: "none" }}>
      <span style={{ position: "absolute", top: 3, left: p.on ? 24 : 3, width: 22, height: 22, borderRadius: "50%", background: p.on ? "var(--color-ink)" : "var(--text-secondary)", transition: "left .18s ease" }}></span>
    </button>
  );
}

function ProfileBody() {
  const ctx = React.useContext(Ctx);
  const D = window.LR;
  return (
    <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="Profile">
      <Card hero className="full" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div className="avatar" style={{ width: 58, height: 58, fontSize: 20, cursor: "default" }}>{D.user.initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>{D.user.name}</div>
          <div className="muted num" style={{ fontFamily: "var(--font-mono)", fontSize: 12, marginTop: 2 }}>{D.user.id} · since {D.user.memberSince}</div>
        </div>
        <Pill><Icon name="crown" size={13} /> {D.user.rank}</Pill>
      </Card>
      <Card void className="full">
        <div className="rows">
          <Row lead={<Disc><Icon name="shield" size={18} /></Disc>} title="Security Center" sub="2FA · trading password" chev onClick={() => ctx.openSub("security")} />
          <Row lead={<Disc><Icon name="doc" size={18} /></Disc>} title="Documentation" chev onClick={() => ctx.openSub("docs")} />
          <Row lead={<Disc><Icon name="support" size={18} /></Disc>} title="Support" chev onClick={() => ctx.openSub("support")} />
          <Row lead={<Disc><Icon name="gear" size={18} /></Disc>} title="Settings" chev onClick={() => ctx.openSub("settings")} />
        </div>
      </Card>
      <Btn variant="ghost" block className="full" onClick={() => ctx.notify("Signed out — preview only")}>Sign Out</Btn>
    </div>
  );
}

function SecurityBody() {
  const ctx = React.useContext(Ctx);
  const [twoFa, setTwoFa] = React.useState(true);
  return (
    <div className="screen" style={{ paddingBottom: 40 }} data-screen-label="Security">
      <Card void className="full">
        <div className="rows">
          <Row lead={<Disc><Icon name="shield" size={18} /></Disc>} title="Google Authenticator" sub={twoFa ? "2FA enabled" : "2FA disabled"} trail={<Toggle on={twoFa} label="2FA" onChange={() => { setTwoFa(!twoFa); ctx.notify(twoFa ? "2FA disabled" : "2FA enabled"); }} />} />
          <Row lead={<Disc><Icon name="lock" size={18} /></Disc>} title="Trading Password" sub="Confirms withdrawals" chev onClick={() => ctx.notify("Password — preview only")} />
        </div>
      </Card>
    </div>
  );
}

window.SubScreen = SubScreen;
