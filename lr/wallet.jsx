/* LONGRISE — WALLET (My Wealth + histories) */
function Wallet() {
  const ctx = React.useContext(Ctx);
  const D = window.LR, fmt = window.fmt;
  const b = ctx.balance;
  const [tab, setTab] = React.useState("RECENT");

  return (
    <div className="screen" data-screen-label="Wallet">
      <div className="full">
        <Eyebrow>My Wealth</Eyebrow>
        <div className="h-title" style={{ marginTop: 3 }}>Wallet</div>
      </div>

      {/* balance hero */}
      <Card hero className="asset-card full">
        <Eyebrow>Total Assets</Eyebrow>
        <div className="asset-value gold num">${fmt(b.total)}</div>
        <div style={{ borderTop: "1px solid var(--line-white-soft)", marginTop: 12 }}>
          <KV k="Available balance" v={"$" + fmt(b.available) + " USDT"} />
          <KV k="Earned dividends" v={"$" + fmt(b.earned) + " USDT"} cls="green" />
          <KV k="Invested capital" v={"$" + fmt(b.invested) + " USDT"} />
          <KV k="CNYT rewards" v={fmt(b.cnyt) + " CNYT"} />
        </div>
        <div className="act-row">
          <button className="act" onClick={() => ctx.openFlow("deposit")}><span className="ic"><Icon name="deposit" size={20} /></span>Deposit</button>
          <button className="act" onClick={() => ctx.openFlow("withdraw")}><span className="ic"><Icon name="withdraw" size={20} /></span>Withdraw</button>
          <button className="act" onClick={() => ctx.openFlow("send")}><span className="ic"><Icon name="send" size={19} /></span>Send</button>
          <button className="act" onClick={() => ctx.openFlow("swap")}><span className="ic"><Icon name="swap" size={20} /></span>Swap</button>
        </div>
      </Card>

      <div className="full"><Seg options={["RECENT", "PACKAGE", "TRANSFER"]} value={tab} onChange={setTab} /></div>

      {tab === "RECENT" && (
        <Card void className="full">
          <SecHead title="Recent Activity" />
          <div className="rows" style={{ marginTop: 4 }}>
            {ctx.activity.map(h => {
              const inFlow = h.dir > 0;
              const ic = { DEPOSIT: "deposit", WITHDRAW: "withdraw", SWAP: "swap", SEND: "send", INVEST: "package", ROI: "earnings", COMMISSION: "referral" }[h.type] || "bolt";
              return <Row key={h.id} lead={<Disc color={inFlow ? "var(--green-success)" : "var(--color-cream)"}><Icon name={ic} size={18} /></Disc>} title={h.label} sub={h.date}
                trail={<span className={"num " + (inFlow ? "green" : "")} style={{ fontSize: 15, fontWeight: 800 }}>{inFlow ? "+" : "−"}${fmt(h.amount)}</span>} />;
            })}
          </div>
        </Card>
      )}
      {tab === "PACKAGE" && (
        <Card void className="full">
          <SecHead title="Package History" />
          {D.packageHistory.length === 0 ? <div className="muted" style={{ fontSize: 15, padding: "16px 0" }}>No package history yet.</div> : (
            <div className="rows" style={{ marginTop: 4 }}>
              {D.packageHistory.map(p => (
                <Row key={p.id} lead={<Disc><Icon name="package" size={18} /></Disc>} title={p.name} sub={"Activated " + p.date}
                  trail={<div style={{ textAlign: "right" }}><div className="gold num" style={{ fontSize: 15, fontWeight: 800 }}>${fmt(p.amount, 0)}</div><div className="green" style={{ fontSize: 12, fontWeight: 700 }}>{p.status}</div></div>} />
              ))}
            </div>
          )}
        </Card>
      )}
      {tab === "TRANSFER" && (
        <Card void className="full">
          <SecHead title="Transfer History" />
          {D.transferHistory.length === 0 ? <div className="muted" style={{ fontSize: 15, padding: "16px 0" }}>No transfer history yet.</div> : (
            <div className="rows" style={{ marginTop: 4 }}>
              {D.transferHistory.map(t => (
                <Row key={t.id} lead={<Disc><Icon name="send" size={18} /></Disc>} title={"Sent to " + t.to} sub={t.date}
                  trail={<span className="num" style={{ fontSize: 15, fontWeight: 800 }}>−${fmt(t.amount)}</span>} />
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
window.Wallet = Wallet;
