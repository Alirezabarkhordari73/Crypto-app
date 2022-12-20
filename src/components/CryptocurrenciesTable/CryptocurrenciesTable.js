import React from "react";

import "antd/dist/antd.css";
import { Table } from "antd";
import classes from "./cryptocurrenciesTable.module.css";

const CryptocurrenciesTable = ({ coinsData }) => {
  const { Column, ColumnGroup } = Table;

  if (!coinsData) return;

  const coinsDataSlice = coinsData.slice(0, 15).map((item) => ({
    key: item.uuid,
    name: item.name,
    price: item?.price,
    rank: item.rank,
    symbol: item.symbol,
    change: item.change,
  }));

  console.log("data", coinsDataSlice);

  return (
    <div className={classes.container}>
      <Table
        className={classes.table}
        dataSource={coinsDataSlice}
        bordered
        scroll={{ x: 1000, y: 800 }}>
        <Column
          className={classes.column}
          title="Coin Name"
          dataIndex="name"
          key="key"
        />
        <Column
          className={classes.column}
          title="Ranking"
          dataIndex="rank"
          key="key"
        />
        <Column
          className={classes.column}
          title="Price"
          dataIndex="price"
          key="key"
        />
        <Column
          className={classes.column}
          title="Symbol"
          dataIndex="symbol"
          key="key"
        />
        <Column
          className={classes.column}
          title="Change"
          dataIndex="change"
          key="key"
        />
      </Table>
    </div>
  );
};

export default CryptocurrenciesTable;
