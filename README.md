# 🧭 Monitor Widget

**A lightweight component for monitoring subgraph statuses.** Supports vanilla
JS, React, Next.js, and CDN integration.

---

## ✨ Features

- 🚀 **Easy integration** with Web Components, React, or plain JS
- 🎨 **Supports** `light`, `dark`, and `auto` themes
- 🔄 **Automatic refreshing** of subgraph statuses
- ⚠️ **Robust error handling** for partial or failed responses
- 🌍 **CDN-ready** or available via npm
- 📦 **Minimal bundle size**

---

## 📦 Installation

### Using npm

```bash
npm install monitor-widget
# or
yarn add monitor-widget
```

### Using CDN

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/monitor-widget@latest/dist/vanilla.mjs"
></script>
```

---

## 🚀 Quick Start

### Vanilla JS (Web Component)

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/monitor-widget@latest/dist/vanilla.mjs"
></script>

<monitor-widget
  subgraph-ids="Qm123...,Qm456..."
  status-endpoint="http://localhost:3000/status"
  refresh-interval-ms="10000"
  theme="auto"
></monitor-widget>
```

### Attributes

| Attribute             | Type     | Required | Description                                                                                                                                                                |
| --------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subgraph-ids`        | `string` | ✅       | Comma-separated list of subgraph IDs                                                                                                                                       |
| `status-endpoint`     | `string` | ✅       | API endpoint URL for fetching subgraph status                                                                                                                              |
| `refresh-interval-ms` | `number` | ❌       | Refresh interval in milliseconds (default 30000). ⚠️ Note: the underlying data source updates roughly every 10 minutes, but you can set any interval you like in your app. |
| `theme`               | `string` | ❌       | Theme mode: `light`, `dark`, or `auto` (default)                                                                                                                           |

---

### React / Next.js

```tsx
import { MonitorWidget } from 'monitor-widget/react';

<MonitorWidget
  subgraphIds={['Qm123...', 'Qm456...']}
  statusEndpoint="http://localhost:3000/status"
  refreshIntervalMs={10000}
  theme="auto" // "light" | "dark"
/>;
```

### Props

| Prop                | Type       | Required | Description                                                                                                                                                                |
| ------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subgraphIds`       | `string[]` | ✅       | Array of subgraph IDs                                                                                                                                                      |
| `statusEndpoint`    | `string`   | ✅       | API endpoint URL for fetching subgraph status                                                                                                                              |
| `refreshIntervalMs` | `number`   | ❌       | Refresh interval in milliseconds (default: 30000).⚠️ Note: the underlying data source updates roughly every 10 minutes, but you can set any interval you like in your app. |
| `theme`             | `string`   | ❌       | Theme mode: `light`, `dark`, or `auto` (default)                                                                                                                           |

---

### Core JS via CDN

```html
<div id="monitor-container"></div>

<script type="module">
  import { WidgetApp } from 'https://cdn.jsdelivr.net/npm/monitor-widget@latest/dist/core.mjs';

  const app = new WidgetApp({
    subgraphIds: ['Qm123...', 'Qm456...'],
    statusEndpoint: 'http://localhost:3000/status',
    refreshIntervalMs: 10000,
    theme: 'auto', // "light" | "dark"
  });

  app.render(document.getElementById('monitor-container'));
</script>
```

### Options

| Option              | Type       | Required | Description                                                                                                                                                    |
| ------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subgraphIds`       | `string[]` | ✅       | Array of subgraph IDs                                                                                                                                          |
| `statusEndpoint`    | `string`   | ✅       | API endpoint URL for fetching subgraph status                                                                                                                  |
| `refreshIntervalMs` | `number`   | ❌       | Refresh interval (default: 30000 ms). ⚠️ Note: the underlying data source updates roughly every 10 minutes, but you can set any interval you like in your app. |
| `theme`             | `string`   | ❌       | Theme mode: `light`, `dark`, or `auto` (default)                                                                                                               |

---

## 🖌️ Theme Customization

The widget supports the following themes:

- 🌙 **Dark mode**
- ☀️ **Light mode**
- ⚙️ **Auto mode** (based on user's OS preference)

Customize further by overriding CSS variables or adding your own styles.

---

## ⚡️ Contributing

Feel free to open issues, submit pull requests, or suggest improvements!

---

## 📄 License

MIT
