/* LONGRISE — REWARDS (HONOR / TEAM / TREE / RANKS) */
function Rewards() {
  const ctx = React.useContext(Ctx);
  const D = window.LR, fmt = window.fmt;
  const [tab, setTab] = React.useState(ctx.rewardsTab || "HONOR");
  React.useEffect(() => { if (ctx.rewardsTab) setTab(ctx.rewardsTab); }, [ctx.rewardsTab, ctx.rewardsNonce]);

  function copyRef() { if (navigator.clipboard) navigator.clipboard.writeText(D.user.refLink).catch(() => {}); ctx.notify("Referral link copied"); }
  const teamProgress = D.team.teamSales / D.team.target;
  const totalComm = D.commissions.direct + D.commissions.matching + D.commissions.pool;

  return (
    <div className="screen" data-screen-label="Rewards">
      <div className="full">
        <Eyebrow>Your network</Eyebrow>
        <div className="h-title" style={{ marginTop: 3 }}>Rewards</div>
      </div>
      <div className="full"><Seg options={["HONOR", "TEAM", "TREE", "RANKS"]} value={tab} onChange={setTab} /></div>

      {tab === "HONOR" && (
        <React.Fragment>
          <Card hero className="full">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Disc style={{ width: 56, height: 56 }}><Icon name="crown" size={26} /></Disc>
              <div style={{ flex: 1 }}>
                <div className="gold" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, letterSpacing: "0.08em" }}>{D.honor.status}</div>
                <div className="muted" style={{ fontSize: 14 }}>{D.honor.title}</div>
              </div>
              <Pill>{D.honor.qualification}</Pill>
            </div>
          </Card>
          <Card className="full">
            <SecHead title="Standing" />
            <div className="stats" style={{ marginTop: 12 }}>
              <Stat value={"$" + fmt(D.honor.bodyValue, 0)} label="Body Value" />
              <Stat value={D.user.rank} label="Current Rank" />
            </div>
            <div style={{ marginTop: 14, padding: 14, border: "1px solid var(--line-gold-soft)", borderRadius: 13, background: "var(--surface-void)" }}>
              <div className="eyebrow">Elite Benefit</div>
              <div style={{ fontSize: 15, marginTop: 6 }}>{D.honor.eliteBenefit}</div>
            </div>
          </Card>
        </React.Fragment>
      )}

      {tab === "TEAM" && (
        <React.Fragment>
          <Card hero className="full">
            <SecHead title="Team Sales" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "10px 0 6px" }}>
              <span className="gold num" style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>${fmt(D.team.teamSales, 0)}</span>
              <span className="muted" style={{ fontSize: 13 }}>/ ${fmt(D.team.target, 0)} target</span>
            </div>
            <Bar value={teamProgress} />
            <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>Target Achievement {Math.round(teamProgress * 100)}%</div>
          </Card>
          <Card className="full">
            <SecHead title="Commissions — this month" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 12px" }}>
              <span className="gold num" style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>${fmt(totalComm)}</span>
            </div>
            <div className="stats" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <Stat value={"$" + fmt(D.commissions.direct, 0)} label="Direct" />
              <Stat value={"$" + fmt(D.commissions.matching, 0)} label="Matching" />
              <Stat value={"$" + fmt(D.commissions.pool, 0)} label="Pool" />
            </div>
          </Card>
          <Card void className="full">
            <SecHead title="My referral code" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, border: "1px dashed var(--line-gold-mid)", borderRadius: 13, padding: "14px 16px", margin: "10px 0 12px" }}>
              <span className="num" style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--gold-highlight)", letterSpacing: "0.06em" }}>{D.user.refCode}</span>
              <button className="iconbtn" style={{ width: 40, height: 40 }} onClick={copyRef} aria-label="Copy"><Icon name="copy" size={18} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Btn variant="ghost" sm onClick={copyRef}><Icon name="copy" size={15} /> Copy link</Btn>
              <Btn sm onClick={() => ctx.notify("QR — preview only")}><Icon name="qr" size={15} /> Show QR</Btn>
            </div>
          </Card>
        </React.Fragment>
      )}

      {tab === "TREE" && (
        <React.Fragment>
          <Card className="full">
            <SecHead title="Organization Structure" />
            <div className="stats" style={{ marginTop: 12 }}>
              <Stat value={D.tree.totalOrg} label="Total Org" />
              <Stat value={D.tree.activeAgents} label="Active Agents" />
              <Stat value={D.tree.directSubs} label="Direct Subs" />
              <Stat value={D.tree.maxDepth} label="Max Depth" />
            </div>
          </Card>
          <Card void className="full">
            <SecHead title="Direct Referrals" />
            <div className="rows" style={{ marginTop: 4 }}>
              {D.directReferrals.map((r, i) => (
                <Row key={i} lead={<Disc><span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700 }}>{r.name.charAt(0)}</span></Disc>}
                  title={r.name} sub={r.pkg + " · joined " + r.date}
                  trail={<span className="gold num" style={{ fontSize: 15, fontWeight: 800 }}>${fmt(r.volume, 0)}</span>} />
              ))}
            </div>
          </Card>
        </React.Fragment>
      )}

      {tab === "RANKS" && (
        <Card void className="full">
          <SecHead title="Rank Ladder" />
          <div className="rows" style={{ marginTop: 4 }}>
            {D.ranks.map((r, i) => {
              const current = r.name === D.user.rank;
              const reached = i <= D.user.rankIndex;
              return (
                <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 0", borderBottom: i < D.ranks.length - 1 ? "1px solid var(--line-white-soft)" : "none", opacity: reached || current ? 1 : 0.55 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid " + (current ? "var(--gold-glow)" : reached ? "var(--line-gold-mid)" : "var(--line-white-soft)"), background: current ? "rgba(251,191,36,0.12)" : "var(--surface-void)", color: reached ? "var(--gold-highlight)" : "var(--text-secondary)" }}>
                    {reached ? <Icon name={current ? "crown" : "check"} size={17} /> : <span className="num" style={{ fontSize: 14, fontWeight: 700 }}>{i + 1}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, letterSpacing: "0.08em", color: current ? "var(--gold-highlight)" : "var(--color-cream)" }}>{r.name}</span>
                      {current && <Pill style={{ padding: "3px 9px", fontSize: 10 }}>Current</Pill>}
                    </div>
                    <div className="muted num" style={{ fontSize: 13, marginTop: 2 }}>{r.refs} refs · ${fmt(r.team, 0)} team</div>
                  </div>
                  <span className="num" style={{ fontSize: 14, fontWeight: 700, color: "var(--gold-base)" }}>{r.roi}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
window.Rewards = Rewards;
