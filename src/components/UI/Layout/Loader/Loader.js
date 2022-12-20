import React from "react";
import { Spin } from "antd";

import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loading}>
      <Spin className={classes.Spiner} />
      <h6>Loading ...</h6>
    </div>
  );
};

export default Loader;
