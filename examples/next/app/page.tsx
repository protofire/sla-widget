'use client';

const isDev = process.env.NODE_ENV === 'development';

import { MonitorWidget as Dev } from '../../../src/integrations/react';
import { MonitorWidget as Prod } from 'monitor-widget/react';
const MonitorWidget = isDev ? Dev : Prod;

export default function Page() {
  const statusEndpoint = !isDev
    ? 'http://localhost:3002/api/status'
    : 'https://mock-proof-service.vercel.app/api/status';

  const subgraphIds = {
    ok: ['Qm1234567890abcdefghijklmnopqrstuvwxyz-SyncOk'],
    latency: ['Qm1234567890abcdefghijklmnopqrstuvwxyz-Latency'],
    down: ['Qm1234567890abcdefghijklmnopqrstuvwxyz-Down'],
    multiple: [
      'QmPX5etHtNy916C88RtQBybN83XdRt3rwJXZGsEmRGwrZk',
      'Qm1234567890abcdefghijklmnopqrstuvwxyz-SyncOk',
      'QmRakZmjiUjkn5WbGoKdxXkFRjByHnmicRUhpJAAYDdJXa',
      'Qm1234567890abcdefghijklmnopqrstuvwxyz-Latency',
      'Qm1234567890abcdefghijklmnopqrstuvwxyz-Down',
    ],
  };

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', lineHeight: 1.5 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 20, textAlign: 'center' }}>
        🛠️ Monitor Widget Demo
      </h1>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{ fontSize: '1.25rem', marginBottom: 10, textAlign: 'center' }}
        >
          Multiple Subgraphs
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          <div>
            <h4 style={{ marginBottom: 5 }}>🌞 Light Theme</h4>
            <MonitorWidget
              subgraphIds={subgraphIds.multiple}
              statusEndpoint={statusEndpoint}
              theme="light"
            />
          </div>
          <div>
            <h4 style={{ marginBottom: 5 }}>🌙 Dark Theme</h4>
            <MonitorWidget
              subgraphIds={subgraphIds.multiple}
              statusEndpoint={statusEndpoint}
              theme="dark"
            />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{ fontSize: '1.25rem', marginBottom: 10, textAlign: 'center' }}
        >
          🟢 OK Subgraph
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          <MonitorWidget
            subgraphIds={subgraphIds.ok}
            statusEndpoint={statusEndpoint}
            theme="light"
          />
          <MonitorWidget
            subgraphIds={subgraphIds.ok}
            statusEndpoint={statusEndpoint}
            theme="dark"
          />
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{ fontSize: '1.25rem', marginBottom: 10, textAlign: 'center' }}
        >
          🟡 Latency Subgraph
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          <MonitorWidget
            subgraphIds={subgraphIds.latency}
            statusEndpoint={statusEndpoint}
            theme="light"
          />
          <MonitorWidget
            subgraphIds={subgraphIds.latency}
            statusEndpoint={statusEndpoint}
            theme="dark"
          />
        </div>
      </section>

      <section>
        <h2
          style={{ fontSize: '1.25rem', marginBottom: 10, textAlign: 'center' }}
        >
          🔴 Down Subgraph
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          <MonitorWidget
            subgraphIds={subgraphIds.down}
            statusEndpoint={statusEndpoint}
            theme="light"
          />
          <MonitorWidget
            subgraphIds={subgraphIds.down}
            statusEndpoint={statusEndpoint}
            theme="dark"
          />
        </div>
      </section>
    </main>
  );
}
