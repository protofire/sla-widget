# 🧭 SLA Widget

**A lightweight, framework‑agnostic component for surfacing the health & SLA
status of your subgraphs.** Works with vanilla JS, React, Next.js, or straight
from a CDN.

---

## ✨ Features

- 🚀 **Drop‑in integration** as a Web Component or a React component
- 🎨 **4‑way theming**: `light`, `dark`, `highContrast`, or automatic OS
  detection
- 🖼️ **Flexible placement** – render as an inline _embedded_ panel or as a
  page‑wide _banner_
- 🔎 **Detail control** – choose `full` metadata or `problemsOnly` for a
  succinct view
- 🧪 **`dev` & `simple` modes** for quick local hacking or production‑ready
  embedding
- 🔄 **Auto‑refresh** with a configurable interval
- 💬 **Custom messages** per health state (`ok`, `warning`, `error`, `unknown`)
- ⚠️ **Graceful degradation** if any subgraph API call fails
- 🌍 **CDN‑ready** or available via npm / yarn / pnpm
- 📦 **Tiny bundle** size

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
  src="https://cdn.jsdelivr.net/npm/@chainlove/sla-widget@latest/dist/vanilla.mjs"
></script>
```

---

## 🚀 Quick Start

### Vanilla JS (Web Component)

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@chainlove/sla-widget@latest/dist/vanilla.mjs"
></script>

<monitor-widget
  subgraph-ids="Qm123...,Qm456..."
  status-endpoint="https://api.example.com/status"
  refresh-interval-ms="10000"
  theme="auto"           <!-- "light" | "dark" | "highContrast" | "auto" -->
  position="banner"      <!-- "banner" | "embedded" -->
  details="full"         <!-- "full" | "problemsOnly" -->
  mode="simple"          <!-- "simple" | "dev" -->
  custom-messages='{"ok":"All good ✔","warning":"Heads‑up ⚠","error":"Outage ⛔"}'
></monitor-widget>
```

### Example

👉 **Live demo:**
[CodePen](https://codepen.io/vasylkivt/pen/JooaYvy?editors=1000)

### Attributes

| Attribute             | Type     | Required | Default        | Description                                                                                                                                                                |
| --------------------- | -------- | -------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subgraph-ids`        | `string` | ✅       | –              | Comma‑separated list of subgraph CIDs                                                                                                                                      |
| `status-endpoint`     | `string` | ❌       | `API_URL`      | API endpoint URL for fetching subgraph status                                                                                                                              |
| `refresh-interval-ms` | `number` | ❌       | `false`        | Refresh interval in milliseconds (default false). ⚠️ Note: the underlying data source updates roughly every 10 minutes, but you can set any interval you like in your app. |
| `theme`               | `string` | ❌       | `auto`         | `light`, `dark`, `highContrast`, or `auto`                                                                                                                                 |
| `position`            | `string` | ❌       | `banner`       | `banner` (full‑width) or `embedded` (inline block)                                                                                                                         |
| `details`             | `string` | ❌       | `problemsOnly` | `full` metadata panel or `problemsOnly` summary                                                                                                                            |
| `mode`                | `string` | ❌       | `simple`       | `simple` (prod) or `dev` (extra debug info)                                                                                                                                |
| `custom-messages`     | `string` | ❌       | –              | JSON string mapping health → custom text, e.g. `{ "ok":"✅", "error":"❌" }`                                                                                               |

---

### React / Next.js

```tsx
import { SLAWidget } from '@chainlove/sla-widget/react';

<SLAWidget
  subgraphIds={['Qm123...', 'Qm456...']}
  statusEndpoint="https://api.example.com/status"
  refreshIntervalMs={10000}
  theme="auto" // "light" | "dark" | "highContrast" | "auto"
  position="banner" // "banner" | "embedded"
  details="problemsOnly" // "full" | "problemsOnly"
  mode="simple" // "simple" | "dev"
  customMessages={{
    ok: 'Everything is green ✔',
    warning: 'Something looks off ⚠',
    error: 'Service degraded ⛔',
  }}
/>;
```

### Example

You can try out the widget live on
[StackBlitz](https://stackblitz.com/edit/stackblitz-starters-ngf4cda4?description=The%20React%20framework%20for%20production&file=package.json,app/layout.tsx,app/page.tsx&title=Next.js%20Starter).

### Props

| Prop                | Type                           | Required | Default        | Description                                   |
| ------------------- | ------------------------------ | -------- | -------------- | --------------------------------------------- |
| `subgraphIds`       | `string[]`                     | ✅       | –              | Array of subgraph CIDs                        |
| `statusEndpoint`    | `string`                       | ❌       | `API_URL`      | API endpoint URL for fetching subgraph status |
| `refreshIntervalMs` | `number`                       | ❌       | `false`        | Polling interval (ms)                         |
| `theme`             | `ThemeMode`                    | ❌       | `auto`         | `light` \| `dark` \| `highContrast` \| `auto` |
| `position`          | `Position`                     | ❌       | `banner`       | `banner` \| `embedded`                        |
| `details`           | `Details`                      | ❌       | `problemsOnly` | `full` \| `problemsOnly`                      |
| `mode`              | `Mode`                         | ❌       | `simple`       | `simple` \| `dev`                             |
| `customMessages`    | `{ [key in Health]?: string }` | ❌       | `{}`           | Override default texts per health state       |

---

### Core JS via CDN

```html
<div id="sla-container"></div>

<script type="module">
  import { WidgetApp } from 'https://cdn.jsdelivr.net/npm/@chainlove/sla-widget@latest/dist/core.mjs';

  const app = new WidgetApp({
    subgraphIds: ['Qm123...', 'Qm456...'],
    statusEndpoint: 'https://api.example.com/status',
    refreshIntervalMs: 10000,
    theme: 'auto', // "light" | "dark" | "highContrast" | "auto"
    position: 'embedded', // "banner" | "embedded"
    details: 'full', // "full" | "problemsOnly"
    mode: 'simple', // "simple" | "dev"
    customMessages: {
      warning: 'Heads‑up ⚠',
      error: 'Service interrupted ⛔',
    },
  });

  app.render(document.getElementById('sla-container'));
</script>
```

### Example

You can try out the widget live on
[CodePen](https://codepen.io/vasylkivt/pen/ZYYMGNd).

### Options

| Option              | Type                           | Required | Default        | Description                                   |
| ------------------- | ------------------------------ | -------- | -------------- | --------------------------------------------- |
| `subgraphIds`       | `string[]`                     | ✅       | –              | Array of subgraph CIDs                        |
| `statusEndpoint`    | `string`                       | ❌       | `API_URL`      | API endpoint URL for fetching subgraph status |
| `refreshIntervalMs` | `number`                       | ❌       | `false`        | Polling interval (ms)                         |
| `theme`             | `ThemeMode`                    | ❌       | `auto`         | `light` \| `dark` \| `highContrast` \| `auto` |
| `position`          | `Position`                     | ❌       | `banner`       | `banner` \| `embedded`                        |
| `details`           | `Details`                      | ❌       | `problemsOnly` | `full` \| `problemsOnly`                      |
| `mode`              | `Mode`                         | ❌       | `simple`       | `simple` \| `dev`                             |
| `customMessages`    | `{ [key in Health]?: string }` | ❌       | `{}`           | Override default texts per health state       |

---

## 🖌️ Theme Customisation

The widget ships with **three built‑in variants** plus an automatic mode:

| Variant        | Screenshot (light surface)                 |
| -------------- | ------------------------------------------ |
| `light`        | ☀️ light background, dark text             |
| `dark`         | 🌙 dark background, light text             |
| `highContrast` | 🖤 maximised contrast for accessibility    |
| `auto`         | Adapts to user’s OS `prefers‑color‑scheme` |

---

---

## ⚡️ Contributing

Feel free to open issues, submit pull requests, or suggest improvements!

---

## 📄 License

MIT
