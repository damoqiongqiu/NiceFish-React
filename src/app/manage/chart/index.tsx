import React, { FC, useRef } from 'react';
import ChartService from 'src/app/manage/platform/chart/browser/chartService';
import { useService } from 'src/app/manage/platform/injector';

const chartService: ChartService = useService(ChartService);
const Chart: FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  chartService.useChart(barRef, pieRef, lineRef);
  return (
    <div>
      <div ref={barRef} className="react-echart" />
      <div ref={pieRef} className="react-echart" />
      <div ref={lineRef} className="react-echart" />
    </div>
  );
};
export default Chart;