import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Row,
  Col,
  Statistic,
  Alert,
  Spin,
  Card,
  Input,
} from "antd";
import millify from "millify";
import "antd/dist/antd.css";

import { fetchCoins } from "../../Redux/Features/coinsSlice";
import Layout from "../../components/UI/Layout/Layout";
import { Footer, SimpleHeader } from "../../components/index";
import classes from "./Cryptos.module.css";
import Loader from "../../components/UI/Layout/Loader/Loader";

const Cryptos = () => {
  const [showMore, setShowMore] = useState(false);
  const [searchItem, setSearchItems] = useState("");
  const [cryptos, setCryptos] = useState([]);
  const { Title } = Typography;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  const { coins, Loading, error } = useSelector((state) => state.coins);
  const globalStats = coins?.data?.stats;
  const coinsData = coins?.data?.coins;

  useEffect(() => {
    if (!coinsData) return;
    const filterdData = coinsData.filter((coin) =>
      coin.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setCryptos(filterdData);
  }, [searchItem, coinsData]);

  const shoMoreHandler = () => {
    setShowMore((prevstate) => !prevstate);
  };

  const sliceCoinsData = showMore ? cryptos : cryptos.slice(0, 10);

  return (
    <Layout footer={<Footer />} header={<SimpleHeader />}>
      <div className={classes.container}>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className={classes.errorAlert}
          />
        )}
        {Loading && <Loader />}
        {globalStats && (
          <div className={classes.StatisticContainer}>
            <Title level={2}>Global Crypto Stats</Title>
            <Row className={classes.row}>
              <Col span={12}>
                <Statistic
                  title="Total Cryptocurrencies"
                  value={globalStats.total}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Exchanges"
                  value={millify(globalStats.totalExchanges)}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Marketcap"
                  value={millify(globalStats.totalMarketCap)}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total 24h Volume"
                  value={millify(globalStats.total24hVolume)}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Markets"
                  value={millify(globalStats.totalMarkets)}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Coins"
                  value={millify(globalStats.totalCoins)}
                />
              </Col>
            </Row>
          </div>
        )}
        {!error && showMore && (
          <div className={classes.searchField}>
            <Input
              onChange={(e) => setSearchItems(e.target.value)}
              placeholder="Search Cryptos"
            />
          </div>
        )}
        {coinsData && (
          <>
            <div className={classes.cardtitlecontainer}>
              <h1 className={classes.crypto_card_title}>
                Top 10 Cryptocurrencies in the world
              </h1>
              <h1 onClick={shoMoreHandler} className={classes.showmorebtn}>
                {showMore ? "Show Less" : "Show More"}
              </h1>
            </div>
            <Row gutter={[32, 32]}>
              {sliceCoinsData.map((currency) => (
                <Col
                  xs={24}
                  sm={12}
                  lg={6}
                  className={classes.cryptoCard}
                  key={currency.uuid}>
                  <Link to={`/cryptos/${currency.uuid}`}>
                    <Card
                      className={classes.card}
                      title={`${currency.rank}.  ${currency.name}}`}
                      extra={
                        <img src={currency.iconUrl} width={35} height={35} />
                      }
                      hoverable>
                      <p>Price : {millify(currency.price)}</p>
                      <p>Market Cap : {millify(currency.marketCap)}</p>
                      <p>Daily Change : {millify(currency.change)}%</p>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cryptos;
