"use client";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  data: { range: string; sales: number }[];
  month: string;
};

const Barchart = ({ data, month }: Props) => {
  return (
    <div>
        <h1 className="text-xl font-medium">Grafik Penjualan - {month}</h1>
      <BarChart
        style={{
          width: "100%",
          maxWidth: "1500px",
          maxHeight: "60vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 40,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" label={{position: 'bottom', value: 'Tanggal'}} />
        <YAxis width="auto" domain={[0,100]} label={{position: 'left', offset: 10 ,value:'Jumlah Penjualan', angle: -90, dy: 60}}/>
        <Tooltip />
        <Bar
          dataKey="sales"
          fill="#0099A5"
          activeBar={<Rectangle fill="#7bf6ffff"  />}
        />
      </BarChart>
    </div>
  );
};

export default Barchart;
