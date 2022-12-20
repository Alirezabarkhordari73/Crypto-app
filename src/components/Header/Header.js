import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import LogoImage from "../../Images/Logo.png";
import Navbar from "../Navbar/Navbar";
import classes from "./Header.module.css";
import HeaderChart from "../HeaderChart/HeaderChart";
import { fetchCoins } from "../../Redux/Features/coinsSlice";

const Header = () => {
  const [coinsData, setCoinsData] = useState();
  const dispatch = useDispatch();

  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position >= 0 && position < 100) {
      setIsScroll(false);
    } else {
      setIsScroll(true);
    }
  };

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScroll]);

  const { coins, Loading, error } = useSelector((state) => state.coins);
  const coinsList = coins?.data?.coins;
  console.log("error", error);
  console.log("loading", Loading);
  console.log("coinsList", coinsList);

  return (
    <div className={classes.container}>
      <div className={classes.headerContent}>
        <NavLink to="/" className={classes.logo}>
          <img className={classes.logoImage} src={LogoImage} alt="LogoImage" />
          <span className={classes.logoText}>Crypto Wall</span>
        </NavLink>
        {isScroll ? null : (
          <div>
            <Navbar />
          </div>
        )}
      </div>
      <div className={classes.underLine} />
      <div className={classes.headerDescription}>
        <h1>Buy and Sell Cryptocurrency</h1>
        <p>
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text
        </p>
      </div>
      {coinsList ? (
        <div className={classes.chartsContainer}>
          {coinsList.slice(0, 4).map((item) => (
            <HeaderChart key={item.uuid} coinData={item} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
