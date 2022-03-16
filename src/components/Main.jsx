import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery.jsx";
import SearchBar from "./SearchBar.jsx";
import DateRange from "./DateRange.jsx";
import StockChart from "./StockChart.jsx";

const Main = () => {
  const [[displayTitle, displayData], searchData] =
    useQuery("601990 CH Equity");

  return (
    <div>
      <SearchBar onFormSubmit={searchData} />
      <DateRange currentTitle={displayTitle} onClick={searchData} />
      <StockChart displayTitle={displayTitle} displayData={displayData} />
    </div>
  );
};

export default Main;
