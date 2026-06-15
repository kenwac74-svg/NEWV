/* LONGRISE Mobile — MARKET screen (P2P USDT / CNYT trading floor) */
function MarketScreen() {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA, fmt = window.LR_FMT;
  const [tab, setTab] = React.useState("USDT");
  const [trade, setTrade] = React.useState(null); // {side}
  const [amount, setAmount] = React.useState("");
  const [done, setDone] = React.useState(false);

  const isUsdt = tab === "USDT";
  const price = isUsdt ? D.market.usdtPremium : D.market.cnytPrice;
  const orders = D.market.orders.filter(function (o) { return o.asset === tab; });

  const amt = parseFloat(amount) || 0;
  const totalCost = amt * price;
  const valid = amt > 0 && (trade && trade.side === "BUY" ? totalCost <= ctx.bal.available : true);

  function openTrade(side) {
    setTrade({ side: side });
    setAmount("");
    setDone(false);
  }
  function confirmTrade() {
    ctx.addHistory({
      type: "ORDER",
      label: trade.side + " " + fmt(amt, 0) + " " + tab + " @ " + price,
      amount: totalCost, dir: trade.side === "BUY" ? -1 : 1
    });
    setDone(true);
  }

  return (
    <div className="lr-screen" data-screen-label="Market">
      <div>
        <Eyebrow>P2P trading floor</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Market
        </div>
      </div>

      <SegTabs options={["USDT", "CNYT"]} value={tab} onChange={setTab} />

      {/* Price card */}
      <Card hero>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <Eyebrow>{isUsdt ? "USDT / USD premium" : "CNYT / USDT"}</Eyebrow>
            <div className="display gold-text num" style={{ fontSize: 32, fontWeight: 800, margin: "6px 0 2px" }}>
              {isUsdt ? fmt(price, 3) : fmt(price, 4)}
            </div>
            <span className={"num " + (D.market.cnytChange >= 0 ? "green" : "red")} style={{ fontSize: 12.5, fontWeight: 700 }}>
              {D.market.cnytChange >= 0 ? "+" : ""}{D.market.cnytChange}% · 24h
            </span>
          </div>
          <Pill live>Order stream</Pill>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
          <Btn onClick={function () { openTrade("BUY"); }}>Buy {tab}</Btn>
          <Btn variant="red" onClick={function () { openTrade("SELL"); }}>Sell {tab}</Btn>
        </div>
      </Card>

      {/* Your stats */}
      <Card>
        <SectionHead title="Your statistics" />
        <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginTop: 10 }}>
          <StatTile value={"$" + fmt(ctx.bal.available, 0)} label="Wallet" />
          <StatTile value="2" label="Open orders" />
          <StatTile value="+$96" label="Trading PnL" />
        </div>
      </Card>

      {/* Order stream */}
      <Card void>
        <SectionHead title="Live order stream" />
        <div className="rowlist" style={{ marginTop: 4 }}>
          {orders.map(function (o) {
            const buy = o.side === "BUY";
            return (
              <RowItem key={o.id}
                lead={
                  <LeadDisc color={buy ? "var(--green-success)" : "var(--red-alert)"}>
                    <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.1em" }}>{o.side}</span>
                  </LeadDisc>
                }
                title={fmt(o.amount, 0) + " " + o.asset}
                sub={o.user + " · @ " + fmt(o.price, o.asset === "CNYT" ? 4 : 3)}
                trail={
                  <Pill style={o.status === "COMPLETE" ? { color: "var(--color-muted)", borderColor: "var(--line-white-soft)", background: "none" } : null}>
                    {o.status}
                  </Pill>
                } />
            );
          })}
        </div>
      </Card>

      <div className="muted" style={{ fontSize: 11, display: "flex", gap: 8, alignItems: "flex-start", padding: "0 4px" }}>
        <Icon name="shield" size={14} style={{ flex: "none", marginTop: 1, color: "var(--gold-base)" }} />
        <span>Escrowed settlement — funds release only after both sides confirm. Never settle off-platform.</span>
      </div>

      {/* Trade sheet */}
      <Sheet open={!!trade} onClose={function () { setTrade(null); }}
        title={trade ? trade.side + " " + tab : ""}>
        {trade && !done && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label={"Amount (" + tab + ")"} inputMode="decimal" value={amount}
              onChange={function (v) { setAmount(v.replace(/[^0-9.]/g, "")); }}
              suffix={tab}
              hint={"Market price " + fmt(price, isUsdt ? 3 : 4) + " · fee 0.2%"} />
            <Card void style={{ padding: 14 }}>
              <KV k={"Price per " + tab} v={fmt(price, isUsdt ? 3 : 4) + " USDT"} />
              <KV k="Transaction fee" v={"$" + fmt(totalCost * 0.002)} />
              <KV k={trade.side === "BUY" ? "Total cost" : "You receive"} v={"$" + fmt(totalCost)} cls={trade.side === "BUY" ? "" : "green"} />
            </Card>
            {trade.side === "BUY" && totalCost > ctx.bal.available && (
              <div className="red" style={{ fontSize: 12 }}>Exceeds available wallet balance.</div>
            )}
            <Btn block variant={trade.side === "BUY" ? "gold" : "red"} disabled={!valid} onClick={confirmTrade}>
              Place {trade.side.toLowerCase()} order
            </Btn>
          </div>
        )}
        {trade && done && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SuccessBlock title="Order placed">
              Your {trade.side.toLowerCase()} order for {fmt(amt, 0)} {tab} entered the live queue. You'll be notified on match.
            </SuccessBlock>
            <Btn block onClick={function () { setTrade(null); ctx.notify("Order added to ledger"); }}>Done</Btn>
          </div>
        )}
      </Sheet>
    </div>
  );
}

window.MarketScreen = MarketScreen;
