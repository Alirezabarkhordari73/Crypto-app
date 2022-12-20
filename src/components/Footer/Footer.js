import React from "react";
import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";

import {
  FacebookFilled,
  LinkedinFilled,
  GooglePlusCircleFilled,
  GithubFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";

const Footer = () => {
  const ScrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={classes.container}>
      <div className={classes.scrollIconContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={classes.ScrollIcon}
          onClick={ScrollToTopHandler}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
      <div className={classes.topSection}>
        <div className={classes.box}>
          <h1>Contact Us</h1>
          <span className={classes.Span}>
            Email : <p>info.excoin@gmail.com</p>
          </span>
          <span className={classes.Span}>
            Phone: <p>+99 5589 54789</p>
          </span>
          <div className={classes.iconContainer}>
            <FacebookFilled />
            <LinkedinFilled />
            <GooglePlusCircleFilled />
            <GithubFilled />
            <TwitterCircleFilled />
          </div>
        </div>
        <div className={classes.box}>
          <h1>Learn</h1>
          <ul>
            <li>
              <NavLink to="/">Legal</NavLink>
            </li>
            <li>
              <NavLink to="/">Term Of Us</NavLink>
            </li>
            <li>
              <NavLink to="/">AML&CFT</NavLink>
            </li>
            <li>
              <NavLink to="/">Privacy Policy</NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.box}>
          <h1>Help</h1>
          <ul>
            <li>
              <NavLink to="/">Suppurt</NavLink>
            </li>
            <li>
              <NavLink to="/">Api Suppurt</NavLink>
            </li>
            <li>
              <NavLink to="/">Coin/Token Listing</NavLink>
            </li>
            <li>
              <NavLink to="/">Partnership</NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.box}>
          <h1>About Us</h1>
          <ul>
            <li>
              <NavLink to="/">Our Team</NavLink>
            </li>
            <li>
              <NavLink to="/">Our Company</NavLink>
            </li>
            <li>
              <NavLink to="/">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/">Token Listing</NavLink>
            </li>
            <li>
              <NavLink to="/">Jouin Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.undeline} />
      <div className={classes.bottomSection}>
        <p>© 2018 Excoin. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
