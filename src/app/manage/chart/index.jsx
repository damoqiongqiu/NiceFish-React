import React, { useRef } from 'react';

const Chart = () => {
  const barRef = useRef(null);
  const pieRef = useRef(null);
  const lineRef = useRef(null);

  return (
    <div>
      <div ref={barRef} className="react-echart" />
      <div ref={pieRef} className="react-echart" />
      <div ref={lineRef} className="react-echart" />
    </div>
  );
};

export default Chart;
