/* LONGRISE — shared UI primitives + icons */
const { useState, useEffect, useRef, useContext, createContext } = React;
const Ctx = createContext(null);

const ICONS = {
  home: "M3 11l9-8 9 8M5 9.5V21h6v-6h2v6h6V9.5",
  package: "M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8",
  rewards: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z",
  wallet: "M3 8a2 2 0 012-2h13a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 10h17M16 14h2",
  bell: "M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10.5 20a1.8 1.8 0 003 0",
  deposit: "M12 4v11M7 11l5 5 5-5M5 20h14",
  withdraw: "M12 20V9M7 13l5-5 5 5M5 4h14",
  send: "M22 3L11 14M22 3l-7 19-4-8-8-4z",
  swap: "M7 4v13M3.5 7.5L7 4l3.5 3.5M17 20V7M13.5 16.5L17 20l3.5-3.5",
  earnings: "M3 21h18M6 17l4-6 4 3 5-8M16 6h3v3",
  referral: "M16 19v-1a4 4 0 00-8 0v1M12 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 19v-.8a3.5 3.5 0 00-2.6-3.3M16.8 4.4a3.5 3.5 0 010 6.4",
  news: "M4 5h13v14H6a2 2 0 01-2-2zM17 8h3v9a2 2 0 01-2 2M7 9h7M7 13h7",
  market: "M7 3v4M7 13v8M5 7h4v6H5zM17 3v6M17 17v4M15 9h4v8h-4z",
  crown: "M3 17l1.5-9 4.5 4 3-6 3 6 4.5-4L21 17zM4 21h16",
  shield: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z",
  chevR: "M9 5l7 7-7 7",
  chevL: "M15 5l-7 7 7 7",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  x: "M6 6l12 12M18 6L6 18",
  check: "M4.5 12.5l5 5 10-11",
  plus: "M12 5v14M5 12h14",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 016 0v3",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 13a7.7 7.7 0 000-2l2-1.5-2-3.4-2.3 1a7 7 0 00-1.7-1l-.4-2.6h-4l-.4 2.6a7 7 0 00-1.7 1l-2.3-1-2 3.4 2 1.5a7.7 7.7 0 000 2l-2 1.5 2 3.4 2.3-1a7 7 0 001.7 1l.4 2.6h4l.4-2.6a7 7 0 001.7-1l2.3 1 2-3.4z",
  support: "M12 21a9 9 0 10-9-9M12 17v.01M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1-1.5 2",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  menu: "M4 7h16M4 12h16M4 17h16",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM20 17v3h-3",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6z",
  tree: "M12 4a2 2 0 100 4 2 2 0 000-4zM6 16a2 2 0 100 4 2 2 0 000-4zM18 16a2 2 0 100 4 2 2 0 000-4zM12 8v4M12 12H6v2M12 12h6v2",
  star: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"
};

function Icon(p) {
  const sz = p.size || 22;
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={p.weight || 1.8} strokeLinecap="round" strokeLinejoin="round" style={p.style} aria-hidden="true">
      <path d={ICONS[p.name] || ""}></path>
    </svg>
  );
}

function Eyebrow(p) { return <div className="eyebrow" style={p.style}>{p.children}</div>; }
function Card(p) {
  const cls = "card" + (p.hero ? " hero" : "") + (p.void ? " void" : "") + (p.className ? " " + p.className : "");
  return <div className={cls} style={p.style} onClick={p.onClick}>{p.children}</div>;
}
function Btn(p) {
  return <button className={"btn " + (p.variant || "gold") + (p.block ? " block" : "") + (p.sm ? " sm" : "")} style={p.style} onClick={p.onClick} disabled={p.disabled}>{p.children}</button>;
}
function Pill(p) {
  return <span className={"pill" + (p.live ? " live" : "") + (p.solid ? " gold-solid" : "")} style={p.style}>{(p.dot || p.live) && <span className="dot"></span>}{p.children}</span>;
}
function Seg(p) {
  return <div className="seg">{p.options.map(o => <button key={o} className={p.value === o ? "on" : ""} onClick={() => p.onChange(o)}>{o}</button>)}</div>;
}
function SecHead(p) {
  return <div className="sec"><Eyebrow>{p.title}</Eyebrow>{p.action && <button className="more" onClick={p.onAction}>{p.action}</button>}</div>;
}
function Bar(p) { return <div className="bar"><span style={{ width: Math.max(0, Math.min(1, p.value)) * 100 + "%" }}></span></div>; }
function Stat(p) {
  return <div className="stat"><div className="v num">{p.value}{p.unit && <small>{p.unit}</small>}</div><div className="k">{p.label}</div></div>;
}
function Row(p) {
  return (
    <div className="row" onClick={p.onClick} style={p.onClick ? { cursor: "pointer" } : null}>
      {p.lead}
      <div className="grow"><div className="t">{p.title}</div>{p.sub && <div className="s">{p.sub}</div>}</div>
      {p.trail}
      {p.chev && <Icon name="chevR" size={18} style={{ color: "var(--text-secondary)" }} />}
    </div>
  );
}
function Disc(p) { return <div className="disc" style={p.color ? { color: p.color } : null}>{p.children}</div>; }

function Sheet(p) {
  if (!p.open) return null;
  return (
    <div className="sheet-back" onClick={e => { if (e.target === e.currentTarget) p.onClose(); }}>
      <div className="sheet">
        <div className="grab"></div>
        <div className="sh"><div className="st">{p.title}</div><button className="iconbtn" style={{ width: 40, height: 40 }} onClick={p.onClose} aria-label="Close"><Icon name="x" size={20} /></button></div>
        {p.children}
      </div>
    </div>
  );
}
function Field(p) {
  return (
    <div className="field">
      <label>{p.label}</label>
      <div className="inwrap">
        <input className="input" type={p.type || "text"} inputMode={p.inputMode} placeholder={p.placeholder}
          value={p.value} onChange={e => p.onChange(e.target.value)}
          style={p.mono ? { fontFamily: "var(--font-mono)", fontSize: 15 } : null} />
        {(p.suffix || p.onMax) && <div className="insuffix">{p.suffix && <span className="muted" style={{ fontSize: 14, fontWeight: 700 }}>{p.suffix}</span>}{p.onMax && <button className="maxbtn" onClick={p.onMax}>MAX</button>}</div>}
      </div>
      {p.hint && <div className="muted" style={{ fontSize: 13 }}>{p.hint}</div>}
    </div>
  );
}
function KV(p) { return <div className="kv"><span className="k">{p.k}</span><span className={"v " + (p.cls || "")}>{p.v}</span></div>; }
function Otp(p) {
  const refs = useRef([]);
  function setAt(i, ch) { const n = p.value.slice(); n[i] = ch; p.onChange(n); if (ch && i < 5 && refs.current[i + 1]) refs.current[i + 1].focus(); }
  return (
    <div className="otp">
      {[0, 1, 2, 3, 4, 5].map(i => (
        <input key={i} maxLength={1} inputMode="numeric" ref={el => refs.current[i] = el} value={p.value[i] || ""}
          onChange={e => setAt(i, e.target.value.replace(/\D/g, "").slice(-1))}
          onKeyDown={e => { if (e.key === "Backspace" && !p.value[i] && i > 0 && refs.current[i - 1]) refs.current[i - 1].focus(); }} />
      ))}
    </div>
  );
}
function Success(p) {
  return <div className="success"><div className="orb"><Icon name="check" size={34} weight={2.2} /></div><div className="t">{p.title}</div><div className="muted" style={{ fontSize: 15, maxWidth: 300 }}>{p.children}</div></div>;
}

Object.assign(window, { Ctx, Icon, Eyebrow, Card, Btn, Pill, Seg, SecHead, Bar, Stat, Row, Disc, Sheet, Field, KV, Otp, Success });
