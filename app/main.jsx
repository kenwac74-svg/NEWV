/* LONGRISE Mobile — app shell: tabs, context, login overlays, tweaks */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "goldMode": "restrained",
  "motion": true,
  "liveDemo": true,
  "userState": "new",
  "showNotice": true
}/*EDITMODE-END*/;

/* Bottom-nav tabs. `key` is the internal route id; `label` is the displayed
   (interim) term. Terminology will be unified later — see Glossary.html.
   PLANS=plans catalog, NETWORK=referral/team, EARN=earning dashboard,
   WALLET=funds, ALL=full menu hub (replaces any sidebar/drawer). */
const LR_TABS = [
  { key: "PLANS",   label: "Plans",   icon: "invest" },
  { key: "NETWORK", label: "Network", icon: "team" },
  { key: "EARN",    label: "Earn",    icon: "home" },
  { key: "WALLET",  label: "Wallet",  icon: "wallet" },
  { key: "ALL",     label: "All",     icon: "grid" }
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const D = window.LR_DATA;

  const [tab, setTab] = React.useState("EARN");
  const [myOpen, setMyOpen] = React.useState(false);
  const [bal, setBal] = React.useState(D.balances);
  const [portfolio, setPortfolio] = React.useState(D.portfolio);
  const [history, setHistory] = React.useState(D.history);
  const [toasts, setToasts] = React.useState([]);
  const [walletFlow, setWalletFlow] = React.useState({ flow: null, nonce: 0 });

  /* Login overlay sequence: consent → (important notice) → (start-here nudge) → done */
  const [intro, setIntro] = React.useState("consent");

  function notify(msg) {
    const id = Date.now() + Math.random();
    setToasts(function (prev) { return prev.concat([{ id: id, msg: msg }]); });
    setTimeout(function () {
      setToasts(function (prev) { return prev.filter(function (x) { return x.id !== id; }); });
    }, 2600);
  }

  function addHistory(h) {
    setHistory(function (prev) {
      return [Object.assign({ id: "h" + Date.now(), date: "Jun 13, now" }, h)].concat(prev);
    });
  }

  function goTab(next, opts) {
    setTab(next);
    setMyOpen(false);
    if (next === "WALLET" && opts && opts.open) {
      setWalletFlow(function (w) { return { flow: opts.open, nonce: w.nonce + 1 }; });
    }
  }

  /* Advance the login overlay chain, skipping steps that don't apply. */
  function afterConsent() {
    if (t.showNotice && D.importantNotice) { setIntro("notice"); return; }
    if (t.userState === "new") { setIntro("starthere"); return; }
    setIntro(null);
  }
  function afterNotice() {
    if (t.userState === "new") { setIntro("starthere"); return; }
    setIntro(null);
  }

  const ctxValue = {
    bal: bal, setBal: setBal,
    portfolio: portfolio, setPortfolio: setPortfolio,
    history: history, addHistory: addHistory,
    notify: notify, goTab: goTab,
    motionOn: t.motion && t.liveDemo
  };

  return (
    <AppCtx.Provider value={ctxValue}>
      <div className="lr-stage">
        <div className="lr-app" data-gold={t.goldMode} data-motion={t.motion ? "on" : "off"}>

          {/* Header */}
          <header className="lr-header">
            <div className="lr-brandmark">
              <img src={window.LR_IMG("iconGold")} alt="LONGRISE" />
              <span className="lr-wordmark">LONG<em>RISE</em></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button className="iconbtn" aria-label="Notifications" onClick={function () { notify("3 unread announcements"); }}>
                <Icon name="bell" size={20} />
              </button>
              <button className="avatar" aria-label="My profile" onClick={function () { setMyOpen(true); }}>
                {D.user.initials}
              </button>
            </div>
          </header>

          {/* Active screen */}
          {tab === "EARN" && <HomeScreen />}
          {tab === "PLANS" && <InvestScreen />}
          {tab === "NETWORK" && <TeamScreen />}
          {tab === "WALLET" && <WalletScreen initialFlow={walletFlow.flow} flowNonce={walletFlow.nonce} />}
          {tab === "ALL" && <AllScreen onOpenMy={function () { setMyOpen(true); }} />}

          {/* MY overlay */}
          {myOpen && <MyPage onClose={function () { setMyOpen(false); }} />}

          {/* Bottom nav */}
          <nav className="lr-nav">
            <div className="nav-brand">
              <img src={window.LR_IMG("iconGold")} alt="LONGRISE" />
              <span className="lr-wordmark">LONG<em>RISE</em></span>
            </div>
            {LR_TABS.map(function (item) {
              return (
                <button key={item.key}
                  className={tab === item.key ? "active" : ""}
                  onClick={function () { goTab(item.key); }}>
                  <Icon name={item.icon} size={21} weight={tab === item.key ? 2 : 1.6} />
                  {item.label}
                  <span className="nav-dot"></span>
                </button>
              );
            })}
          </nav>

          {/* Toasts */}
          <div className="toast-host">
            {toasts.map(function (x) {
              return (
                <div key={x.id} className="toast">
                  <Icon name="check" size={14} style={{ color: "var(--gold-glow)" }} />
                  {x.msg}
                </div>
              );
            })}
          </div>

          {/* ===== Login overlays ===== */}
          {intro === "consent" && <ConsentGate onAgree={afterConsent} />}
          {intro === "notice" && D.importantNotice &&
            <ImportantNoticePopup notice={D.importantNotice} onClose={afterNotice} />}
          {intro === "starthere" &&
            <StartHereNudge onClose={function () { setIntro(null); }} />}
        </div>
      </div>

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection label="Account state (demo)" />
        <TweakRadio label="User" value={t.userState}
          options={["new", "active"]}
          onChange={function (v) { setTweak("userState", v); }} />
        <TweakToggle label="Important notice popup" value={t.showNotice}
          onChange={function (v) { setTweak("showNotice", v); }} />
        <TweakButton label="Replay login flow" onClick={function () { setIntro("consent"); }} />
        <TweakSection label="Visual" />
        <TweakRadio label="Gold accent" value={t.goldMode}
          options={["restrained", "vivid"]}
          onChange={function (v) { setTweak("goldMode", v); }} />
        <TweakSection label="Behavior" />
        <TweakToggle label="Motion & transitions" value={t.motion}
          onChange={function (v) { setTweak("motion", v); }} />
        <TweakToggle label="Live trade feed" value={t.liveDemo}
          onChange={function (v) { setTweak("liveDemo", v); }} />
      </TweaksPanel>
    </AppCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
