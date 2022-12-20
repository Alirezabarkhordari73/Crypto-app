import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage, News, Cryptos, CryptoDetail } from "./Pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cryptos" element={<Cryptos />} />
        <Route path="/news" element={<News />} />
        <Route path="/cryptos/:coinId" element={<CryptoDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
