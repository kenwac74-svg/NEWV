/* @ds-bundle: {"format":3,"namespace":"DesignSystem_f94d4a","components":[],"sourceHashes":{"AIHP-update/assets/js/main.js":"a1db7a74a0b1","assets/js/main.js":"406d53056db9","github-upload/assets/js/main.js":"406d53056db9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_f94d4a = window.DesignSystem_f94d4a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// AIHP-update/assets/js/main.js
try { (() => {
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('on');
  });
}, {
  threshold: .08
});
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* Mobile navigation toggle */
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  const setOpen = open => {
    links.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    setOpen(!links.classList.contains('open'));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) setOpen(false);
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
const platformUrl = 'https://kenwac74-svg.github.io/AIPK/';
const platformProductsUrl = 'https://kenwac74-svg.github.io/AIPK/#packages';
const wireLink = (selector, url) => {
  document.querySelectorAll(selector).forEach(el => {
    el.setAttribute('href', url);
    el.addEventListener('click', event => {
      event.preventDefault();
      window.location.href = url;
    });
  });
};
const footerLinkMap = {
  Terms: 'terms.html',
  'Privacy Policy': 'privacy-policy.html'
};
document.querySelectorAll('.footer a').forEach(link => {
  const target = footerLinkMap[link.textContent.trim()];
  if (target) link.setAttribute('href', target);
});
wireLink('.hero-actions .btn-primary', platformUrl);
wireLink('#access .btn-gold', platformUrl);
wireLink('#yield .product-cta-v83', platformProductsUrl);
const newsButton = document.querySelector('.hero-actions .btn-ghost');
if (newsButton) {
  newsButton.textContent = 'News & Update';
}
const style = document.createElement('style');
style.textContent = `
  .hero h1 span.gold{font-size:.7em!important;line-height:.92!important;letter-spacing:.01em!important;}
  .section-title h2 .gold,.section-title h2 .blue{font-size:.7em!important;line-height:.95!important;display:inline-block!important;}
`;
document.head.appendChild(style);
const board = document.querySelector('.winboard');
if (board) {
  const planSteps = [100, 200, 500, 1000, 5000];
  const names = ['Dragon_King_88', 'Golden_Whale', 'K-Capital_M', 'Ruby_Quant_7', 'BlueVault_AI', 'Neon_Baccarat', 'CNYT_Rider', 'Alpha_Wheel', 'FutureAce_10', 'VIP_Crown_X'];
  const now = Date.now();
  const stored = JSON.parse(localStorage.getItem('longriseLiveProfitDemo') || 'null');
  const state = stored && Array.isArray(stored.players) ? stored : {
    createdAt: now,
    lastWalletAt: now,
    walletBase: 1245852,
    walletRate: 10 + Math.floor(Math.random() * 11),
    lastPurchaseAt: now,
    nextPurchaseDelay: 60000 + Math.floor(Math.random() * 60000),
    players: names.map((name, index) => ({
      name,
      amount: [54200, 42150, 38900, 34800, 31500, 27900, 24300, 21100, 18400, 15100][index] + index % 5 * 50
    }))
  };
  let offset = 0;
  const save = () => localStorage.setItem('longriseLiveProfitDemo', JSON.stringify(state));
  const formatMoney = value => '$' + Math.round(value).toLocaleString('en-US') + '.' + String(Math.floor(value * 100) % 100).padStart(2, '0');
  const walletCount = () => {
    const elapsedHours = (Date.now() - state.createdAt) / 3600000;
    return state.walletBase + Math.floor(elapsedHours * state.walletRate);
  };
  const addPurchase = () => {
    const target = state.players[Math.floor(Math.random() * state.players.length)];
    target.amount += planSteps[Math.floor(Math.random() * planSteps.length)];
    state.players.sort((a, b) => b.amount - a.amount);
    state.lastPurchaseAt = Date.now();
    state.nextPurchaseDelay = 60000 + Math.floor(Math.random() * 60000);
    save();
  };
  const maybePurchase = () => {
    if (Date.now() - state.lastPurchaseAt >= state.nextPurchaseDelay) {
      addPurchase();
    }
  };
  const visibleRows = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) rows.push((offset + i) % state.players.length);
    return rows;
  };
  const render = () => {
    maybePurchase();
    const rows = visibleRows().map(playerIndex => {
      const player = state.players[playerIndex];
      return `<div class="row"><span class="rank">${String(playerIndex + 1).padStart(2, '0')}</span><div><span class="game">${player.name}</span><span class="sub">Live Profits</span></div><span class="gain">${formatMoney(player.amount)}</span></div>`;
    }).join('');
    board.innerHTML = `<div class="board-head"><b>Live Profits</b><span class="live">● LIVE</span></div>${rows}<div style="margin-top:16px;color:#fbbf24;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.18em">${walletCount().toLocaleString('en-US')} Wallets · Profit Hub</div>`;
    offset = (offset + 1) % state.players.length;
  };
  render();
  setInterval(render, 3500);
  setInterval(() => {
    save();
    render();
  }, 30000);
}

/* Live engine tablets — casino edges + quant terminal tick (mock, no DB) */
(function () {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const flash = el => {
    el.classList.remove('vflash');
    void el.offsetWidth;
    el.classList.add('vflash');
  };

  // Casino "Live Tables" — fluctuating house edge per table
  const edges = [...document.querySelectorAll('.casino-viz .viz-row b.pos')];
  const edgeBase = [3.2, 2.7, 4.1];
  const tickEdges = () => edges.forEach((el, i) => {
    const v = Math.max(0.9, edgeBase[i] + rnd(-0.6, 0.7));
    el.textContent = 'edge +' + v.toFixed(1) + '%';
    flash(el);
  });

  // Quant terminal — fluctuating latency / PnL / sharpe
  const qv = document.querySelector('.quant-viz');
  const q = k => qv && qv.querySelector('[data-q="' + k + '"]');
  const setPnl = (el, lo, hi) => {
    if (!el) return;
    const v = rnd(lo, hi);
    el.textContent = (v >= 0 ? '+' : '') + v.toFixed(2) + '%';
    el.className = v >= 0 ? 't-green' : 't-red';
    flash(el);
  };
  const tickQuant = () => {
    const lat = q('lat');
    if (lat) {
      lat.textContent = rnd(0.18, 0.52).toFixed(2) + ' ms';
      flash(lat);
    }
    setPnl(q('btc'), -0.30, 1.15);
    setPnl(q('eth'), -0.18, 0.78);
    const sh = q('sharpe');
    if (sh) {
      sh.textContent = rnd(1.8, 2.5).toFixed(1);
      flash(sh);
    }
  };
  if (edges.length) {
    tickEdges();
    setInterval(tickEdges, 2600);
  }
  if (qv) {
    tickQuant();
    setInterval(tickQuant, 1500);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "AIHP-update/assets/js/main.js", error: String((e && e.message) || e) }); }

// assets/js/main.js
try { (() => {
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('on');
  });
}, {
  threshold: .08
});
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* Mobile navigation toggle */
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  const setOpen = open => {
    links.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    setOpen(!links.classList.contains('open'));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) setOpen(false);
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
const platformUrl = 'https://kenwac74-svg.github.io/AIPK/';
const platformProductsUrl = 'https://kenwac74-svg.github.io/AIPK/#packages';
const wireLink = (selector, url) => {
  document.querySelectorAll(selector).forEach(el => {
    el.setAttribute('href', url);
    el.addEventListener('click', event => {
      event.preventDefault();
      window.location.href = url;
    });
  });
};
const footerLinkMap = {
  Terms: 'terms.html',
  'Privacy Policy': 'privacy-policy.html'
};
document.querySelectorAll('.footer a').forEach(link => {
  const target = footerLinkMap[link.textContent.trim()];
  if (target) link.setAttribute('href', target);
});
wireLink('.hero-actions .btn-primary', platformUrl);
wireLink('#access .btn-gold', platformUrl);
wireLink('#yield .product-cta-v83', platformProductsUrl);
const newsButton = document.querySelector('.hero-actions .btn-ghost');
if (newsButton) {
  newsButton.textContent = 'News & Update';
}
const style = document.createElement('style');
style.textContent = `
  .hero h1 span.gold{font-size:.7em!important;line-height:.92!important;letter-spacing:.01em!important;}
  .section-title h2 .gold,.section-title h2 .blue{font-size:.7em!important;line-height:.95!important;display:inline-block!important;}
`;
document.head.appendChild(style);
const board = document.querySelector('.winboard');
if (board) {
  const planSteps = [100, 200, 500, 1000, 5000];
  const names = ['Dragon_King_88', 'Golden_Whale', 'K-Capital_M', 'Ruby_Quant_7', 'BlueVault_AI', 'Neon_Baccarat', 'CNYT_Rider', 'Alpha_Wheel', 'FutureAce_10', 'VIP_Crown_X'];
  const now = Date.now();
  const stored = JSON.parse(localStorage.getItem('longriseTotalValueDemo') || 'null');
  const state = stored && Array.isArray(stored.players) ? stored : {
    createdAt: now,
    lastWalletAt: now,
    walletBase: 1245852,
    walletRate: 10 + Math.floor(Math.random() * 11),
    lastPurchaseAt: now,
    nextPurchaseDelay: 60000 + Math.floor(Math.random() * 60000),
    players: names.map((name, index) => ({
      name,
      amount: [250400, 227150, 201900, 187400, 164800, 142300, 118650, 96400, 84200, 71500][index] + index % 5 * 50
    }))
  };
  let offset = 0;
  const save = () => localStorage.setItem('longriseTotalValueDemo', JSON.stringify(state));
  const formatMoney = value => '$' + Math.round(value).toLocaleString('en-US') + '.' + String(Math.floor(value * 100) % 100).padStart(2, '0');
  const walletCount = () => {
    const elapsedHours = (Date.now() - state.createdAt) / 3600000;
    return state.walletBase + Math.floor(elapsedHours * state.walletRate);
  };
  const addPurchase = () => {
    const target = state.players[Math.floor(Math.random() * state.players.length)];
    target.amount += planSteps[Math.floor(Math.random() * planSteps.length)];
    state.players.sort((a, b) => b.amount - a.amount);
    state.lastPurchaseAt = Date.now();
    state.nextPurchaseDelay = 60000 + Math.floor(Math.random() * 60000);
    save();
  };
  const maybePurchase = () => {
    if (Date.now() - state.lastPurchaseAt >= state.nextPurchaseDelay) {
      addPurchase();
    }
  };
  const visibleRows = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) rows.push((offset + i) % state.players.length);
    return rows;
  };
  const render = () => {
    maybePurchase();
    const rows = visibleRows().map(playerIndex => {
      const player = state.players[playerIndex];
      return `<div class="row"><span class="rank">${String(playerIndex + 1).padStart(2, '0')}</span><div><span class="game">${player.name}</span></div><span class="gain">${formatMoney(player.amount)}</span></div>`;
    }).join('');
    board.innerHTML = `<div class="board-head"><b>Total Value</b><span class="live">● LIVE</span></div>${rows}<div style="margin-top:16px;color:#fbbf24;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.18em">${walletCount().toLocaleString('en-US')} Wallets · Profit Hub</div>`;
    offset = (offset + 1) % state.players.length;
  };
  render();
  setInterval(render, 3500);
  setInterval(() => {
    save();
    render();
  }, 30000);
}

/* Live engine tablets — casino edges + quant terminal tick (mock, no DB) */
(function () {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const flash = el => {
    el.classList.remove('vflash');
    void el.offsetWidth;
    el.classList.add('vflash');
  };

  // Casino "Live Tables" — fluctuating house edge per table
  const edges = [...document.querySelectorAll('.casino-viz .viz-row b.pos')];
  const edgeBase = [3.2, 2.7, 4.1];
  const tickEdges = () => edges.forEach((el, i) => {
    const v = Math.max(0.9, edgeBase[i] + rnd(-0.6, 0.7));
    el.textContent = 'edge +' + v.toFixed(1) + '%';
    flash(el);
  });

  // Quant terminal — fluctuating latency / PnL / sharpe
  const qv = document.querySelector('.quant-viz');
  const q = k => qv && qv.querySelector('[data-q="' + k + '"]');
  const setPnl = (el, lo, hi) => {
    if (!el) return;
    const v = rnd(lo, hi);
    el.textContent = (v >= 0 ? '+' : '') + v.toFixed(2) + '%';
    el.className = v >= 0 ? 't-green' : 't-red';
    flash(el);
  };
  const tickQuant = () => {
    const lat = q('lat');
    if (lat) {
      lat.textContent = rnd(0.18, 0.52).toFixed(2) + ' ms';
      flash(lat);
    }
    setPnl(q('btc'), -0.30, 1.15);
    setPnl(q('eth'), -0.18, 0.78);
    const sh = q('sharpe');
    if (sh) {
      sh.textContent = rnd(1.8, 2.5).toFixed(1);
      flash(sh);
    }
  };
  if (edges.length) {
    tickEdges();
    setInterval(tickEdges, 2600);
  }
  if (qv) {
    tickQuant();
    setInterval(tickQuant, 1500);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/js/main.js", error: String((e && e.message) || e) }); }

// github-upload/assets/js/main.js
try { (() => {
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('on');
  });
}, {
  threshold: .08
});
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* Mobile navigation toggle */
(function () {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  const setOpen = open => {
    links.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    setOpen(!links.classList.contains('open'));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) setOpen(false);
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
const platformUrl = 'https://kenwac74-svg.github.io/AIPK/';
const platformProductsUrl = 'https://kenwac74-svg.github.io/AIPK/#packages';
const wireLink = (selector, url) => {
  document.querySelectorAll(selector).forEach(el => {
    el.setAttribute('href', url);
    el.addEventListener('click', event => {
      event.preventDefault();
      window.location.href = url;
    });
  });
};
const footerLinkMap = {
  Terms: 'terms.html',
  'Privacy Policy': 'privacy-policy.html'
};
document.querySelectorAll('.footer a').forEach(link => {
  const target = footerLinkMap[link.textContent.trim()];
  if (target) link.setAttribute('href', target);
});
wireLink('.hero-actions .btn-primary', platformUrl);
wireLink('#access .btn-gold', platformUrl);
wireLink('#yield .product-cta-v83', platformProductsUrl);
const newsButton = document.querySelector('.hero-actions .btn-ghost');
if (newsButton) {
  newsButton.textContent = 'News & Update';
}
const style = document.createElement('style');
style.textContent = `
  .hero h1 span.gold{font-size:.7em!important;line-height:.92!important;letter-spacing:.01em!important;}
  .section-title h2 .gold,.section-title h2 .blue{font-size:.7em!important;line-height:.95!important;display:inline-block!important;}
`;
document.head.appendChild(style);
const board = document.querySelector('.winboard');
if (board) {
  const planSteps = [100, 200, 500, 1000, 5000];
  const names = ['Dragon_King_88', 'Golden_Whale', 'K-Capital_M', 'Ruby_Quant_7', 'BlueVault_AI', 'Neon_Baccarat', 'CNYT_Rider', 'Alpha_Wheel', 'FutureAce_10', 'VIP_Crown_X'];
  const now = Date.now();
  const stored = JSON.parse(localStorage.getItem('longriseTotalValueDemo') || 'null');
  const state = stored && Array.isArray(stored.players) ? stored : {
    createdAt: now,
    lastWalletAt: now,
    walletBase: 1245852,
    walletRate: 10 + Math.floor(Math.random() * 11),
    lastPurchaseAt: now,
    nextPurchaseDelay: 60000 + Math.floor(Math.random() * 60000),
    players: names.map((name, index) => ({
      name,
      amount: [250400, 227150, 201900, 187400, 164800, 142300, 118650, 96400, 84200, 71500][index] + index % 5 * 50
    }))
  };
  let offset = 0;
  const save = () => localStorage.setItem('longriseTotalValueDemo', JSON.stringify(state));
  const formatMoney = value => '$' + Math.round(value).toLocaleString('en-US') + '.' + String(Math.floor(value * 100) % 100).padStart(2, '0');
  const walletCount = () => {
    const elapsedHours = (Date.now() - state.createdAt) / 3600000;
    return state.walletBase + Math.floor(elapsedHours * state.walletRate);
  };
  const addPurchase = () => {
    const target = state.players[Math.floor(Math.random() * state.players.length)];
    target.amount += planSteps[Math.floor(Math.random() * planSteps.length)];
    state.players.sort((a, b) => b.amount - a.amount);
    state.lastPurchaseAt = Date.now();
    state.nextPurchaseDelay = 60000 + Math.floor(Math.random() * 60000);
    save();
  };
  const maybePurchase = () => {
    if (Date.now() - state.lastPurchaseAt >= state.nextPurchaseDelay) {
      addPurchase();
    }
  };
  const visibleRows = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) rows.push((offset + i) % state.players.length);
    return rows;
  };
  const render = () => {
    maybePurchase();
    const rows = visibleRows().map(playerIndex => {
      const player = state.players[playerIndex];
      return `<div class="row"><span class="rank">${String(playerIndex + 1).padStart(2, '0')}</span><div><span class="game">${player.name}</span></div><span class="gain">${formatMoney(player.amount)}</span></div>`;
    }).join('');
    board.innerHTML = `<div class="board-head"><b>Total Value</b><span class="live">● LIVE</span></div>${rows}<div style="margin-top:16px;color:#fbbf24;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.18em">${walletCount().toLocaleString('en-US')} Wallets · Profit Hub</div>`;
    offset = (offset + 1) % state.players.length;
  };
  render();
  setInterval(render, 3500);
  setInterval(() => {
    save();
    render();
  }, 30000);
}

/* Live engine tablets — casino edges + quant terminal tick (mock, no DB) */
(function () {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const flash = el => {
    el.classList.remove('vflash');
    void el.offsetWidth;
    el.classList.add('vflash');
  };

  // Casino "Live Tables" — fluctuating house edge per table
  const edges = [...document.querySelectorAll('.casino-viz .viz-row b.pos')];
  const edgeBase = [3.2, 2.7, 4.1];
  const tickEdges = () => edges.forEach((el, i) => {
    const v = Math.max(0.9, edgeBase[i] + rnd(-0.6, 0.7));
    el.textContent = 'edge +' + v.toFixed(1) + '%';
    flash(el);
  });

  // Quant terminal — fluctuating latency / PnL / sharpe
  const qv = document.querySelector('.quant-viz');
  const q = k => qv && qv.querySelector('[data-q="' + k + '"]');
  const setPnl = (el, lo, hi) => {
    if (!el) return;
    const v = rnd(lo, hi);
    el.textContent = (v >= 0 ? '+' : '') + v.toFixed(2) + '%';
    el.className = v >= 0 ? 't-green' : 't-red';
    flash(el);
  };
  const tickQuant = () => {
    const lat = q('lat');
    if (lat) {
      lat.textContent = rnd(0.18, 0.52).toFixed(2) + ' ms';
      flash(lat);
    }
    setPnl(q('btc'), -0.30, 1.15);
    setPnl(q('eth'), -0.18, 0.78);
    const sh = q('sharpe');
    if (sh) {
      sh.textContent = rnd(1.8, 2.5).toFixed(1);
      flash(sh);
    }
  };
  if (edges.length) {
    tickEdges();
    setInterval(tickEdges, 2600);
  }
  if (qv) {
    tickQuant();
    setInterval(tickQuant, 1500);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "github-upload/assets/js/main.js", error: String((e && e.message) || e) }); }

})();
