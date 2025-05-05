'use client';
// import { MonitorWidget } from '../../../src/integrations/react';

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
        ]}
        statusEndpoint="http://localhost:3000"
        refreshIntervalMs={1000000}
        theme="light"
      />
      <h3>dark</h3>
      {/* <MonitorWidget
        subgraphIds={[
          'QmZ55uVFQXodW33oPS5nD9DcpM7PEjU2ZJ96pxMS1mpgyy',
          'QmdjHSGHCp5wQ6gmr4vhMD8GLe1zK6XK4meG43TewfLToL',
          'QmQSpt7SnnDssnWbm1e8ZEEmifXxmvwPxRigrF5RZAKqRf',
          'QmPo6GrH1A3SAQqRnScTtDy5Y7tDaK1jsfuNDG7WZftVnY',
          'QmZ55uVFQXodW33oPS5nD9DcpM7PEjU2ZJ96pxMS1mpsyy',
          'QmdjHSGHCp5wQ6gmr4vhMD8GLe1zK6XK4meG43TawfLToL',
          'QmQSpt7SnnDssnWbm1e8ZEEmifXxmvwPxRigra5RZAKqRf',
          'QmPo6GrH1A3SAQqRnScTtDy5Y7tDaK1jsfuNdq7WZftVnY',
        ]}
        statusEndpoint="http://localhost:3000"
        refreshIntervalMs={1000000}
      /> */}

      <h2>Single Subgraph</h2>
      <MonitorWidget
        subgraphIds={['QmcGipHy56ezZGdp1EqWEXEHTbVnBVw1vxXfTEhC3DJZJz']}
        statusEndpoint="http://localhost:3000"
        refreshIntervalMs={1000000}
        theme="highContrast"
      />
      <MonitorWidget
        subgraphIds={['QmcGipHy56ezZGdp1EqWEXEHTbVnBVw1vxXfTEhC3DJZJz']}
        statusEndpoint="http://localhost:3000"
        refreshIntervalMs={1000000}
        theme="dark"
      />
    </main>
  );
}
