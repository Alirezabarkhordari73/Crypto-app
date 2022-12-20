import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Card,
  Alert,
  Avatar,
  Select,
  Option,
} from "antd";
import moment from "moment";

import classes from "./News.module.css";
import Loader from "../../components/UI/Layout/Loader/Loader";
import Layout from "../../components/UI/Layout/Layout";
import { fetchNews } from "../../Redux/Features/newsSlice";
import { fetchCoins } from "../../Redux/Features/coinsSlice";
import { Footer, SimpleHeader } from "../../components/index";

const News = () => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { Text, Title } = Typography;
  const { Option } = Select;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({ newsCategory }));
    dispatch(fetchCoins());
  }, [newsCategory]);

  const {
    news,
    Loading: newsLoading,
    error: newsError,
  } = useSelector((state) => state.news);
  const {
    coins,
    Loading: coinsLoading,
    error: coinsError,
  } = useSelector((state) => state.coins);

  const coinsList = coins?.data?.coins;
  const newsList = news?.value;

  console.log("newsLoading", newsLoading);
  console.log("coinsLoading", coinsLoading);
  console.log("newsCategory", newsCategory);

  return (
    <Layout footer={<Footer />} header={<SimpleHeader />}>
      <div className={classes.container}>
        {newsLoading && <Loader />}
        {newsError && (
          <Alert
            message={newsError}
            type="error"
            showIcon
            className={classes.errorAlert}
          />
        )}
        <Row gutter={[24, 24]}>
          {!newsLoading && coinsList && (
            <Col span={24}>
              <h1>Latest Crypto News</h1>
              <Select
                className={classes.selectBox}
                showSearch
                placeholder="Select News"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(option, input) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase())
                }>
                <Option value={"Cryptocurrency"}>Cryptocurrency</Option>
                {coinsList &&
                  coinsList.map((coin) => (
                    <Option key={coin.uuid} value={coin.name}>
                      {coin.name}
                    </Option>
                  ))}
              </Select>
            </Col>
          )}
          {newsList &&
            newsList.map((news) => (
              <Col xs={24} sm={12} lg={8} key={news.name}>
                <Card hoverable className={classes.news_card}>
                  <a href={news.url} target="blank" className={classes.link}>
                    <div className={classes.news_container}>
                      <Title className={classes.news_title} level={4}>
                        {news.name}
                      </Title>
                      <img
                        src={news?.image?.thumbnail?.contentUrl}
                        alt=""
                        className={classes.newsimage}
                      />
                    </div>
                    <p>
                      {news.description > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                    </p>
                    <div className={classes.provider}>
                      <Avatar
                        src={news.provider[0]?.image?.thumbnail?.contentUrl}
                        alt=""
                        className={classes.avatar}
                      />
                      <Text>{news.provider[0]?.name}</Text>
                    </div>
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </a>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </Layout>
  );
};

export default News;
