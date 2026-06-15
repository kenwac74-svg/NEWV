/* LONGRISE — app shell (nav, routing, drawer, flows, overlays) */
const TABS = [
  { id: "HOME", icon: "home" },
  { id: "PACKAGES", icon: "package" },
  { id: "REWARDS", icon: "rewards" },
  { id: "WALLET", icon: "wallet" }
];
const SIDE_ITEMS = [
  { id: "security", icon: "shield", label: "Security Center" },
  { id: "docs", icon: "doc", label: "Documentation" },
  { id: "support", icon: "support", label: "Support" },
  { id: "settings", icon: "gear", label: "Settings" }
];

function App() {
  const D = window.LR;
  const [tab, setTab] = React.useState("HOME");
  const [drawer, setDrawer] = React.useState(false);
  const [sub, setSub] = React.useState(null);          // overlay name
  const [flow, setFlow] = React.useState(null);        // wallet flow
  const [flowNonce, setFlowNonce] = React.useState(0);
  const [balance, setBalance] = React.useState(D.balance);
  const [activity, setActivity] = React.useState(D.recentActivity);
  const [toasts, setToasts] = React.useState([]);
  const [rewardsTab, setRewardsTab] = React.useState(null);
  const [rewardsNonce, setRewardsNonce] = React.useState(0);

  function notify(msg) {
    const id = Date.now() + Math.random();
    setToasts(t => t.concat([{ id, msg }]));
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  }
  function addActivity(h) { setActivity(a => [{ id: "a" + Date.now(), date: "Jun 13, now", ...h }].concat(a)); }
  function openFlow(f) { setFlow(f); setFlowNonce(n => n + 1); }
  function openSub(name) { setSub(name); }
  function goTab(t, rtab) {
    setTab(t); setSub(null); setDrawer(false);
    if (t === "REWARDS" && rtab) { setRewardsTab(rtab); setRewardsNonce(n => n + 1); }
  }

  const ctx = {
    balance, setBalance, activity, addActivity, notify, goTab, openFlow, openSub,
    rewardsTab, rewardsNonce
  };

  return (
    <Ctx.Provider value={ctx}>
      <div className="stage">
        <div className="app" data-motion="on">

          {/* header */}
          <header className="hdr">
            <div className="brand">
              <img src={window.LR_LOGO} alt="LONGRISE" />
              <span className="wm">LONG<em>RISE</em></span>
            </div>
            <div className="hdr-actions">
              <button className="iconbtn" aria-label="Notifications" onClick={() => notify("3 unread updates")}><Icon name="bell" size={22} /><span className="badge">3</span></button>
              <button className="iconbtn" aria-label="Menu" onClick={() => setDrawer(true)}><Icon name="menu" size={24} /></button>
              <button className="avatar" aria-label="Profile" onClick={() => openSub("profile")}>{D.user.initials}</button>
            </div>
          </header>

          {/* active tab */}
          {tab === "HOME" && <Home />}
          {tab === "PACKAGES" && <Packages />}
          {tab === "REWARDS" && <Rewards />}
          {tab === "WALLET" && <Wallet />}

          {/* sub overlay */}
          {sub && <SubScreen name={sub} onClose={() => setSub(null)} />}

          {/* bottom nav (mobile) / sidebar (PC) */}
          <nav className="nav">
            <div className="nav-brand">
              <img src={window.LR_LOGO} alt="LONGRISE" />
              <span className="wm">LONG<em>RISE</em></span>
            </div>
            {TABS.map(t => (
              <button key={t.id} className={tab === t.id && !sub ? "on" : ""} onClick={() => goTab(t.id)}>
                <Icon name={t.icon} size={24} weight={tab === t.id ? 2 : 1.7} />{t.id}
              </button>
            ))}
            <div className="nav-sub">
              {SIDE_ITEMS.map(s => (
                <button key={s.id} onClick={() => openSub(s.id)}><Icon name={s.icon} size={20} />{s.label}</button>
              ))}
              <button onClick={() => notify("Signed out — preview only")}><Icon name="logout" size={20} />Sign Out</button>
            </div>
          </nav>

          {/* drawer (mobile secondary menu) */}
          {drawer && (
            <React.Fragment>
              <div className="drawer-back" onClick={() => setDrawer(false)}></div>
              <div className="drawer">
                <div className="dh">
                  <span className="eyebrow" style={{ color: "var(--color-cream)" }}>Menu</span>
                  <button className="iconbtn" onClick={() => setDrawer(false)} aria-label="Close"><Icon name="x" size={20} /></button>
                </div>
                <div className="ditem" onClick={() => { openSub("profile"); setDrawer(false); }}>
                  <span className="avatar" style={{ width: 40, height: 40, fontSize: 14, cursor: "default" }}>{D.user.initials}</span>
                  <div><div style={{ fontWeight: 700 }}>{D.user.name}</div><div className="muted" style={{ fontSize: 13 }}>{D.user.rank} · {D.user.id}</div></div>
                </div>
                <div style={{ height: 1, background: "var(--line-white-soft)", margin: "10px 0" }}></div>
                {SIDE_ITEMS.map(s => (
                  <div key={s.id} className="ditem" onClick={() => { openSub(s.id); setDrawer(false); }}>
                    <span className="di"><Icon name={s.icon} size={22} /></span>{s.label}
                  </div>
                ))}
                <div className="ditem" onClick={() => { openSub("market"); setDrawer(false); }}><span className="di"><Icon name="market" size={22} /></span>Market <span className="muted" style={{ fontSize: 12, marginLeft: "auto" }}>Soon</span></div>
                <div style={{ height: 1, background: "var(--line-white-soft)", margin: "10px 0" }}></div>
                <div className="ditem" onClick={() => notify("Signed out — preview only")}><span className="di"><Icon name="logout" size={22} /></span>Sign Out</div>
              </div>
            </React.Fragment>
          )}

          {/* wallet flows */}
          <FlowSheet flow={flow} nonce={flowNonce} onClose={() => setFlow(null)} />

          {/* floating CS — PC only */}
          <button className="cs-float" onClick={() => openSub("support")}><Icon name="support" size={22} /> Support</button>

          {/* toasts */}
          <div className="toasts">
            {toasts.map(t => <div key={t.id} className="toast"><Icon name="check" size={16} style={{ color: "var(--gold-glow)" }} />{t.msg}</div>)}
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
