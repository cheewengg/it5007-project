import React, { useState, useEffect } from "react";
import { graphQLFetch } from "../misc/util.jsx";

const usePrimaryData = (defaultSearchTerm) => {
  const [primaryData, setPrimaryData] = useState({});

  useEffect(() => {
    searchPrimaryData(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const searchPrimaryData = async (searchQuery, dateRange = 100000) => {
    const query = `query {
          primaryData (ticker: "${searchQuery}", dateRange: ${dateRange}) {
            ticker ric name benchmark_index currency date px_last px_volume
          }
        }`;

    const { primaryData } = await graphQLFetch(query);
    if (!primaryData) return;

    const {
      ticker,
      ric,
      name,
      benchmark_index,
      currency,
      date,
      px_last,
      px_volume,
    } = primaryData;
    const primaryChartData = [["Date", "Close"]];

    date.forEach((_, idx) => {
      const currentDate = new Date(date[idx] * 1000);
      const currentPx = px_last[idx];

      primaryChartData.push([currentDate, currentPx]);
    });

    const res = {
      ticker,
      ric,
      name,
      benchmark_index,
      currency,
      primaryChartData,
    };
    setPrimaryData(res);
  };

  return [primaryData, searchPrimaryData];
};

export default usePrimaryData;
