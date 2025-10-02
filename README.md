# SLA Widget

**A lightweight, framework‑agnostic component to display the health status of
your services.** Works with vanilla JS, React, Next.js, or straight from a CDN.

---

## 🚀 Quick Start (Minimal Example)

### Web Component

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@chainlove/sla-widget/dist/vanilla.mjs"
></script>

<sla-widget service-ids="0x123...,0x456..." details="full"></sla-widget>
```

- [Live demo on CodePen](https://codepen.io/vasylkivt/pen/JooaYvy?editors=1000)
- [Live demo on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-kpquypxn?file=index.html)

---

## ✨ Features

- 🚀 Drop-in integration (Web Component or React)
- 🎨 4 themes: `light`, `dark`, `highContrast`, `auto`
- 🖼️ Flexible placement: `embedded` panel or `banner`
- 🔎 Detail levels: `full` or `problemsOnly`
- 🔄 Auto-refresh (configurable)
- 💬 Custom messages per health state
- ⚠️ Graceful degradation on API failure
- 🌍 CDN or npm / yarn / pnpm
- 📦 Tiny bundle size

---

## 📦 Installation

### Using npm

```bash
npm install @chainlove/sla-widget
# or
yarn add @chainlove/sla-widget
# or
pnpm add @chainlove/sla-widget
```

### Using CDN

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@chainlove/sla-widget/dist/vanilla.mjs"
></script>
```

---

## 🏃 Usage

### 1️⃣ Web Component

```html
<sla-widget
  service-ids="0x123...,0x456..."
  details="full"
  theme="auto"
  position="banner"
></sla-widget>
```

- [Live demo on CodePen](https://codepen.io/vasylkivt/pen/JooaYvy?editors=1000)
- [Live demo on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-kpquypxn?file=index.html)

---

### 2️⃣ React / Next.js

```tsx
import { SLAWidget } from '@chainlove/sla-widget/react';

<SLAWidget
  serviceIds={['0x123...', '0x456...']}
  details="full"
  theme="auto"
  position="banner"
/>;
```

- [Live demo on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-k65hwfih?file=app%2Fpage.tsx)

---

### 3️⃣ Core JS API (via CDN)

```html
<div id="sla-container"></div>

<script type="module">
  import { SLAWidget } from 'https://cdn.jsdelivr.net/npm/@chainlove/sla-widget/dist/core.mjs';

  const app = new SLAWidget({
    serviceIds: ['0x123...', '0x456...'],
    details: 'full',
    theme: 'auto',
    position: 'banner',
  });

  app.render(document.getElementById('sla-container'));
</script>
```

- [Live demo on CodePen](https://codepen.io/vasylkivt/pen/ZYYMGNd)
- [Live demo on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-d4a3bbnh?file=index.html)

---

## ⚙️ Widget Options (All Modes)

### `serviceIds` / `service-ids` (required)

#### Usage:

- **React / CoreJS:** `serviceIds` → `string[]`
- **Web Component (HTML):** `service-ids` → comma-separated `string`

#### Type:

- React/CoreJS → `string[]` Example: `['0x123...', '0x456...']`
- Web Component → comma-separated `string` Example: `"0x123...,0x456..."`

#### Description:

**List of Service IDs to display.**

🔊 You can dynamically update this list:

- **React:** by updating the `serviceIds` prop
- **Web Component:** by calling `element.setAttribute('service-ids', '...')`

---

### `statusEndpoint` / `status-endpoint`

#### Usage:

- **React / CoreJS:** `statusEndpoint` → `string`
- **Web Component (HTML):** `status-endpoint` → `string`

#### Default: `'API_URL'`

**API endpoint URL for fetching service status.**

---

### `refreshIntervalMs` / `refresh-interval-ms`

#### Usage:

- **React / CoreJS:** `refreshIntervalMs` → `number`
- **Web Component (HTML):** `refresh-interval-ms` → `number`

#### Default: `false` (disabled)

**How it works:**

- The widget fetches data from API endpoint (`statusEndpoint`).

**Behavior:**

- If you set `refreshIntervalMs = false` (default), the widget fetches data
  **once**, when the page loads.
- If you set `refreshIntervalMs` to a value (e.g. `5000` = 5 sec), the widget
  will update data at that interval

---

### `theme`

#### Usage:

- **React / CoreJS:** `theme` → `'light'` | `'dark'` | `'highContrast'` |
  `'auto'`
- **Web Component (HTML):** `theme` → same values

#### Default: `'auto'`

**Widget theme.** 🔊 Can be changed dynamically.

---

### `position`

#### Usage:

- **React / CoreJS:** `position` → `'banner'` | `'embedded'`
- **Web Component (HTML):** `position` → same values

#### Default: `'banner'`

**Widget position on the page:**

- `position="banner"` → widget is displayed as a **banner at the top** of the
  site.
- `position="embedded"` → widget is displayed as an inline block (you can place
  it anywhere in the page).

---

### `details`

#### Usage:

- **React / CoreJS:** `details` → `'full'` | `'problemsOnly'`
- **Web Component (HTML):** `details` → same values

#### Default: `'problemsOnly'`

**Controls when the widget is shown:**

- `details="full"` → widget is always visible.
- `details="problemsOnly"` → widget is shown **only** if one or more services in
  `service ids` have **Downtime** or **Latency**. It disappears if all services
  are in **Uptime**.

---

### `mode`

#### Usage:

- **React / CoreJS:** `mode` → `'simple'` | `'dev'`
- **Web Component (HTML):** `mode` → same values

#### Default: `'simple'`

**Controls the display mode of the widget:**

- `mode="simple"` → the widget shows a **compact banner** or embedded block:

  - If any service has **Downtime** (`error`) or **Latency** (`warning`), the
    banner displays a custom message (see `customMessages` / `custom-messages`
    option below).
  - If all service are healthy (`ok`), the banner may be hidden (if
    `details='problemsOnly'`) or show a neutral state (if `details='full'`).

  Example for customizing messages (for Web Component):

```html
custom-messages='{"warning":"⚠️ Check this","error":"🚨 Critical issue"}'
```

Example for customizing messages (for React):

```tsx
<SLAWidget
  ...
  customMessages={{
    warning: "⚠️ Check this",
    error: "🚨 Critical issue",
  }}
/>
```

- `mode="dev"` → the widget displays a **detailed panel** with:

  - full list of all service
  - current health status for each service
  - latency / downtime metrics
  - useful for debugging and monitoring purposes.

🔊 **Typical usage:**

- Use `'simple'` for production websites and user-facing pages.
- Use `'dev'` for internal dashboards, monitoring panels, or while testing.

---

### `pinned` (this only works for position="banner")

#### Usage:

- **React / CoreJS:** `pinned` → `'slide'` \| `'fixed'`
- **Web Component (HTML):** `pinned` → same values

#### Default: `'slide'`

**Widget pinning behavior:**

- `'slide'` → widget is placed at the top of the page, **inside the normal page
  flow**.  
  When the user scrolls down, the widget will scroll out of view (i.e. it moves
  with the page).
- `'fixed'` → widget is **pinned to the viewport** (CSS `position: fixed`) and
  remains always visible, even when the user scrolls the page.

👉 Use `'fixed'` if you want the widget to stay on screen at all times.  
Use `'slide'` for more lightweight appearance (standard banner behavior at top
of page).

---

### `customMessages` / `custom-messages`

#### Usage:

- **React / CoreJS:** `customMessages` → `{ [key in Health]?: string }`
- **Web Component (HTML):** `custom-messages` → JSON string

#### Default: `{}`

**Custom text to display for each health state.** 🔊 Works **only in
`mode="simple"`**.

You can override the default built-in labels with your own text or icons for:

- `UP` → when all services are healthy
- `LATENCY` → when one or more services have high latency
- `DOWN` → when one or more services are down
- `UNKNOWN` → when the status of one or more services is unknown

#### Possible keys of `Health`:

```typescript
export type Health = 'UP' | 'LATENCY' | 'DOWN' | 'UNKNOWN';
```

#### Example for Web Component:

```html
<sla-widget
  ...
  custom-messages='{"UP":"✅ All systems operational","LATENCY":"⚠️ Some delays","DOWN":"🚨 Outage detected","UNKNOWN":"❔ Status unknown"}'
></sla-widget>
```

#### Example for React:

```tsx
<SLAWidget
  ...
   customMessages={{
     UP: "✅ All systems operational",
     LATENCY: "⚠️ Some delays",
     DOWN: "🚨 Outage detected",
     UNKNOWN: "❔ Status unknown",
     }}
```

---

Additionally, when using the widget, you can **dynamically adjust settings**
(mode, details) by clicking the ⚙️ settings button inside the widget.

---

## ⚡️ Contributing

Feel free to open issues, submit pull requests, or suggest improvements!

---

## 📄 License

MIT
