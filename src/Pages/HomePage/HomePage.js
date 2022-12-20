import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "antd";
import {
  AndroidFilled,
  WindowsFilled,
  MacCommandFilled,
  AppleFilled,
} from "@ant-design/icons";

import Loader from "../../components/UI/Layout/Loader/Loader";
import { Layout, Header, Footer } from "../../components";
import { fetchCoins } from "../../Redux/Features/coinsSlice";
import classes from "./HomePage.module.css";
import CryptocurrenciesTable from "../../components/CryptocurrenciesTable/CryptocurrenciesTable";
import image1 from "../../Images/img1.png";
import image2 from "../../Images/img2.png";
import image3 from "../../Images/img3.png";
import image4 from "../../Images/img4.png";
import image5 from "../../Images/img5.png";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  const { coins, error, Loading } = useSelector((state) => state.coins);
  const coinsList = coins?.data?.coins;

  console.log(coinsList);

  return (
    <Layout header={<Header />} footer={<Footer />}>
      <div className={classes.HomePageContainer}>
        {Loading && <Loader />}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className={classes.errorAlert}
          />
        )}
        {!Loading && <CryptocurrenciesTable coinsData={coinsList} />}
        <div className={classes.boxContainer}>
          <div className={classes.Box}>
            <img className={classes.image} src={image1} alt="image-1" />
            <h1>Safe and secure</h1>
            <p>
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable therefore always
            </p>
          </div>
          <div className={classes.Box}>
            <img className={classes.image} src={image2} alt="image-1" />
            <h1>High Exchange Limits</h1>
            <p>
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable therefore always
            </p>
          </div>
          <div className={classes.Box}>
            <img className={classes.image} src={image3} alt="image-1" />
            <h1>High Exchange Limits</h1>
            <p>
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable therefore always
            </p>
          </div>
          <div className={classes.Box}>
            <img className={classes.image} src={image4} alt="image-1" />
            <h1>Fast and Reliable</h1>
            <p>
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable therefore always
            </p>
          </div>
        </div>
        <div className={classes.downloadContainer}>
          <img src={image5} />
          <p>Fully compatible with iOS, Android, Mac & Windows</p>
          <span className={classes.text}>Select one & Download</span>
          <div className={classes.iconsContainer}>
            <AndroidFilled />
            <WindowsFilled />
            <MacCommandFilled />
            <AppleFilled />
          </div>
          <div className={classes.iconNameContainer}>
            <p className={classes.name}>Andriod</p>
            <p className={classes.name}>Windows</p>
            <p className={classes.name}>Mac</p>
            <p className={classes.name}>Apple</p>
          </div>
          <button className={classes.download_btn}>Download Now</button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
