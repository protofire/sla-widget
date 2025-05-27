import * as React from 'react';
import { WidgetApp } from '../../lib';
import { WidgetAppOptions } from '../../utils/types';

export const MonitorWidget: React.FC<WidgetAppOptions> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const appRef = React.useRef<WidgetApp>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    if (!appRef.current) {
      const app = new WidgetApp(props);
      app.render(ref.current);
      appRef.current = app;
    } else {
      appRef.current.update(props);
    }

    return () => {
      appRef.current?.destroy();
    };
  }, [
    props.subgraphIds.join(','),
    props.statusEndpoint,
    props.refreshIntervalMs,
    props.theme,
    props.position,
    props.details,
    props.mode,
    props.customMessages,
    props.customMessages?.warning,
    props.customMessages?.error,
    props.customMessages?.unknown,
    props.customMessages?.ok,
  ]);

  return <div ref={ref} />;
};
