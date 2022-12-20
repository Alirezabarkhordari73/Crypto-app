import React from "react";
import { NavLink } from "react-router-dom";
import classnameCombiner from "classnames";

import classes from "./SimpleHeader.module.css";
import LogoImage from "../../Images/Logo.png";

const SimpleHeader = () => {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerContent}>
        <div className={classes.logo}>
          <img src={LogoImage} className={classes.logoImage} />
          <span className={classes.logoText}>Crypto Wall</span>
        </div>
        <div className={classes.navItemContainer}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classnameCombiner(isActive ? classes.linkActive : null)
            }>
            Home
          </NavLink>
          <NavLink
            to="/cryptos"
            className={({ isActive }) =>
              classnameCombiner(isActive ? classes.linkActive : null)
            }>
            Cryptos
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              classnameCombiner(isActive ? classes.linkActive : null)
            }>
            News
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
