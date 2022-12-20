import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Select, Row, Col, Alert } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";

import { fetchCoinDetail } from "../../Redux/Features/coinDetailSlice";
import { fetchCoinHistory } from "../../Redux/Features/coinHistorySlice";
import { Footer, SimpleHeader, LineChart } from "../../components";
import Layout from "../../components/UI/Layout/Layout";
import classes from "./CryptoDetail.module.css";
import Loader from "../../components/UI/Layout/Loader/Loader";

const CryptoDetail = () => {
  const [coinData, setCoinData] = useState([]);
  const [timeperiod, setTimeperiod] = useState("7d");

  const { Text, Title } = Typography;
  const { Option } = Select;

  const { coinId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinDetail(coinId));
    dispatch(fetchCoinHistory(coinId, timeperiod));
  }, [timeperiod]);

  const { History, Loading: HistoryLoading } = useSelector(
    (state) => state?.history
  );
  const { coin, Loading, error } = useSelector((state) => state?.coin);
  const cryptoDetails = coin?.data?.coin;

  useLayoutEffect(() => {
    setCoinData(cryptoDetails);
  }, [cryptoDetails]);

  console.log("coinData", coinData);
  console.log("History", History);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinData?.price && millify(coinData?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinData?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coinData?.volume && millify(coinData?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinData?.marketCap && millify(coinData?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinData?.allTimeHigh?.price && millify(coinData?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinData?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinData?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coinData?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${coinData?.supply?.total && millify(coinData?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinData?.supply?.circulating && millify(coinData?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Layout footer={<Footer />} header={<SimpleHeader />}>
      <div className={classes.container}>
        {Loading && <Loader />}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className={classes.errorAlert}
          />
        )}
        {coinData && (
          <Col className={classes.coin_detail_container}>
            <Col className={classes.coinheadingcontainer}>
              <Title level={2} className={classes.coin_name}>
                {coin?.data?.coin.name} ({coin?.data?.coin.symbol}) Price
              </Title>
              <p>
                {coinData.name} live price in US Dollar (USD). View value
                statistics, market cap and supply.
              </p>
            </Col>
            <Select
              defaultValue="7d"
              className={classes.selecttimeperiod}
              placeholder="Select Timeperiod"
              onChange={(value) => setTimeperiod(value)}>
              {time.map((date) => (
                <Option key={date}>{date}</Option>
              ))}
            </Select>
            <LineChart
              coinHistory={History}
              currentPrice={millify(coinData?.price)}
              coinName={coinData?.name}
              HistoryLoading={HistoryLoading}
            />
            <Col className={classes.statscontainer}>
              <Col className={classes.coinvaluestatistics}>
                <Col className={classes.coinvaluestatisticsheading}>
                  <Title level={3} className={classes.coindetailsheading}>
                    {coinData.name} Value Statistics
                  </Title>
                  <p>
                    An overview showing the statistics of {coinData.name}, such
                    as the base and quote currency, the rank, and trading
                    volume.
                  </p>
                </Col>
                {stats.map(({ icon, title, value }) => (
                  <Col className={classes.stats}>
                    <Col className={classes.coinstatsname}>
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className={classes.stats}>{value}</Text>
                  </Col>
                ))}
              </Col>
              <Col className={classes.otherstatsinfo}>
                <Col className={classes.coinvaluestatisticsheading}>
                  <Title level={3} className={classes.coindetailsheading}>
                    Other Stats Info
                  </Title>
                  <p>
                    An overview showing the statistics of {coinData.name}, such
                    as the base and quote currency, the rank, and trading
                    volume.
                  </p>
                </Col>
                {genericStats.map(({ icon, title, value }) => (
                  <Col className={classes.stats} key={title}>
                    <Col className={classes.coinstatsname}>
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className={classes.stats}>{value}</Text>
                  </Col>
                ))}
              </Col>
            </Col>
            <Col className={classes.coindesclink}>
              <Row className={classes.coindesc}>
                <Title level={3} className={classes.coindetailsheading}>
                  What is {coinData.name}?
                </Title>
                {/* {HTMLReactParser(coinData.description)} */}
              </Row>
              <Col className={classes.coinlinks}>
                <Title level={3} className={classes.coindetailsheading}>
                  {coinData.name} Links
                </Title>
                {coinData.links?.map((link) => (
                  <Row className={classes.coinlink} key={link.uuid}>
                    <Title level={5} className="link-name">
                      {link.type}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </Row>
                ))}
              </Col>
            </Col>
          </Col>
        )}
      </div>
    </Layout>
  );
};

export default CryptoDetail;
