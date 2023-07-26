/* eslint no-use-before-define: 0 */
import React from "react";
import { useQuery } from "react-query";
import { getFormById } from "services/forms";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import Title from "components/title";

const ResponsChart = ({ dataChart, realm, fid }: any) => {
  const formatData: any = dataChart.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator.concat(currentValue.response),
    []
  );

  const { data: form } = useQuery(
    ["form", fid],
    () => getFormById(fid as string, realm),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const shemaArray: any = form?.questions?.map((el: any) => {
    const shema: any = {};
    shema.name = el.questionText;
    el.options.forEach((item: any) => {
      // eslint-disable-next-line no-underscore-dangle
      shema[item?._id] = { label: item?.optionText, id: item?._id };
    });
    return shema;
  });

  const list = shemaArray?.map((el: any) => {
    const keysValue: any = Object.values(el);
    const newObj: any = {};
    keysValue.forEach((elem: any) => {
      if (typeof elem === "object") {
        const count = formatData.filter((obj: any) => {
          const customId = elem.id;
          return customId === obj.optionId;
        }).length;
        newObj[elem.label] = count;
      } else {
        newObj.name = el.name;
      }
    });
    return { ...newObj };
  });
  const listOption: any = list
    ?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator.concat(Object.keys(currentValue)),
      []
    )
    .filter((el: any) => el !== "name");

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF".split("");
    let color = "#";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  };
  return (
    <>
      <Title>Formulaire: {form?.name}</Title>
      {list && list.length > 0 && listOption && (
        <BarChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          width={800}
          height={500}
          data={list}
        >
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {listOption &&
            listOption.map((el: any, i: any) => (
              <Bar
                // eslint-disable-next-line react/no-array-index-key
                key={el + i}
                dataKey={el}
                stackId="a"
                fill={getRandomColor()}
              />
            ))}
        </BarChart>
      )}
    </>
  );
};

export default ResponsChart;
