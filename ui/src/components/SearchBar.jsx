import "../css/styles.css";
import React, { useState } from "react";

const SearchBar = ({
  currentDateRange,
  currentLookBackRangePx,
  currentLookBackRangeVol,
  searchData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchPrimaryData, searchSecondaryDataPx, searchSecondaryDataVol } =
    searchData;

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPrimaryData(searchQuery, currentDateRange);
    searchSecondaryDataPx(
      searchQuery,
      currentDateRange,
      currentLookBackRangePx
    );
    searchSecondaryDataVol(
      searchQuery,
      currentDateRange,
      currentLookBackRangeVol
    );
  };

  return (
    <form className="section__searchBar" onSubmit={handleSubmit}>
      <input
        placeholder="Search for a ticker"
        className="searchBar__input"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
