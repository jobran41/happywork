import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useIntl } from "react-intl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MoodsChart({
  incomingData = [],
}: {
  incomingData: any;
}) {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: f("Humeur Recent"),
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: f("compte des humeurs"),
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const labels = [
    "",
    ...incomingData.labels.map((e: any) => e.replaceAll("T00:00:00.000Z", "")),
  ];
  const data = {
    labels,
    datasets: [
      {
        label: f("Insatisfait"),
        data: [0, ...incomingData?.moodArrays.m0],
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
      },
      {
        label: f("Pas satisfait"),
        data: [0, ...incomingData?.moodArrays.m1],
        borderColor: "orange",
        backgroundColor: "orange",
        fill: false,
      },
      {
        label: f("Satisfait"),
        data: [0, ...incomingData?.moodArrays.m2],
        borderColor: "purple",
        backgroundColor: "purple",
        fill: false,
      },
      {
        label: f("Content"),
        data: [0, ...incomingData?.moodArrays.m3],
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
