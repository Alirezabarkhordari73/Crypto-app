import React from "react";
import { useState } from "react";
import classes from "./Navbar.module.css";
import classnameCombiner from "classnames";

import { NavLink } from "react-router-dom";
import { MenuFoldOutlined } from "@ant-design/icons";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [menuBarToggle, setMenuBarToggle] = useState(false);

  const menuBarToggleHandler = () => {
    setMenuBarToggle((prevState) => !prevState);
    console.log("nav", menuBarToggle);
  };
  return (
    <nav className={classes.container}>
      <Sidebar
        setMenuBarToggle={setMenuBarToggle}
        menuBarToggle={menuBarToggle}
      />
      <div
        className={menuBarToggle ? classes.menuIconDisable : classes.menuIcon}
        onClick={menuBarToggleHandler}>
        <MenuFoldOutlined />
      </div>
      <div className={classes.itemsContainer}>
        <div className={classes.items}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classnameCombiner(isActive ? classes.linkActive : null)
            }>
            Home
          </NavLink>
        </div>
      </div>
      <div className={classes.itemsContainer}>
        <div className={classes.items}>
          <NavLink
            to="/Cryptos"
            className={({ isActive }) =>
              classnameCombiner(isActive ? classes.linkActive : null)
            }>
            Cryptos
          </NavLink>
        </div>
      </div>
      <div className={classes.itemsContainer}>
        <div className={classes.items}>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              classnameCombiner(isActive ? classes.linkActive : null)
            }>
            News
          </NavLink>
        </div>
      </div>
      <div className={classes.itemsContainer}>
        <button className={classes.signupBtn}>
          <NavLink
            to="/Sign Up"
            className={({ isActive }) =>
              classnameCombiner(isActive ? classes.linkActive : null)
            }>
            Sign Up
          </NavLink>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
