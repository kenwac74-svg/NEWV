# LONGRISE — Static Site (PC + Mobile)

Static, backend-free build suitable for GitHub Pages or any static host.
All pages use design tokens/components from the bound LRHP design system in `_ds/`.

## Entry points

| View | File | Notes |
|------|------|-------|
| **Original homepage** | `index.html` | Built Vite app (static preview). `wallet-preview.html` is the same entry. |
| **PC renewal prototype** | `LONGRISE.html` | Desktop app shell → loads `lr/`. *(Phase-2 spec updates pending — see below.)* |
| **Mobile renewal prototype** | `LONGRISE Mobile.html` | Mobile app shell → loads `app/`. Reflects the latest spec changes. |
| **Earning Dashboard (PC mock)** | `Earning Dashboard.html` | Standalone PC dashboard page. |
| **Start Here** | `START HERE.html` | New-user onboarding page (linked from the home banner). |
| **Menu Flow Map** | `Menu Flow Map.html` | MOT navigation plan (PC + mobile, toggle). |
| **Glossary / 용어집** | `Glossary.html` | Interim old→new term mapping for developers. |

## Folder structure

```
index.html, wallet-preview.html   original built homepage
assets/                           JS/CSS for the built homepage
LONGRISE.html        + lr/        PC renewal prototype (React via in-browser Babel)
LONGRISE Mobile.html + app/       Mobile renewal prototype
Earning Dashboard.html            PC dashboard page
START HERE.html                   onboarding page
Glossary.html, Menu Flow Map.html docs
_ds/                              LRHP design system (tokens, styles, bundle)
brand/                            logo / icon assets
```

## Latest changes reflected (Mobile)

- **Login overlays**: every-login consent gate (Risk Notice + Terms, each agreed
  separately, plain scrollable text) → optional important-notice popup → Start Here
  nudge for new / no-purchase users.
- **Bottom navigation**: `Plans · Network · Earn · Wallet · All` (default = **Earn**).
  No sidebar/drawer — the **All (전체)** tab is a full hotlink hub.
- **Earn (dashboard)**: Deposit/Withdraw/Send/Swap removed (handled in Wallet);
  shows held packages (profit + rate) + a single **Get more Profit** → Plans.
- **Start Here**: a top banner on the home (Earn) screen, not a fixed menu.
- **Market**: hidden from the bottom nav initially; shown as "Soon" in All.

> **Terminology**: interim labels. Internal route keys / component names are unchanged
> to avoid dev churn — see `Glossary.html` for the full mapping.

## Pending (PC, phase 2 — not yet applied)

The PC view (`LONGRISE.html` / `lr/`, `Earning Dashboard.html`) still needs the same
spec applied: login popup, Earn-action cleanup, Start Here top banner, and the
**Sitemap** page (footer + the submenu above Sign out).

## Notes

- The renewal prototypes load React + Babel from a CDN, so an internet connection is
  required when serving them. The built homepage (`index.html`) is fully local.
- No live funds, accounts, or trading — static design preview only.
