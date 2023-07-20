import React, { useRef } from 'react';

const Chart = () => {
  const barRef = useRef < HTMLDivElement > (null);
  const pieRef = useRef < HTMLDivElement > (null);
  const lineRef = useRef < HTMLDivElement > (null);

  return (
    <div>
      <div ref={barRef} className="react-echart" />
      <div ref={pieRef} className="react-echart" />
      <div ref={lineRef} className="react-echart" />
    </div>
  );
};
export default Chart;
