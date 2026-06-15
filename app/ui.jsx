/* LONGRISE Mobile — shared UI primitives */
const { useState, useEffect, useRef, useContext, createContext } = React;

const AppCtx = createContext(null);

/* ---------- Icons (minimal stroke set) ---------- */
const LR_ICON_PATHS = {
  home: "M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5",
  invest: "M3 21h18M6 17l4-6 4 3 5-8M16 6h3v3",
  team: "M16 19v-1a4 4 0 00-8 0v1M12 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM20 19v-.8a3.5 3.5 0 00-2.5-3.3M16.8 4.3a3.5 3.5 0 010 6.5M4 19v-.8a3.5 3.5 0 012.5-3.3M7.2 4.3a3.5 3.5 0 000 6.5",
  market: "M7 3v4M7 13v8M5 7h4v6H5zM17 3v6M17 17v4M15 9h4v8h-4z",
  wallet: "M3 7a2 2 0 012-2h13a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 9h17M16 14h2",
  bell: "M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10.5 20a1.8 1.8 0 003 0",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM20 17v3h-3",
  shield: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z",
  chevR: "M9 5l7 7-7 7",
  chevL: "M15 5l-7 7 7 7",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  swap: "M7 4v13M3.5 7.5L7 4l3.5 3.5M17 20V7M13.5 16.5L17 20l3.5-3.5",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  plus: "M12 5v14M5 12h14",
  x: "M6 6l12 12M18 6L6 18",
  check: "M4.5 12.5l5 5 10-11",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 016 0v3",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 00-2-1.2L14.2 3h-4l-.4 2.7a7 7 0 00-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 005.4 12a7 7 0 00.1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 002 1.2l.4 2.7h4l.4-2.7a7 7 0 002-1.2l2.3 1 2-3.4-2-1.5a7 7 0 00.1-1.2z",
  support: "M12 21a9 9 0 10-9-9M12 17v.01M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1-1.5 2",
  news: "M4 5h13v14H6a2 2 0 01-2-2zM17 8h3v9a2 2 0 01-2 2M7 9h7M7 13h7",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6z",
  crown: "M3 17l1.5-9 4.5 4 3-6 3 6 4.5-4L21 17zM4 21h16",
  scan: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M4 12h16",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  info: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 7.5v.01",
  alert: "M12 3l9.5 16.5H2.5L12 3zM12 10v4M12 17.5v.01",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"
};

function Icon(props) {
  const size = props.size || 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={props.weight || 1.7}
      strokeLinecap="round" strokeLinejoin="round"
      style={props.style} aria-hidden="true">
      <path d={LR_ICON_PATHS[props.name] || ""}></path>
    </svg>
  );
}

/* ---------- Primitives ---------- */
function Eyebrow(props) {
  return <div className="eyebrow" style={props.style}>{props.children}</div>;
}

function Card(props) {
  return (
    <div className={"card" + (props.hero ? " hero" : "") + (props.void ? " void" : "")}
      style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

function Btn(props) {
  return (
    <button
      className={"btn " + (props.variant || "gold") + (props.block ? " block" : "") + (props.sm ? " sm" : "")}
      style={props.style} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

function Pill(props) {
  return (
    <span className={"pill" + (props.live ? " live" : "")} style={props.style}>
      {(props.dot || props.live) && <span className="dot" style={props.dotColor ? { background: props.dotColor } : null}></span>}
      {props.children}
    </span>
  );
}

function SegTabs(props) {
  return (
    <div className="seg">
      {props.options.map(function (o) {
        return (
          <button key={o} className={props.value === o ? "active" : ""}
            onClick={function () { props.onChange(o); }}>{o}</button>
        );
      })}
    </div>
  );
}

function SectionHead(props) {
  return (
    <div className="sec-head">
      <Eyebrow>{props.title}</Eyebrow>
      {props.action && <button className="more" onClick={props.onAction}>{props.action}</button>}
    </div>
  );
}

function Bar(props) {
  const pct = Math.max(0, Math.min(1, props.value)) * 100;
  return <div className="bar"><span style={{ width: pct + "%" }}></span></div>;
}

function Sparkline(props) {
  const w = props.width || 300, h = props.height || 54;
  const pts = props.points;
  const min = Math.min.apply(null, pts), max = Math.max.apply(null, pts);
  const span = (max - min) || 1;
  const step = w / (pts.length - 1);
  const coords = pts.map(function (p, i) {
    return [i * step, h - 6 - ((p - min) / span) * (h - 12)];
  });
  const line = coords.map(function (c) { return c[0].toFixed(1) + "," + c[1].toFixed(1); }).join(" ");
  const area = "0," + h + " " + line + " " + w + "," + h;
  return (
    <svg width="100%" height={h} viewBox={"0 0 " + w + " " + h} preserveAspectRatio="none" aria-hidden="true">
      <polygon points={area} fill="url(#lr-spark-fill)" opacity="0.5"></polygon>
      <polyline points={line} fill="none" stroke="var(--gold-glow)" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"></polyline>
      <defs>
        <linearGradient id="lr-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(251,191,36,0.28)"></stop>
          <stop offset="100%" stopColor="rgba(251,191,36,0)"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

function StatTile(props) {
  return (
    <div className="stat-tile">
      <div className="v num">{props.value}{props.unit && <span style={{ fontSize: 12, color: "var(--color-muted)", marginLeft: 3 }}>{props.unit}</span>}</div>
      <div className="k">{props.label}</div>
    </div>
  );
}

function RowItem(props) {
  return (
    <div className="rowitem" onClick={props.onClick} style={props.onClick ? { cursor: "pointer" } : null}>
      {props.lead}
      <div className="grow">
        <div className="ttl">{props.title}</div>
        {props.sub && <div className="sub">{props.sub}</div>}
      </div>
      {props.trail}
      {props.chev && <Icon name="chevR" size={16} style={{ color: "var(--color-muted)" }} />}
    </div>
  );
}

function LeadDisc(props) {
  return (
    <div style={{
      width: 38, height: 38, borderRadius: "50%", flex: "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "1px solid var(--line-white-soft)",
      background: "var(--surface-void)",
      color: props.color || "var(--gold-highlight)"
    }}>
      {props.children}
    </div>
  );
}

/* ---------- Bottom sheet ---------- */
function Sheet(props) {
  if (!props.open) return null;
  return (
    <div className="sheet-backdrop" onClick={function (e) { if (e.target === e.currentTarget) props.onClose(); }}>
      <div className="sheet">
        <div className="sheet-grab"></div>
        <div className="sheet-head">
          <div className="sheet-title">{props.title}</div>
          <button className="iconbtn" onClick={props.onClose} aria-label="Close" style={{ width: 36, height: 36 }}>
            <Icon name="x" size={18} />
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

/* ---------- Field ---------- */
function Field(props) {
  return (
    <div className="field">
      <label>{props.label}</label>
      <div className="input-wrap">
        <input className={"input" + (props.mono ? " mono" : "")}
          style={props.mono ? { fontFamily: "var(--font-mono)", fontSize: 13 } : null}
          type={props.type || "text"} inputMode={props.inputMode}
          placeholder={props.placeholder} value={props.value}
          onChange={function (e) { props.onChange(e.target.value); }} />
        {(props.suffix || props.onMax) && (
          <div className="input-suffix">
            {props.suffix && <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>{props.suffix}</span>}
            {props.onMax && <button className="maxbtn" onClick={props.onMax}>MAX</button>}
          </div>
        )}
      </div>
      {props.hint && <div className="muted" style={{ fontSize: 11.5 }}>{props.hint}</div>}
    </div>
  );
}

/* ---------- OTP input ---------- */
function OtpInput(props) {
  const refs = useRef([]);
  const vals = props.value;
  function setAt(i, ch) {
    const next = vals.slice();
    next[i] = ch;
    props.onChange(next);
    if (ch && i < 5 && refs.current[i + 1]) refs.current[i + 1].focus();
  }
  return (
    <div className="otp-row">
      {[0, 1, 2, 3, 4, 5].map(function (i) {
        return (
          <input key={i} className="otp-box" maxLength={1} inputMode="numeric"
            ref={function (el) { refs.current[i] = el; }}
            value={vals[i] || ""}
            onChange={function (e) { setAt(i, e.target.value.replace(/\D/g, "").slice(-1)); }}
            onKeyDown={function (e) {
              if (e.key === "Backspace" && !vals[i] && i > 0 && refs.current[i - 1]) refs.current[i - 1].focus();
            }} />
        );
      })}
    </div>
  );
}

/* ---------- Success state ---------- */
function SuccessBlock(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center", padding: "8px 0 4px" }}>
      <div className="success-orb"><Icon name="check" size={30} weight={2} /></div>
      <div className="display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{props.title}</div>
      <div className="muted" style={{ fontSize: 13, maxWidth: 280 }}>{props.children}</div>
    </div>
  );
}

/* ---------- KV row ---------- */
function KV(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "7px 0" }}>
      <span className="muted" style={{ fontSize: 12.5 }}>{props.k}</span>
      <span className={"num " + (props.cls || "")} style={{ fontSize: 13.5, fontWeight: 600, textAlign: "right" }}>{props.v}</span>
    </div>
  );
}

Object.assign(window, {
  AppCtx, Icon, Eyebrow, Card, Btn, Pill, SegTabs, SectionHead, Bar, Sparkline,
  StatTile, RowItem, LeadDisc, Sheet, Field, OtpInput, SuccessBlock, KV
});
