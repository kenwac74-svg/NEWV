/* LONGRISE — PACKAGES (Auto Betting Package) */
function Packages() {
  const ctx = React.useContext(Ctx);
  const D = window.LR, fmt = window.fmt;
  const [sel, setSel] = React.useState(null);
  const [step, setStep] = React.useState("detail");
  const [amount, setAmount] = React.useState("");
  const [nonce, setNonce] = React.useState(0);

  function open(p) { setSel(p); setAmount(String(p.price)); setStep("detail"); setNonce(n => n + 1); }
  const amt = parseFloat(amount) || 0;
  const dailyMid = sel ? parseFloat(sel.roi) / 365 : 0; // rough daily from annual %
  const dailyEst = amt * dailyMid / 100;
  const valid = sel && amt >= sel.price && amt <= ctx.balance.available;

  function confirm() {
    ctx.setBalance(x => ({ ...x, available: x.available - amt, invested: x.invested + amt }));
    ctx.addActivity({ type: "INVEST", label: sel.name + " package activated", amount: amt, dir: -1 });
    setStep("done");
  }

  return (
    <div className="screen" data-screen-label="Packages">
      <div className="full">
        <Eyebrow>Choose your plan</Eyebrow>
        <div className="h-title" style={{ marginTop: 3 }}>Auto Betting Package</div>
        <div className="muted" style={{ fontSize: 14, marginTop: 6 }}>AI-managed packages with daily dividends. Capital releases at maturity.</div>
      </div>

      {ctx.balance.invested > 0 && (
        <Card void className="full">
          <SecHead title="Active" />
          {D.activePackages.map(ap => (
            <div key={ap.id} style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, letterSpacing: "0.06em" }}>{ap.name}</span>
                <span className="gold num" style={{ fontSize: 19, fontWeight: 800 }}>${fmt(ap.amount, 0)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", margin: "6px 0 10px" }}>
                <span className="muted" style={{ fontSize: 13 }}>{ap.start} → {ap.end}</span>
                <span className="green num" style={{ fontSize: 13, fontWeight: 700 }}>+${fmt(ap.earned)}</span>
              </div>
              <Bar value={ap.progress} />
            </div>
          ))}
        </Card>
      )}

      {D.packages.map(p => (
        <Card key={p.id} hero={p.popular} className="pkg span1">
          {p.popular && <span className="pkg-badge"><Pill solid>Popular</Pill></span>}
          <div className="pkg-ic"><Icon name={p.popular ? "crown" : "package"} size={26} /></div>
          <div className="pkg-name">{p.name}</div>
          <div className="pkg-period">{p.period}</div>
          <div className="pkg-price gold num">${fmt(p.price, 0)}</div>
          <div className="pkg-tier">{p.tier}</div>
          <div style={{ margin: "16px 0 18px", borderTop: "1px solid var(--line-white-soft)" }}>
            <div className="pkg-line" style={{ borderBottom: "1px solid var(--line-white-soft)" }}>
              <span className="muted">ROI</span><span className="green num" style={{ fontWeight: 800 }}>{p.roi}</span>
            </div>
            <div className="pkg-line">
              <span className="muted">Monthly CNYT</span><span className="num" style={{ fontWeight: 800, color: "var(--gold-highlight)" }}>+{fmt(p.monthlyCnyt, 0)}</span>
            </div>
          </div>
          <Btn block onClick={() => open(p)}>Invest Now</Btn>
        </Card>
      ))}

      {/* purchase sheet */}
      <Sheet open={!!sel} onClose={() => setSel(null)} title={sel ? sel.name : ""}>
        {sel && step === "detail" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 10 }}><Pill>ROI {sel.roi}</Pill><Pill>{sel.period}</Pill></div>
            <Field label="Amount" inputMode="decimal" value={amount} onChange={v => setAmount(v.replace(/[^0-9.]/g, ""))} suffix="USDT" onMax={() => setAmount(String(Math.floor(ctx.balance.available)))} hint={"Min $" + fmt(sel.price, 0) + " · Available $" + fmt(ctx.balance.available)} />
            <Card void style={{ padding: 16 }}>
              <KV k="Est. daily dividend" v={"+$" + fmt(dailyEst) + " USDT"} cls="green" />
              <KV k="Monthly CNYT reward" v={"+" + fmt(sel.monthlyCnyt, 0) + " CNYT"} />
              <KV k="Term" v={sel.period} />
            </Card>
            {amt > ctx.balance.available && <div className="red" style={{ fontSize: 14 }}>Insufficient available balance — deposit first.</div>}
            <Btn block disabled={!valid} onClick={() => setStep("confirm")}>Continue</Btn>
          </div>
        )}
        {sel && step === "confirm" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card void style={{ padding: 16 }}>
              <KV k="Package" v={sel.name} /><KV k="Amount" v={"$" + fmt(amt) + " USDT"} /><KV k="ROI" v={sel.roi} /><KV k="Term" v={sel.period} />
            </Card>
            <div className="muted" style={{ fontSize: 13, display: "flex", gap: 8 }}><Icon name="shield" size={16} style={{ flex: "none", marginTop: 1, color: "var(--gold-base)" }} /><span>Early termination before maturity incurs a 15% capital penalty and forfeits future dividends.</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Btn variant="ghost" onClick={() => setStep("detail")}>Back</Btn>
              <Btn onClick={confirm}>Agree &amp; Activate</Btn>
            </div>
          </div>
        )}
        {sel && step === "done" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Success title="Package Activated">{sel.name} is live. First dividend credits at 00:00 UTC.</Success>
            <Btn block onClick={() => { setSel(null); ctx.notify("Package activated"); }}>Done</Btn>
          </div>
        )}
      </Sheet>
    </div>
  );
}
window.Packages = Packages;
