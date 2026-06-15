/* LONGRISE Mobile — INVEST screen (packages + dragon wealth + purchase flow) */
function InvestScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [tab, setTab] = React.useState("PACKAGES");
  const [sel, setSel] = React.useState(null);     // selected package/dragon
  const [step, setStep] = React.useState("detail"); // detail | confirm | done
  const [amount, setAmount] = React.useState("");

  function openPkg(p, isDragon) {
    setSel(Object.assign({ isDragon: !!isDragon }, p));
    setAmount(String(p.min));
    setStep("detail");
  }
  function close() { setSel(null); }

  const amt = parseFloat(amount) || 0;
  const mid = sel ? (sel.mid || parseFloat(sel.roi) || 1) : 1;
  const dailyEst = amt * mid / 100;
  const valid = sel && amt >= sel.min && amt <= ctx.bal.available;

  function confirmPurchase() {
    ctx.setBal(function (b) {
      return Object.assign({}, b, { available: b.available - amt, invested: b.invested + amt });
    });
    ctx.setPortfolio(function (p) {
      return [{
        id: "p" + Date.now(), pkg: sel.name, amount: amt, dailyRoi: mid,
        start: "Jun 13, 2026", end: sel.term === "No lock" ? "Open-ended" : "+" + sel.term,
        progress: 0, earned: 0
      }].concat(p);
    });
    ctx.addHistory({ type: "INVEST", label: sel.name + " package activated", amount: amt, dir: -1 });
    setStep("done");
  }

  return (
    <div className="lr-screen" data-screen-label="Invest">
      <div>
        <Eyebrow>Investment plans</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Put capital to work
        </div>
      </div>

      <SegTabs options={["PACKAGES", "DRAGON"]} value={tab} onChange={setTab} />

      {/* My portfolio */}
      {ctx.portfolio.length > 0 && (
        <Card void>
          <SectionHead title="My portfolio" />
          <div className="rowlist" style={{ marginTop: 4 }}>
            {ctx.portfolio.map(function (p) {
              return (
                <div key={p.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--line-white-soft)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="display" style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.08em" }}>{p.pkg}</span>
                    <span className="num gold-text" style={{ fontSize: 15, fontWeight: 800 }}>${fmt(p.amount)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 0 8px" }}>
                    <span className="muted" style={{ fontSize: 11 }}>{p.start} → {p.end}</span>
                    <span className="green num" style={{ fontSize: 11.5, fontWeight: 600 }}>+${fmt(p.earned)} earned</span>
                  </div>
                  <Bar value={p.progress} />
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Tier cards */}
      {tab === "PACKAGES" && D.packages.map(function (p) {
        return (
          <Card key={p.id} hero={!!p.featured}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="display" style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {p.name}
                </div>
                <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>{p.note}</div>
              </div>
              {p.featured && <Pill><Icon name="crown" size={11} /> Elite</Pill>}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "12px 0 2px" }}>
              <span className="display gold-text num" style={{ fontSize: 27, fontWeight: 800 }}>{p.roi}</span>
              <span className="muted" style={{ fontSize: 11 }}>daily ROI</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <div className="muted num" style={{ fontSize: 12 }}>
                Min ${fmt(p.min, 0)} · {p.term}
              </div>
              <Btn sm variant={p.featured ? "gold" : "ghost"} onClick={function () { openPkg(p); }}>Select</Btn>
            </div>
          </Card>
        );
      })}

      {/* Dragon wealth */}
      {tab === "DRAGON" && (
        <React.Fragment>
          <div className="muted" style={{ fontSize: 12.5, marginTop: -6 }}>
            Dragon Wealth — fixed-allocation vaults with reserved execution lanes.
          </div>
          {D.dragons.map(function (d) {
            return (
              <Card key={d.id} hero={!!d.featured} style={{ borderColor: d.featured ? undefined : "var(--line-white-soft)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 56, height: 56, flex: "none", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid " + (d.featured ? "var(--line-gold-mid)" : "var(--line-white-soft)"),
                    background: "radial-gradient(circle at 50% 35%, " + d.color + "22, transparent 70%)"
                  }}>
                    <img src={window.LR_IMG(d.icon)} alt="" style={{ width: 38, height: "auto" }} />
                  </div>
                  <div className="grow" style={{ flex: 1 }}>
                    <div className="display" style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", color: d.featured ? "var(--gold-highlight)" : "var(--color-cream)" }}>
                      {d.name}
                    </div>
                    <div className="muted num" style={{ fontSize: 11.5, marginTop: 3 }}>
                      {d.roi} · {d.term} · min ${fmt(d.min, 0)}
                    </div>
                  </div>
                  <Btn sm variant={d.featured ? "gold" : "ghost"} onClick={function () { openPkg(d, true); }}>Select</Btn>
                </div>
              </Card>
            );
          })}
        </React.Fragment>
      )}

      {/* Purchase sheet */}
      <Sheet open={!!sel} onClose={close} title={sel ? sel.name : ""}>
        {sel && step === "detail" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Pill>{sel.roi}{sel.isDragon ? "" : " daily"}</Pill>
              <Pill>{sel.term}</Pill>
            </div>
            <Field label="Investment amount" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(ctx.bal.available))); }}
              hint={"Min $" + fmt(sel.min, 0) + " · Available $" + fmt(ctx.bal.available)} />
            <Card void style={{ padding: 14 }}>
              <KV k="Projected daily dividend" v={"+$" + fmt(dailyEst) + " USDT"} cls="green" />
              <KV k="Projected 30-day yield" v={"+$" + fmt(dailyEst * 30) + " USDT"} />
              <KV k="Capital release" v={sel.term} />
            </Card>
            {amt > ctx.bal.available && (
              <div className="red" style={{ fontSize: 12 }}>Insufficient available balance — deposit first.</div>
            )}
            <Btn block disabled={!valid} onClick={function () { setStep("confirm"); }}>Continue</Btn>
          </div>
        )}

        {sel && step === "confirm" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card void style={{ padding: 14 }}>
              <KV k="Package" v={sel.name} />
              <KV k="Amount" v={"$" + fmt(amt) + " USDT"} />
              <KV k="Daily ROI (mid)" v={mid + "%"} />
              <KV k="Term" v={sel.term} />
            </Card>
            <div className="muted" style={{ fontSize: 11.5, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <Icon name="shield" size={15} style={{ flex: "none", marginTop: 1, color: "var(--gold-base)" }} />
              <span>Early termination before maturity incurs a 15% capital penalty and forfeits future dividends.</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Btn variant="ghost" onClick={function () { setStep("detail"); }}>Back</Btn>
              <Btn onClick={confirmPurchase}>Agree &amp; activate</Btn>
            </div>
          </div>
        )}

        {sel && step === "done" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Package activated">
              {sel.name} is live. First dividend credits at 00:00 UTC and appears in your wallet as earned balance.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Portfolio updated"); }}>Done</Btn>
          </div>
        )}
      </Sheet>
    </div>
  );
}

window.InvestScreen = InvestScreen;
