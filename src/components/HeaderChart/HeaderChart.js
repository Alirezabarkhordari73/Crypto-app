import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
} from "chart.js";

import classes from "./HeaderChart.module.css";

ChartJs.register(LineElement, CategoryScale, PointElement, LinearScale);

const HeaderChart = ({ coinData }) => {
  const labels24Hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];

  const coinSparkline = coinData?.sparkline;
  let roundedSparkLineData = [];

  for (let index = 0; index < coinSparkline.length; index++) {
    roundedSparkLineData.push(parseInt(coinSparkline[index]).toFixed(2));
  }

  const data = {
    labels: labels24Hours,
    datasets: [
      {
        label: "CoinSparkLine",
        data: coinSparkline,
        fill: false,
        borderColor: "#e74c3c",
        borderWidth: 2,
        tension: 0.4,
        pointBorderWidth: 0,
      },
    ],
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 6, max: 16 } }],
      },
    },
  };

  return (
    <div className={classes.chartBox}>
      <div className={classes.chartContainer}>
        <div className={classes.headerContainer}>
          <span className={classes.coinName}>{coinData?.name}</span>
          <span className={classes.coinprice}>
            Price :{parseInt(coinData?.price).toFixed(3)}
          </span>
        </div>

        <Line data={data}></Line>
      </div>
    </div>
  );
};

export default HeaderChart;
