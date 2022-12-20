import React from "react";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.app}>
      <header className={classes.header}>{props.header}</header>
      <main className={classes.main}>{props.children}</main>
      <footer className={classes.footer}>{props.footer}</footer>
    </div>
  );
};

export default Layout;
