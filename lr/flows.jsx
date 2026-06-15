/* LONGRISE — wallet action flows (deposit / withdraw / send / swap) */
function FlowSheet(props) {
  const ctx = React.useContext(Ctx);
  const D = window.LR, fmt = window.fmt;
  const flow = props.flow;            // deposit | withdraw | send | swap | null
  const [step, setStep] = React.useState(0);
  const [amount, setAmount] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [network, setNetwork] = React.useState("TRC-20");
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);

  React.useEffect(() => { setStep(0); setAmount(""); setAddress(""); setOtp(["", "", "", "", "", ""]); setNetwork("TRC-20"); }, [props.nonce]);

  const b = ctx.balance;
  const amt = parseFloat(amount) || 0;
  const fee = amt * 0.015;
  const otpFull = otp.join("").length === 6;
  const close = props.onClose;

  function copyAddr() { if (navigator.clipboard) navigator.clipboard.writeText(D.depositAddress).catch(() => {}); ctx.notify("Deposit address copied"); }

  const title = { deposit: "Deposit USDT", withdraw: "Request Withdrawal", send: "Send USDT", swap: "Convert to CNYT" }[flow] || "";

  return (
    <Sheet open={!!flow} onClose={close} title={title}>
      {/* DEPOSIT */}
      {flow === "deposit" && step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="field"><label>Network</label><Seg options={["TRC-20", "ERC-20"]} value={network} onChange={setNetwork} /></div>
          <Field label="Amount" inputMode="decimal" value={amount} onChange={v => setAmount(v.replace(/[^0-9.]/g, ""))} suffix="USDT" hint="Free deposits · network fee applies on-chain" />
          <Btn block disabled={amt < 10} onClick={() => setStep(1)}>Generate Address</Btn>
        </div>
      )}
      {flow === "deposit" && step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="muted" style={{ fontSize: 15 }}>Send <b className="num" style={{ color: "var(--gold-highlight)" }}>${fmt(amt)} USDT</b> ({network}) to:</div>
          <div style={{ border: "1px dashed var(--line-gold-mid)", borderRadius: 13, padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span className="num" style={{ flex: 1, wordBreak: "break-all", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--gold-highlight)" }}>{D.depositAddress}</span>
            <button className="iconbtn" style={{ width: 42, height: 42, flex: "none" }} onClick={copyAddr} aria-label="Copy"><Icon name="copy" size={18} /></button>
          </div>
          <div className="muted" style={{ fontSize: 13, display: "flex", gap: 8 }}><Icon name="shield" size={16} style={{ flex: "none", marginTop: 1, color: "var(--gold-base)" }} /><span>Triple-check the address and network. Wrong-network transfers cannot be recovered.</span></div>
          <Btn block onClick={() => { ctx.addActivity({ type: "DEPOSIT", label: "USDT deposit (" + network + ") — pending", amount: amt, dir: 1 }); setStep(2); }}>I Have Sent The Funds</Btn>
        </div>
      )}
      {flow === "deposit" && step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Success title="Deposit Pending">Watching the blockchain. Funds credit after network confirmations (~10 min).</Success>
          <Btn block onClick={() => { close(); ctx.notify("Deposit added to ledger"); }}>Done</Btn>
        </div>
      )}

      {/* WITHDRAW */}
      {flow === "withdraw" && step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Amount" inputMode="decimal" value={amount} onChange={v => setAmount(v.replace(/[^0-9.]/g, ""))} suffix="USDT" onMax={() => setAmount(String(Math.floor(b.earned)))} hint={"Earned balance $" + fmt(b.earned) + " · min $50"} />
          <Field label={"Destination wallet (" + network + ")"} mono value={address} onChange={setAddress} placeholder="T..." />
          <Card void style={{ padding: 16 }}>
            <KV k="Platform fee (1.5%)" v={"−$" + fmt(fee)} />
            <KV k="You receive" v={"$" + fmt(Math.max(0, amt - fee))} cls="green" />
            <KV k="Processing" v="Daily batch · 00:00 UTC" />
          </Card>
          {amt > b.earned && <div className="red" style={{ fontSize: 14 }}>Exceeds earned balance.</div>}
          <Btn block disabled={amt < 50 || amt > b.earned || address.length < 8} onClick={() => setStep(1)}>Next</Btn>
        </div>
      )}
      {flow === "withdraw" && step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ textAlign: "center" }}><Eyebrow>Security Requirement</Eyebrow><div className="muted" style={{ fontSize: 15, marginTop: 6 }}>Enter your 6-digit OTP code</div></div>
          <Otp value={otp} onChange={setOtp} />
          <Btn block disabled={!otpFull} onClick={() => { ctx.setBalance(x => ({ ...x, earned: Math.max(0, x.earned - amt), total: x.total - amt })); ctx.addActivity({ type: "WITHDRAW", label: "USDT withdrawal (" + network + ")", amount: amt, dir: -1 }); setStep(2); }}>Confirm Withdrawal</Btn>
        </div>
      )}
      {flow === "withdraw" && step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Success title="Withdrawal Submitted">${fmt(Math.max(0, amt - fee))} USDT enters the next settlement batch (00:00–02:00 UTC).</Success>
          <Btn block onClick={() => { close(); ctx.notify("Withdrawal queued"); }}>Done</Btn>
        </div>
      )}

      {/* SEND */}
      {flow === "send" && step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Recipient wallet / LR ID" mono value={address} onChange={setAddress} placeholder="Wallet address or LR-ID" />
          <Field label="Amount" inputMode="decimal" value={amount} onChange={v => setAmount(v.replace(/[^0-9.]/g, ""))} suffix="USDT" onMax={() => setAmount(String(Math.floor(b.available)))} hint={"Available $" + fmt(b.available) + " · internal transfers are free"} />
          <Btn block disabled={amt <= 0 || amt > b.available || address.length < 4} onClick={() => { ctx.setBalance(x => ({ ...x, available: x.available - amt, total: x.total - amt })); ctx.addActivity({ type: "SEND", label: "USDT sent to " + address.slice(0, 8) + "…", amount: amt, dir: -1 }); setStep(2); }}>Confirm Transfer</Btn>
        </div>
      )}
      {flow === "send" && step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Success title="Transfer Complete">${fmt(amt)} USDT sent. Internal transfers settle instantly.</Success>
          <Btn block onClick={() => { close(); ctx.notify("Transfer recorded"); }}>Done</Btn>
        </div>
      )}

      {/* SWAP */}
      {flow === "swap" && step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Pay (earned USDT)" inputMode="decimal" value={amount} onChange={v => setAmount(v.replace(/[^0-9.]/g, ""))} suffix="USDT" onMax={() => setAmount(String(Math.floor(b.earned)))} hint={"Earned balance $" + fmt(b.earned)} />
          <div style={{ display: "flex", justifyContent: "center", color: "var(--gold-base)" }}><Icon name="swap" size={22} /></div>
          <Card void style={{ padding: 16 }}><KV k="Rate" v="1 USDT = 7.08 CNYT" /><KV k="You receive" v={fmt(amt * 7.08) + " CNYT"} cls="green" /></Card>
          <Btn block disabled={amt <= 0 || amt > b.earned} onClick={() => { ctx.setBalance(x => ({ ...x, earned: Math.max(0, x.earned - amt), cnyt: x.cnyt + amt * 7.08, total: x.total - amt })); ctx.addActivity({ type: "SWAP", label: "Convert to CNYT", amount: amt, dir: -1 }); setStep(2); }}>Confirm Conversion</Btn>
        </div>
      )}
      {flow === "swap" && step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Success title="Swap Complete">{fmt(amt * 7.08)} CNYT credited to your rewards balance.</Success>
          <Btn block onClick={() => { close(); ctx.notify("CNYT balance updated"); }}>Done</Btn>
        </div>
      )}
    </Sheet>
  );
}
window.FlowSheet = FlowSheet;
