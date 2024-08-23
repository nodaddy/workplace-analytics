import { RadialBar } from '@ant-design/plots';

const RadialLinePlot = ({data}) => {
    const config = {
      data,
      xField: 'term',
      yField: 'count',
      startAngle: Math.PI * 0.5,
      maxAngle: 270, //最大旋转角度,
      radius: 1,
      innerRadius: 0.2,
      legend: false,
      axis: { y: false },
      tooltip: {
        items: ['count'],
      },
      sizeField: 10,
    };
    return <RadialBar {...config} />;
  };

  export default RadialLinePlot