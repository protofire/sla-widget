import * as React from 'react';
import { SLAWidget as Widget } from '../../lib';
import { HealthEnum, WidgetAppOptions } from '../../utils/types';

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
    props.serviceIds.join(','),
    props.statusEndpoint,
    props.refreshIntervalMs,
    props.theme,
    props.position,
    props.details,
    props.mode,
    props.pinned,
    props.customMessages,
    props.customMessages?.[HealthEnum.DOWN],
    props.customMessages?.[HealthEnum.LATENCY],
    props.customMessages?.[HealthEnum.UNKNOWN],
    props.customMessages?.[HealthEnum.UP],
  ]);

  return <div ref={ref} />;
};
