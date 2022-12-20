import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import classes from "./LineChart.module.css";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, HistoryLoading }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#e74c3c",
        tension: 0.4,
        pointBorderWidth: 0,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className={classes.container}>
      {HistoryLoading && "Loading ..."}
      <Row className={classes.chartheader}>
        <Title level={2} className={classes.charttitle}>
          {coinName} Price Chart{" "}
        </Title>
        <Col className={classes.pricecontainer}>
          <Title level={5} className={classes.pricechange}>
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className={classes.currentprice}>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
