import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options: any = {
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      formatter(
        value: any,
        context: {
          chart: { data: { labels: { [x: string]: any } } };
          dataIndex: string | number;
        }
      ) {
        if (value === 0) return "";
        return context.chart.data.labels[context.dataIndex];
      },
    },
  },
};

export default function InnovCategoriesChart({
  incomingData = [],
}: {
  incomingData: any;
}) {
  let x: any = [];
  let y: any = [];
  incomingData?.forEach((e: any) => {
    let index = x.findIndex((j: any) => j === e.category);
    if (index === -1) index = 0;

    if (!x.includes(e.category)) {
      x = [...x, e.category];
      y = [...y, 0];
    }
    y[index] += 1;
  });

  const randomColor = () => {
    const c = Math.floor(Math.random() * 16777215).toString(16);
    // console.log("c : ", c);
    return `#${c}20`;
  };
  const bgColors = [
    "#E6CCA9",
    "#533535",
    "#AE4CCF",
    "#FF6D6D",
    "#000000",
    "#FF9F29",
    "#3120E0",
  ];

  const backgroundColor = () => {
    const diff = x.length - bgColors.length;

    // less bg
    if (diff < 0) {
      return bgColors.slice(0, diff);
    }
    // more bg
    if (diff > 0) {
      const moreBg = Array.from({ length: diff }, () => randomColor());
      return [...bgColors, ...moreBg];
    }
    // exact bg
    return bgColors;
  };

  const data = {
    labels: x,
    datasets: [
      {
        label: "categories",
        data: y,
        backgroundColor: backgroundColor(),
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} options={options} plugins={[ChartDataLabels]} />;
}
