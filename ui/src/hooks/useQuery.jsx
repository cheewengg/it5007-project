import React, { useState, useEffect } from "react";

const useQuery = (
  defaultSearchTerm,
  {
    searchData,
    dateRange: defaultDateRange,
    lookBackDuration: defaultLookBackDuration,
  }
) => {
  const [data, setData] = useState({});

  useEffect(() => {
    searchAndUpdate(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const searchAndUpdate = async (
    searchQuery,
    dateRange = defaultDateRange,
    lookBackDuration = defaultLookBackDuration
  ) => {
    const res = await searchData(searchQuery, dateRange, lookBackDuration);
    setData(res);
  };

  return [data, searchAndUpdate];
};

export default useQuery;
