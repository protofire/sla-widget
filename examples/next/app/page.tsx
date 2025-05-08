'use client';

const isDev = process.env.NODE_ENV === 'development';

import { MonitorWidget as Dev } from '../../../src/integrations/react';
import { MonitorWidget as Prod } from 'monitor-widget/react';
const MonitorWidget = isDev ? Dev : Prod;

export default function Page() {
  const statusEndpoint = isDev
    ? 'http://localhost:3002/api/status'
    : 'https://mock-proof-service.vercel.app/api/status';

  const subgraphIds = [
    'QmPX5etHtNy916C88RtQBybN83XdRt3rwJXZGsEmRGwrZk',
    'QmRakZmjiUjkn5WbGoKdxXkFRjByHnmicRUhpJAAYDdJXa',
  ];
  const subgraphId = ['QmPX5etHtNy916C88RtQBybN83XdRt3rwJXZGsEmRGwrZk'];
  const subgraphIdLatency = ['Qm1234567890abcdefghijklmnopqrstuvwxyz-Latency'];
  const subgraphIdDown = ['Qm1234567890abcdefghijklmnopqrstuvwxyz-Down'];

  return (
    <main style={{ padding: 40 }}>
      <h1>Monitor Widget - Next.js Playground</h1>
      <h2>Multiple Subgraphs</h2>
      <h3>light</h3>
      <MonitorWidget
        subgraphIds={subgraphIds}
        statusEndpoint={statusEndpoint}
        theme="light"
      />
      <h3>dark</h3>
      <MonitorWidget
        subgraphIds={subgraphIds}
        statusEndpoint={statusEndpoint}
        theme="dark"
      />
      <h2>Single Subgraph</h2>
      <MonitorWidget
        subgraphIds={subgraphId}
        statusEndpoint={statusEndpoint}
        refreshIntervalMs={1000000}
        theme="light"
      />
      <br />
      <MonitorWidget
        subgraphIds={subgraphId}
        statusEndpoint={statusEndpoint}
        refreshIntervalMs={1000000}
        theme="dark"
      />
      <br />
      <h2>Latency Subgraph</h2>
      <MonitorWidget
        subgraphIds={subgraphIdLatency}
        statusEndpoint={statusEndpoint}
        refreshIntervalMs={1000000}
        theme="light"
      />
      <br />
      <MonitorWidget
        subgraphIds={subgraphIdLatency}
        statusEndpoint={statusEndpoint}
        refreshIntervalMs={1000000}
        theme="dark"
      />
      <br />
      <h2>Down Subgraph</h2>
      <MonitorWidget
        subgraphIds={subgraphIdDown}
        statusEndpoint={statusEndpoint}
        refreshIntervalMs={1000000}
        theme="light"
      />
      <br />{' '}
      <MonitorWidget
        subgraphIds={subgraphIdDown}
        statusEndpoint={statusEndpoint}
        refreshIntervalMs={1000000}
        theme="dark"
      />
    </main>
  );
}
