import * as React from 'react';
import { SLAWidget as Widget } from '../../lib';
import { WidgetAppOptions } from '../../utils/types';

export const SLAWidget: React.FC<WidgetAppOptions> = (props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const appRef = React.useRef<Widget>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    if (!appRef.current) {
      const app = new Widget(props);
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
