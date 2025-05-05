# Monitor Widget

**A lightweight web component and React component for monitoring subgraph
statuses.**  
Supports vanilla JS, React, Next.js, and CDN usage.

---

## ✨ Features

- 🚀 Easily embeddable via Web Components or React.
- 🎨 Supports light/dark/auto themes.
- 🔄 Auto-refreshing subgraph statuses.
- 🔥 Minimal bundle size.
- 🌍 CDN-ready or installable via npm.

---

## 📦 Installation

### npm

```bash
npm install monitor-widget
```

or

```bash
yarn add monitor-widget
```

CDN (unpkg or jsDelivr)

```bash
<script type="module" src="https://cdn.jsdelivr.net/npm/monitor-widget/dist/vanilla.mjs"></script>
```

---

🚀 Usage

1. Vanilla JS (Web Component)

Import the Web Component (via npm build or CDN):

```bash
<script type="module" src="https://cdn.jsdelivr.net/npm/monitor-widget/dist/vanilla.mjs"></script>
```

Then use the `<monitor-widget>` tag:

```bash
<monitor-widget subgraph-ids="Qm123...,Qm456...,Qm789..."
status-endpoint="http://localhost:3000/status" refresh-interval-ms="10000"
theme="auto" <!-- "light" | "dark" | "auto" -->
```

> </monitor-widget>

Attributes:

Attribute Type Required Description subgraph-ids string ✅ Comma-separated IPFS
subgraph IDs status-endpoint string ✅ Endpoint URL to fetch statuses
refresh-interval-ms number ❌ Auto-refresh interval (ms) (default 30s) theme
string ❌ "light", "dark", or "auto" (default "auto")

---

2. React / Next.js

Import the React wrapper:

```bash
import { MonitorWidget } from 'monitor-widget/react';
```

Use it like a standard component:

```bash
<MonitorWidget
  subgraphIds={[ 'QmZ55uVFQXodW33oPS5nD9DcpM7PEjU2ZJ96pxMS1mpgyy', 'QmdjHSGHCp5wQ6gmr4vhMD8GLe1zK6XK4meG43TewfLToL', ]}
  statusEndpoint="http://localhost:3000/status"
  refreshIntervalMs={10000}
  theme="auto" // or "light" | "dark"
/>
```

Props:

Prop Type Required Description subgraphIds string[] ✅ Array of IPFS subgraph
IDs statusEndpoint string ✅ Endpoint URL to fetch statuses refreshIntervalMs
number ❌ Auto-refresh interval (default 30s) theme string ❌ "light", "dark",
or "auto" (default "auto")

---

🖌️ Customization

The widget automatically adjusts to light and dark themes based on
prefers-color-scheme. You can override the theme manually by setting
theme="light", theme="dark", or theme="auto".
