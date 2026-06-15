/* LONGRISE Mobile — WALLET screen (balances + deposit / withdraw / send / swap flows) */
function WalletScreen(props) {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [flow, setFlow] = React.useState(props.initialFlow || null); // deposit|withdraw|send|swap
  const [step, setStep] = React.useState(0);
  const [amount, setAmount] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [network, setNetwork] = React.useState("TRC-20");
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);

  React.useEffect(function () {
    if (props.initialFlow) open(props.initialFlow);
  }, [props.initialFlow, props.flowNonce]);

  function open(f) {
    setFlow(f); setStep(0); setAmount(""); setAddress(""); setOtp(["", "", "", "", "", ""]);
  }
  function close() { setFlow(null); }

  const amt = parseFloat(amount) || 0;
  const fee = amt * 0.015;
  const otpFull = otp.join("").length === 6;

  function copyAddr() {
    if (navigator.clipboard) navigator.clipboard.writeText(D.depositAddress).catch(function () {});
    ctx.notify("Deposit address copied");
  }

  function finishDeposit() {
    ctx.addHistory({ type: "DEPOSIT", label: "USDT deposit (" + network + ") — pending", amount: amt, dir: 1 });
    setStep(2);
  }
  function finishWithdraw() {
    ctx.setBal(function (b) { return Object.assign({}, b, { earned: Math.max(0, b.earned - amt) }); });
    ctx.addHistory({ type: "WITHDRAW", label: "USDT withdrawal (" + network + ")", amount: amt, dir: -1 });
    setStep(3);
  }
  function finishSwap() {
    const got = amt * 7.08;
    ctx.setBal(function (b) {
      return Object.assign({}, b, { earned: Math.max(0, b.earned - amt), cnyt: b.cnyt + got });
    });
    ctx.addHistory({ type: "SWAP", label: "Rewards → CNYT swap", amount: amt, dir: -1 });
    setStep(1);
  }
  function finishSend() {
    ctx.setBal(function (b) { return Object.assign({}, b, { available: b.available - amt }); });
    ctx.addHistory({ type: "SEND", label: "USDT sent to " + (address.slice(0, 6) || "wallet") + "…", amount: amt, dir: -1 });
    setStep(2);
  }

  const total = ctx.bal.available + ctx.bal.earned + ctx.bal.invested;

  return (
    <div className="lr-screen" data-screen-label="Wallet">
      <div>
        <Eyebrow>My wealth</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Wallet
        </div>
      </div>

      {/* Balance hero */}
      <Card hero>
        <Eyebrow>Total assets</Eyebrow>
        <div className="display gold-text num" style={{ fontSize: 34, fontWeight: 800, margin: "8px 0 14px" }}>
          ${fmt(total)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--line-white-soft)" }}>
          <KV k="Available balance" v={"$" + fmt(ctx.bal.available) + " USDT"} />
          <KV k="Earned dividends" v={"$" + fmt(ctx.bal.earned) + " USDT"} cls="green" />
          <KV k="Invested capital" v={"$" + fmt(ctx.bal.invested) + " USDT"} />
          <KV k="CNYT rewards" v={fmt(ctx.bal.cnyt) + " CNYT"} />
        </div>
        <div className="qa-row" style={{ marginTop: 14 }}>
          <button className="qa" onClick={function () { open("deposit"); }}><Icon name="arrowDown" size={18} /> Deposit</button>
          <button className="qa" onClick={function () { open("withdraw"); }}><Icon name="arrowUp" size={18} /> Withdraw</button>
          <button className="qa" onClick={function () { open("send"); }}><Icon name="send" size={18} /> Send</button>
          <button className="qa" onClick={function () { open("swap"); }}><Icon name="swap" size={18} /> Swap</button>
        </div>
      </Card>

      {/* Recent activity */}
      <Card void>
        <SectionHead title="Recent activity" />
        <div className="rowlist" style={{ marginTop: 4 }}>
          {ctx.history.slice(0, 7).map(function (h) {
            const inFlow = h.dir > 0;
            return (
              <RowItem key={h.id}
                lead={
                  <LeadDisc color={inFlow ? "var(--green-success)" : "var(--color-cream)"}>
                    <Icon name={
                      h.type === "DEPOSIT" ? "arrowDown" :
                      h.type === "WITHDRAW" ? "arrowUp" :
                      h.type === "SWAP" ? "swap" :
                      h.type === "SEND" ? "send" :
                      h.type === "INVEST" ? "invest" :
                      h.type === "ORDER" ? "market" : "bolt"} size={16} />
                  </LeadDisc>
                }
                title={h.label}
                sub={h.date}
                trail={
                  <span className={"num " + (inFlow ? "green" : "")} style={{ fontSize: 13.5, fontWeight: 700 }}>
                    {inFlow ? "+" : "−"}${fmt(h.amount)}
                  </span>
                } />
            );
          })}
        </div>
      </Card>

      {/* ---------- DEPOSIT ---------- */}
      <Sheet open={flow === "deposit"} onClose={close} title="Deposit USDT">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="field">
              <label>Network</label>
              <SegTabs options={["TRC-20", "ERC-20"]} value={network} onChange={setNetwork} />
            </div>
            <Field label="Amount" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT" hint="Free deposits · network fee applies on-chain" />
            <Btn block disabled={amt < 10} onClick={function () { setStep(1); }}>Generate address</Btn>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="muted" style={{ fontSize: 12.5 }}>
              Send exactly <span className="num" style={{ color: "var(--gold-highlight)", fontWeight: 700 }}>${fmt(amt)} USDT</span> ({network}) to your personal address:
            </div>
            <div style={{
              border: "1px dashed var(--line-gold-mid)", borderRadius: "var(--radius-md)",
              padding: "14px", display: "flex", alignItems: "center", gap: 10
            }}>
              <span className="mono" style={{ flex: 1, wordBreak: "break-all", color: "var(--gold-highlight)" }}>{D.depositAddress}</span>
              <button className="iconbtn" style={{ width: 38, height: 38, flex: "none" }} onClick={copyAddr} aria-label="Copy address">
                <Icon name="copy" size={17} />
              </button>
            </div>
            <div className="muted" style={{ fontSize: 11.5, display: "flex", gap: 8 }}>
              <Icon name="shield" size={14} style={{ flex: "none", marginTop: 1, color: "var(--gold-base)" }} />
              <span>Triple-check the address and network. Wrong-network transfers cannot be recovered.</span>
            </div>
            <Btn block onClick={finishDeposit}>I have sent the funds</Btn>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Deposit pending">
              Watching the blockchain for your transaction. Funds credit after 12 network confirmations (~10 min).
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Deposit added to ledger"); }}>Done</Btn>
          </div>
        )}
      </Sheet>

      {/* ---------- WITHDRAW ---------- */}
      <Sheet open={flow === "withdraw"} onClose={close} title="Request withdrawal">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Amount" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(ctx.bal.earned))); }}
              hint={"Earned balance $" + fmt(ctx.bal.earned) + " · min $50"} />
            <Field label={"Destination wallet (" + network + ")"} mono value={address}
              onChange={setAddress} placeholder="T..." />
            <Card void style={{ padding: 14 }}>
              <KV k="Platform fee (1.5%)" v={"−$" + fmt(fee)} />
              <KV k="You receive" v={"$" + fmt(Math.max(0, amt - fee))} cls="green" />
              <KV k="Processing" v="Daily batch · 00:00 UTC" />
            </Card>
            {amt > ctx.bal.earned && <div className="red" style={{ fontSize: 12 }}>Exceeds earned balance.</div>}
            <Btn block disabled={amt < 50 || amt > ctx.bal.earned || address.length < 8} onClick={function () { setStep(1); }}>Next</Btn>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ textAlign: "center" }}>
              <Eyebrow>Security requirement</Eyebrow>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>Enter the 6-digit code from Google Authenticator</div>
            </div>
            <OtpInput value={otp} onChange={setOtp} />
            <Btn block disabled={!otpFull} onClick={finishWithdraw}>Confirm withdrawal</Btn>
          </div>
        )}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Withdrawal submitted">
              ${fmt(Math.max(0, amt - fee))} USDT enters the next settlement batch (00:00–02:00 UTC). Track it under Recent Activity.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Withdrawal queued"); }}>Done</Btn>
          </div>
        )}
      </Sheet>

      {/* ---------- SEND ---------- */}
      <Sheet open={flow === "send"} onClose={close} title="Send USDT">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Recipient wallet" mono value={address} onChange={setAddress} placeholder="Wallet address or LR user ID" />
            <Field label="Amount" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(ctx.bal.available))); }}
              hint={"Available $" + fmt(ctx.bal.available) + " · internal transfers are free"} />
            <Btn block disabled={amt <= 0 || amt > ctx.bal.available || address.length < 4} onClick={function () { setStep(2); finishSend(); }}>Confirm transfer</Btn>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Transfer complete">
              ${fmt(amt)} USDT is on its way. Internal transfers settle instantly.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("Transfer recorded"); }}>Done</Btn>
          </div>
        )}
      </Sheet>

      {/* ---------- SWAP ---------- */}
      <Sheet open={flow === "swap"} onClose={close} title="Swap rewards → CNYT">
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Pay (earned USDT)" inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix="USDT"
              onMax={function () { setAmount(String(Math.floor(ctx.bal.earned))); }}
              hint={"Earned balance $" + fmt(ctx.bal.earned)} />
            <div style={{ display: "flex", justifyContent: "center", color: "var(--gold-base)" }}>
              <Icon name="swap" size={20} />
            </div>
            <Card void style={{ padding: 14 }}>
              <KV k="Rate" v="1 USDT = 7.08 CNYT" />
              <KV k="You receive" v={fmt(amt * 7.08) + " CNYT"} cls="green" />
            </Card>
            <Btn block disabled={amt <= 0 || amt > ctx.bal.earned} onClick={finishSwap}>Confirm conversion</Btn>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Swap complete">
              {fmt(amt * 7.08)} CNYT credited to your rewards balance.
            </SuccessBlock>
            <Btn block onClick={function () { close(); ctx.notify("CNYT balance updated"); }}>Done</Btn>
          </div>
        )}
      </Sheet>
    </div>
  );
}

window.WalletScreen = WalletScreen;
