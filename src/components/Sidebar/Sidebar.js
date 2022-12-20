import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import classnameCombiner from "classnames";

import classes from "./Sidebar.module.css";
import {
  HomeOutlined,
  FundOutlined,
  BulbOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Sidebar = ({ setMenuBarToggle, menuBarToggle }) => {
  const [toggleMenuIcon, setToggleMenuIcon] = useState(false);

  const toggleMenuIconHandler = () => {
    setToggleMenuIcon(!toggleMenuIcon);

    setMenuBarToggle((prevState) => !prevState);
    console.log("side", menuBarToggle);
  };

  return (
    <nav
      className={
        menuBarToggle
          ? classnameCombiner(classes.container, classes.active)
          : classes.container
      }>
      <div className={classes.menuIcon} onClick={toggleMenuIconHandler}>
        <CloseOutlined />
      </div>
      <div className={classes.itemsContainer}>
        <div className={classes.items}>
          <NavLink to="/">Home</NavLink>
          <HomeOutlined />
        </div>
      </div>
      <div className={classes.itemsContainer}>
        <div className={classes.items}>
          <NavLink to="/exchanges">Exchanges</NavLink>
          <FundOutlined />
        </div>
      </div>
      <div className={classes.itemsContainer}>
        <div className={classes.items}>
          <NavLink to="/news">News</NavLink>
          <BulbOutlined />
        </div>
      </div>
      {/* <button className={classes.signupBtn}>
        <NavLink to="/Sign Up">Sign Up</NavLink>
      </button> */}
    </nav>
  );
};

export default Sidebar;
