'use client';
// import { MonitorWidget } from '../../../src/integrations/react';
// import { MonitorWidget } from '../../../dist/react.mjs';

import { MonitorWidget } from 'monitor-widget/react';

export default function Page() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Monitor Widget - Next.js Playground</h1>

      <h2>Multiple Subgraphs</h2>
      <h3>light</h3>
      <MonitorWidget
        subgraphIds={[
          'QmPX5etHtNy916C88RtQBybN83XdRt3rwJXZGsEmRGwrZk',
          'QmRakZmjiUjkn5WbGoKdxXkFRjByHnmicRUhpJAAYDdJXa',
          'QmcGipHy56ezZGdp1EqWEXEHTbVnBVw1vxXfTEhC3DJZJz',
          'QmQSpt7SnnDssnWbm1e8ZEEmifXxmvwPxRigrF5RZAKqRf',
        ]}
        statusEndpoint="https://mock-proof-service.vercel.app/api/status"
        refreshIntervalMs={1000000}
        theme="light"
      />
      <h3>dark</h3>
      <MonitorWidget
        subgraphIds={[
          'QmPX5etHtNy916C88RtQBybN83XdRt3rwJXZGsEmRGwrZk',
          'QmRakZmjiUjkn5WbGoKdxXkFRjByHnmicRUhpJAAYDdJXa',
          'QmcGipHy56ezZGdp1EqWEXEHTbVnBVw1vxXfTEhC3DJZJz',
        ]}
        statusEndpoint="https://mock-proof-service.vercel.app/api/status"
        refreshIntervalMs={1000000}
      />

      <h2>Single Subgraph</h2>

      <MonitorWidget
        subgraphIds={['QmcGipHy56ezZGdp1EqWEXEHTbVnBVw1vxXfTEhC3DJZJz']}
        statusEndpoint="https://mock-proof-service.vercel.app/api/status"
        refreshIntervalMs={1000000}
        theme="dark"
      />
    </main>
  );
}
