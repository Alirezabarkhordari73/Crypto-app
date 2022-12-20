import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "../Redux/Features/coinsSlice";
import newsReducer from "../Redux/Features/newsSlice";
import coinReducer from "../Redux/Features/coinDetailSlice";
import historyReducer from "../Redux/Features/coinHistorySlice";

// Logger with default options
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    coins: coinsReducer,
    news: newsReducer,
    coin: coinReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
