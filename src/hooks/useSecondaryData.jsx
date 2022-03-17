import React, { useState, useEffect } from "react";
import { graphQLFetch } from "../misc/util.jsx";

const useSecondaryData = (defaultSearchTerm) => {
  const [secondaryData, setSecondaryData] = useState({});

  useEffect(() => {
    searchSecondaryData(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const searchSecondaryData = async (
    searchQuery,
    dateRange = 100000,
    lookBackDuration = 90
  ) => {
    const query = `query {
            secondaryData (ticker: "${searchQuery}", dateRange: ${dateRange}, lookBackDuration: ${lookBackDuration}) {
                ticker benchmark_index date pxDelta pxDeltaVsIdx
            }
          }`;

    const { secondaryData } = await graphQLFetch(query);
    if (!secondaryData) return;

    const { ticker, benchmark_index, date, pxDelta, pxDeltaVsIdx } =
      secondaryData;

    const secondaryChartData = [["Date", "pxDelta", "pxDeltaVsIdx"]];

    date.forEach((_, idx) => {
      const currentDate = new Date(date[idx] * 1000);
      const currentPxDelta = pxDelta[idx];
      const currentPxDeltaVsIdx = pxDeltaVsIdx[idx];
      secondaryChartData.push([
        currentDate,
        currentPxDelta,
        currentPxDeltaVsIdx,
      ]);
    });

    const res = { ticker, benchmark_index, secondaryChartData };
    setSecondaryData(res);
  };

  return [secondaryData, searchSecondaryData];
};

export default useSecondaryData;
