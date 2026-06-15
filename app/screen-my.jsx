/* LONGRISE Mobile — MY page (profile, security, support) as overlay */
function MyPage(props) {
  const ctx = React.useContext(AppCtx);
  const D = window.LR_DATA;
  const [twoFa, setTwoFa] = React.useState(true);
  const [notif, setNotif] = React.useState(true);
  const [faqOpen, setFaqOpen] = React.useState(null);

  function Toggle(p) {
    return (
      <button onClick={p.onChange} aria-label={p.label}
        style={{
          appearance: "none", border: "1px solid " + (p.on ? "var(--line-gold-mid)" : "var(--line-white-soft)"),
          background: p.on ? "linear-gradient(125deg, var(--gold-highlight), var(--gold-base))" : "var(--surface-void)",
          width: 46, height: 27, borderRadius: 999, position: "relative", cursor: "pointer",
          transition: "background .18s ease", flex: "none"
        }}>
        <span style={{
          position: "absolute", top: 2.5, left: p.on ? 21 : 3,
          width: 19, height: 19, borderRadius: "50%",
          background: p.on ? "var(--color-ink)" : "var(--color-muted)",
          transition: "left .18s ease"
        }}></span>
      </button>
    );
  }

  return (
    <div className="page-over" data-screen-label="My Profile">
      <div className="lr-header">
        <button className="iconbtn" onClick={props.onClose} aria-label="Back">
          <Icon name="chevL" size={20} />
        </button>
        <span className="eyebrow" style={{ color: "var(--color-cream)" }}>My Profile</span>
        <span style={{ width: 44 }}></span>
      </div>

      <div className="lr-screen">
        {/* Profile card */}
        <Card hero style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="avatar" style={{ width: 54, height: 54, fontSize: 18, cursor: "default" }}>{D.user.initials}</div>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontSize: 18, fontWeight: 700 }}>{D.user.name}</div>
            <div className="muted mono" style={{ fontSize: 11, marginTop: 2 }}>{D.user.id} · since {D.user.memberSince}</div>
          </div>
          <Pill><Icon name="crown" size={11} /> {D.user.rank}</Pill>
        </Card>

        {/* Security */}
        <Card void>
          <SectionHead title="Security center" />
          <div className="rowlist" style={{ marginTop: 4 }}>
            <RowItem lead={<LeadDisc><Icon name="shield" size={16} /></LeadDisc>}
              title="Google Authenticator" sub={twoFa ? "2FA enabled — required at login" : "2FA disabled — at risk"}
              trail={<Toggle on={twoFa} label="Toggle 2FA" onChange={function () { setTwoFa(!twoFa); ctx.notify(twoFa ? "2FA disabled" : "2FA enabled"); }} />} />
            <RowItem lead={<LeadDisc><Icon name="lock" size={16} /></LeadDisc>}
              title="Trading password" sub="Used to confirm withdrawals" chev
              onClick={function () { ctx.notify("Password reset — preview only"); }} />
            <RowItem lead={<LeadDisc><Icon name="scan" size={16} /></LeadDisc>}
              title="Withdrawal PIN" sub="4-digit settlement PIN" chev
              onClick={function () { ctx.notify("PIN setup — preview only"); }} />
          </div>
        </Card>

        {/* Preferences + support */}
        <Card void>
          <SectionHead title="Platform" />
          <div className="rowlist" style={{ marginTop: 4 }}>
            <RowItem lead={<LeadDisc><Icon name="bell" size={16} /></LeadDisc>}
              title="Notifications" sub="Dividends, settlements, announcements"
              trail={<Toggle on={notif} label="Toggle notifications" onChange={function () { setNotif(!notif); }} />} />
            <RowItem lead={<LeadDisc><Icon name="support" size={16} /></LeadDisc>}
              title="Support tickets" sub="Live operational queue" chev
              onClick={function () { ctx.notify("Support — preview only"); }} />
            <RowItem lead={<LeadDisc><Icon name="doc" size={16} /></LeadDisc>}
              title="Documentation" sub="Guides · whitepaper · roadmap" chev
              onClick={function () { ctx.notify("Docs — preview only"); }} />
            <RowItem lead={<LeadDisc><Icon name="gear" size={16} /></LeadDisc>}
              title="Platform settings" sub="Language · currency display" chev
              onClick={function () { ctx.notify("Settings — preview only"); }} />
          </div>
        </Card>

        {/* FAQ */}
        <Card void>
          <SectionHead title="FAQ" />
          <div className="rowlist" style={{ marginTop: 4 }}>
            {D.faqs.map(function (f, i) {
              const open = faqOpen === i;
              return (
                <div key={i} style={{ borderBottom: i < D.faqs.length - 1 ? "1px solid var(--line-white-soft)" : "none" }}>
                  <div className="rowitem" style={{ cursor: "pointer", borderBottom: "none" }}
                    onClick={function () { setFaqOpen(open ? null : i); }}>
                    <div className="grow"><div className="ttl">{f.q}</div></div>
                    <Icon name={open ? "x" : "plus"} size={15} style={{ color: "var(--gold-base)" }} />
                  </div>
                  {open && <div className="muted" style={{ fontSize: 12.5, padding: "0 0 13px", lineHeight: 1.6 }}>{f.a}</div>}
                </div>
              );
            })}
          </div>
        </Card>

        <Btn variant="ghost" block onClick={function () { ctx.notify("Signed out — preview only"); props.onClose(); }}>
          Sign out
        </Btn>

        <div className="muted" style={{ fontSize: 10, textAlign: "center", lineHeight: 1.6, padding: "0 12px" }}>
          LONGRISE AI · Security Protocol V7.2 active<br />Static design preview — no live funds or trading.
        </div>
      </div>
    </div>
  );
}

window.MyPage = MyPage;
