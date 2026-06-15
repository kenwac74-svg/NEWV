/* LONGRISE Mobile — login overlays + ALL (전체) menu page
   - ConsentGate: shown every login. Risk Notice + Terms, each consented separately.
   - ImportantNoticePopup: optional second popup, only when D.importantNotice is set.
   - StartHereNudge: shown to new / no-purchase users after notices.
   - AllScreen: the "전체" tab — a full hotlink hub (replaces any sidebar/drawer). */

/* ---------- Consent gate (Risk Notice + Terms) ---------- */
function ConsentGate(props) {
  const D = window.LR_DATA;
  const [riskOk, setRiskOk] = React.useState(false);
  const [termsOk, setTermsOk] = React.useState(false);
  const both = riskOk && termsOk;

  function Box(p) {
    return (
      <div className="consent-box">
        <div className="consent-box-label">{p.label}</div>
        <div className="consent-text">{p.text}</div>
        <button className={"consent-check" + (p.on ? " on" : "")} onClick={p.onToggle}>
          <span className="cbox">{p.on && <Icon name="check" size={13} weight={2.4} />}</span>
          {p.agree}
        </button>
      </div>
    );
  }

  return (
    <div className="consent-gate" role="dialog" aria-modal="true" aria-label="Risk notice and terms">
      <div className="consent-card">
        <div className="consent-head">
          <div className="lr-brandmark">
            <img src={window.LR_IMG("iconGold")} alt="LONGRISE" />
            <span className="lr-wordmark">LONG<em>RISE</em></span>
          </div>
          <div className="consent-title">Before you continue</div>
          <div className="consent-sub">Please review and agree to each item to access your account.</div>
        </div>

        <div className="consent-boxes">
          <Box label="1 · Risk Notice" text={D.riskNotice} on={riskOk}
            agree="I have read and agree to the Risk Notice"
            onToggle={function () { setRiskOk(!riskOk); }} />
          <Box label="2 · Terms of Service" text={D.terms} on={termsOk}
            agree="I have read and agree to the Terms of Service"
            onToggle={function () { setTermsOk(!termsOk); }} />
        </div>

        <button className={"btn gold block consent-confirm" + (both ? "" : " is-disabled")}
          disabled={!both} onClick={props.onAgree}>
          Agree &amp; continue
        </button>
        <div className="consent-foot">You must agree each time you sign in.</div>
      </div>
    </div>
  );
}

/* ---------- Important notice (second popup) ---------- */
function ImportantNoticePopup(props) {
  const n = props.notice;
  return (
    <div className="pop-backdrop" onClick={function (e) { if (e.target === e.currentTarget) props.onClose(); }}>
      <div className="pop-card" role="dialog" aria-modal="true">
        <div className="pop-icon alert"><Icon name="alert" size={22} weight={2} /></div>
        <div className="pop-tag">{n.tag}</div>
        <div className="pop-title">{n.title}</div>
        <div className="pop-body">{n.body}</div>
        <button className="btn gold block" onClick={props.onClose}>Got it</button>
      </div>
    </div>
  );
}

/* ---------- Start Here nudge (new users) ---------- */
function StartHereNudge(props) {
  return (
    <div className="pop-backdrop" onClick={function (e) { if (e.target === e.currentTarget) props.onClose(); }}>
      <div className="pop-card" role="dialog" aria-modal="true">
        <div className="pop-icon gold"><Icon name="bolt" size={22} weight={2} /></div>
        <div className="pop-tag" style={{ color: "var(--gold-glow)" }}>New here?</div>
        <div className="pop-title">Master LongRise in 3 minutes</div>
        <div className="pop-body">Follow the Start Here guide — buy a package, watch it earn, and grow. We'll walk you through every step.</div>
        <a className="btn gold block" href="START HERE.html">Open Start Here</a>
        <button className="btn ghost block" style={{ marginTop: 8 }} onClick={props.onClose}>Maybe later</button>
      </div>
    </div>
  );
}

/* ---------- ALL (전체) menu page ---------- */
function AllScreen(props) {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA;

  function Tile(p) {
    return (
      <button className={"all-tile" + (p.soon ? " soon" : "")} onClick={p.onClick}>
        <span className="all-ic"><Icon name={p.icon} size={20} /></span>
        <span className="all-name">{p.name}</span>
        {p.soon && <span className="all-soon">Soon</span>}
        {p.tagline && <span className="all-tagline">{p.tagline}</span>}
      </button>
    );
  }

  return (
    <div className="lr-screen" data-screen-label="All">
      <div>
        <Eyebrow>All</Eyebrow>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.04em", marginTop: 2 }}>
          Everything in one place
        </div>
      </div>

      {/* Start Here highlight */}
      <a className="all-starthere" href="START HERE.html">
        <span className="all-ic gold"><Icon name="bolt" size={20} /></span>
        <span className="grow">
          <span className="all-sh-title">Start Here</span>
          <span className="all-sh-sub">New? Master LongRise in 3 minutes</span>
        </span>
        <Icon name="chevR" size={16} style={{ color: "var(--gold-base)" }} />
      </a>

      <Card void>
        <SectionHead title="Main" />
        <div className="all-grid">
          <Tile icon="invest" name="Plans"   onClick={function () { ctx.goTab("PLANS"); }} />
          <Tile icon="team"   name="Network" onClick={function () { ctx.goTab("NETWORK"); }} />
          <Tile icon="home"   name="Earn"    onClick={function () { ctx.goTab("EARN"); }} />
          <Tile icon="wallet" name="Wallet"  onClick={function () { ctx.goTab("WALLET"); }} />
        </div>
      </Card>

      <Card void>
        <SectionHead title="Trade & markets" />
        <div className="all-grid">
          <Tile icon="market" name="Market" soon onClick={function () { ctx.notify("Market opens in a future update"); }} />
          <Tile icon="swap"   name="Swap"   onClick={function () { ctx.goTab("WALLET", { open: "swap" }); }} />
          <Tile icon="arrowDown" name="Deposit" onClick={function () { ctx.goTab("WALLET", { open: "deposit" }); }} />
          <Tile icon="arrowUp"   name="Withdraw" onClick={function () { ctx.goTab("WALLET", { open: "withdraw" }); }} />
        </div>
      </Card>

      <Card void>
        <SectionHead title="Account" />
        <div className="all-grid">
          <Tile icon="user"    name="Profile"  onClick={props.onOpenMy} />
          <Tile icon="shield"  name="Security" onClick={props.onOpenMy} />
          <Tile icon="bell"    name="Alerts"   onClick={function () { ctx.notify("3 unread announcements"); }} />
          <Tile icon="doc"     name="Docs"     onClick={function () { ctx.notify("Documentation — preview only"); }} />
          <Tile icon="gear"    name="Settings" onClick={props.onOpenMy} />
          <Tile icon="support" name="Support"  onClick={function () { ctx.notify("Support — preview only"); }} />
        </div>
      </Card>

      <button className="all-signout" onClick={function () { ctx.notify("Signed out — preview only"); }}>
        <Icon name="logout" size={18} /> Sign out
      </button>

      <div className="muted" style={{ fontSize: 10, textAlign: "center", lineHeight: 1.6, padding: "2px 12px" }}>
        LONGRISE AI · Security Protocol V7.2 active<br />Static design preview — no live funds or trading.
      </div>
    </div>
  );
}

Object.assign(window, { ConsentGate, ImportantNoticePopup, StartHereNudge, AllScreen });
