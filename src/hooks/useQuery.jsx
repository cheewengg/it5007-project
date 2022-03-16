import React, { useState, useEffect } from "react";
import { graphQLFetch } from "../misc/util.jsx";

const useQuery = (defaultSearchTerm) => {
  const [data, setData] = useState(["", []]);

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (ticker, dateRange = 100000) => {
    const query = `query {
          historicalData (ticker: "${ticker}", dateRange: ${dateRange}) {
            ticker date px_last px_volume
          }
        }`;

    const { historicalData } = await graphQLFetch(query);
    if (!historicalData) return;

    const { date, px_last, px_volume } = historicalData;
    const res = [["Date", "Close"]];

    date.forEach((_, idx) => {
      const currentDate = new Date(date[idx] * 1000);
      const currentPx = px_last[idx];
      res.push([currentDate, currentPx]);
    });

    setData([ticker, res]);
  };

  return [data, search];
};

export default useQuery;
