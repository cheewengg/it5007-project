import "../css/styles.css";

import React from "react";
import SearchBar from "./SearchBar.jsx";

const AllFilters = ({ queryConfig }) => {
  const { setQueryEventName, setQueryTicker, setQueryCreator } = queryConfig;

  return (
    <div className="section__allFilters">
      <SearchBar placeHolder="Search by event" setQuery={setQueryEventName} />
      <SearchBar placeHolder="Search by ticker" setQuery={setQueryTicker} />
      <SearchBar placeHolder="Search by creator" setQuery={setQueryCreator} />
    </div>
  );
};

export default AllFilters;
