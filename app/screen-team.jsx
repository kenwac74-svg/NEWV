/* LONGRISE Mobile — TEAM screen (rank, network, ranks ladder) */
function TeamScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [tab, setTab] = React.useState("OVERVIEW");

  const rankIdx = D.ranks.findIndex(function (r) { return r.name === D.user.rank; });
  const next = D.ranks[rankIdx + 1];
  const teamProgress = D.orgStats.teamVolume / next.team;
  const totalComm = D.commissions.direct + D.commissions.matching + D.commissions.pool;

  function copyRef() {
    if (navigator.clipboard) navigator.clipboard.writeText(D.user.refLink).catch(function () {});
    ctx.notify("Referral link copied");
  }

  return (
    <div className="lr-screen" data-screen-label="Team">
      <div>
        <Eyebrow>Referral network</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Build your organization
        </div>
      </div>

      <SegTabs options={["OVERVIEW", "NETWORK", "RANKS"]} value={tab} onChange={setTab} />

      {tab === "OVERVIEW" && (
        <React.Fragment>
          {/* Rank progress */}
          <Card hero>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <LeadDisc><Icon name="crown" size={18} /></LeadDisc>
                <div>
                  <div className="display gold-text" style={{ fontSize: 19, fontWeight: 800, letterSpacing: "0.1em" }}>{D.user.rank}</div>
                  <div className="muted" style={{ fontSize: 10.5 }}>Current identity status</div>
                </div>
              </div>
              <Pill>Rank {rankIdx + 1} / 6</Pill>
            </div>
            <div style={{ margin: "16px 0 6px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="muted" style={{ fontSize: 11.5 }}>Progress to {next.name}</span>
              <span className="num" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--gold-highlight)" }}>
                ${fmt(D.orgStats.teamVolume, 0)} / ${fmt(next.team, 0)}
              </span>
            </div>
            <Bar value={teamProgress} />
            <div className="muted" style={{ fontSize: 11, marginTop: 8 }}>
              Requires {next.refs} direct referrals · you have {D.orgStats.directSubs}
            </div>
          </Card>

          {/* Commissions */}
          <Card>
            <SectionHead title="Commissions — this month" />
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 12px" }}>
              <span className="display gold-text num" style={{ fontSize: 26, fontWeight: 800 }}>${fmt(totalComm)}</span>
              <span className="muted" style={{ fontSize: 11.5 }}>USDT credited</span>
            </div>
            <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <StatTile value={"$" + fmt(D.commissions.direct, 0)} label="Direct" />
              <StatTile value={"$" + fmt(D.commissions.matching, 0)} label="Matching" />
              <StatTile value={"$" + fmt(D.commissions.pool, 0)} label="Pool" />
            </div>
          </Card>

          {/* Referral code */}
          <Card void>
            <SectionHead title="My referral code" />
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
              border: "1px dashed var(--line-gold-mid)", borderRadius: "var(--radius-md)",
              padding: "12px 14px", margin: "10px 0 12px"
            }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--gold-highlight)", letterSpacing: "0.08em" }}>
                {D.user.refCode}
              </span>
              <button className="iconbtn" style={{ width: 36, height: 36 }} onClick={copyRef} aria-label="Copy referral code">
                <Icon name="copy" size={17} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Btn variant="ghost" sm onClick={copyRef}><Icon name="copy" size={14} /> Copy link</Btn>
              <Btn sm onClick={function () { ctx.notify("QR code — preview only"); }}><Icon name="qr" size={14} /> Show QR</Btn>
            </div>
          </Card>
        </React.Fragment>
      )}

      {tab === "NETWORK" && (
        <React.Fragment>
          <Card>
            <SectionHead title="Organization structure" />
            <div className="stat-grid" style={{ marginTop: 10 }}>
              <StatTile value={D.orgStats.totalOrg} label="Total org" />
              <StatTile value={D.orgStats.active} label="Active agents" />
              <StatTile value={D.orgStats.directSubs} label="Direct subs" />
              <StatTile value={D.orgStats.maxDepth} label="Max depth" />
            </div>
          </Card>
          <Card void>
            <SectionHead title="Direct referrals" />
            <div className="rowlist" style={{ marginTop: 4 }}>
              {D.referrals.map(function (r, i) {
                return (
                  <RowItem key={i}
                    lead={<LeadDisc><span className="display" style={{ fontSize: 12, fontWeight: 700 }}>{r.name.charAt(0)}</span></LeadDisc>}
                    title={r.name}
                    sub={r.pkg + " · joined " + r.date}
                    trail={<span className="num gold-text" style={{ fontSize: 13.5, fontWeight: 800 }}>${fmt(r.volume, 0)}</span>} />
                );
              })}
            </div>
          </Card>
        </React.Fragment>
      )}

      {tab === "RANKS" && (
        <Card void>
          <SectionHead title="Rank ladder" />
          <div className="rowlist" style={{ marginTop: 4 }}>
            {D.ranks.map(function (r, i) {
              const current = r.name === D.user.rank;
              const reached = i <= rankIdx;
              return (
                <div key={r.name} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "13px 0",
                  borderBottom: i < D.ranks.length - 1 ? "1px solid var(--line-white-soft)" : "none",
                  opacity: reached || current ? 1 : 0.55
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%", flex: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid " + (current ? "var(--gold-glow)" : reached ? "var(--line-gold-mid)" : "var(--line-white-soft)"),
                    background: current ? "rgba(251,191,36,0.12)" : "var(--surface-void)",
                    color: reached ? "var(--gold-highlight)" : "var(--color-muted)"
                  }}>
                    {reached ? <Icon name={current ? "crown" : "check"} size={15} /> : <span className="num" style={{ fontSize: 12, fontWeight: 700 }}>{i + 1}</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span className="display" style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.1em", color: current ? "var(--gold-highlight)" : "var(--color-cream)" }}>{r.name}</span>
                      {current && <Pill style={{ padding: "2px 8px", fontSize: 8.5 }}>Current</Pill>}
                    </div>
                    <div className="muted num" style={{ fontSize: 11, marginTop: 2 }}>
                      {r.refs} refs · ${fmt(r.team, 0)} team volume
                    </div>
                  </div>
                  <span className="num" style={{ fontSize: 12, fontWeight: 700, color: "var(--gold-base)" }}>{r.roi}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

window.TeamScreen = TeamScreen;
