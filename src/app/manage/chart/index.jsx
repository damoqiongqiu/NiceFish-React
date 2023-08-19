import React, { useEffect } from 'react';
import ReactEcharts from "echarts-for-react";

import "echarts/theme/dark";

import './index.scss';

export default props => {
  //Echarts 饼图配置项
  const pieOptions = {
    event: [
      {
        type: 'click',
        cb: function (res) {
          console.log(res);
        }
      }
    ],
    title: {
      text: 'NiceFish访问用户地区分布',
      subtext: '纯属虚构',
      x: 'center',
      padding: [20, 0, 20, 0],
    },
    legend: {
      orient: 'vertical',
      top: '7%',
      left: '3%',
      data: ['深圳', '北京', '广州', '上海', '长沙']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        startAngle: -180,
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {
            value: 3350,
            name: '深圳'
          },
          {
            value: 310,
            name: '北京'
          },
          {
            value: 234,
            name: '广州'
          },
          {
            value: 135,
            name: '上海'
          },
          {
            value: 1548,
            name: '长沙'
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  //Echarts 柱状图配置项
  const barOptions = {
    title: {
      text: 'NiceFish月访问量统计',
      subtext: '纯属虚构',
      x: 'center',
      padding: [20, 0, 20, 0],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '{b}月{a}:{c}'
    },
    xAxis: [
      {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '访问量',
        type: 'bar',
        barWidth: '60%',
        data: [900, 1258, 1300, 1334, 1390, 1430, 1520, 1000, 500, 444, 999, 555]
      }
    ]
  };

  //Echarts 折线图配置项
  const lineOptions = {
    title: {
      text: 'NiceFish月访问趋势图',
      subtext: '纯属虚构',
      x: 'center',
      textStyle: {
        margin: '10',
      }
    },
    legend: {
      x: 'center',
      y: 'bottom'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        data: [11, 11, 15, 13, 12, 13, 10, 123, 100, 19, 16, 199]
      },
      {
        name: '访问量1',
        type: 'line',
        data: [21, 21, 25, 23, 22, 23, 20, 223, 200, 29, 26, 299]
      },
      {
        name: '访问量2',
        type: 'line',
        data: [31, 31, 35, 33, 32, 33, 30, 323, 300, 39, 36, 399]
      },
      {
        name: '访问量3',
        type: 'line',
        data: [41, 41, 45, 43, 42, 43, 40, 423, 400, 49, 46, 499]
      },
      {
        name: '访问量4',
        type: 'line',
        data: [41, 41, 45, 43, 42, 43, 40, 423, 400, 49, 56, 499]
      },
      {
        name: '访问量5',
        type: 'line',
        data: [51, 51, 55, 53, 52, 53, 50, 523, 500, 59, 66, 599]
      },
      {
        name: '访问量6',
        type: 'line',
        data: [61, 61, 65, 63, 62, 63, 60, 623, 600, 69, 76, 699]
      },
      {
        name: '访问量7',
        type: 'line',
        data: [71, 71, 75, 73, 72, 73, 70, 723, 700, 79, 86, 799]
      },
      {
        name: '访问量8',
        type: 'line',
        data: [81, 81, 85, 83, 82, 83, 80, 823, 800, 89, 96, 899]
      }
    ]
  };

  useEffect(() => {
  }, []);

  return (
    <div className='mng-chart-container'>
      <div className="row">
        <div className="col-md-12">
          <div className="nf-chart">
            <ReactEcharts option={pieOptions} theme={"dark"} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="nf-chart">
            <ReactEcharts option={barOptions} theme={"dark"} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="nf-chart">
            <ReactEcharts option={lineOptions} theme={"dark"} />
          </div>
        </div>
      </div>
    </div>
  );
};