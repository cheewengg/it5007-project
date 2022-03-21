import "../styles/styles.css";
import React, { useState } from "react";

const SearchBar = ({
  currentDateRange,
  currentLookBackRangePx,
  searchData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchPrimaryData, searchSecondaryDataPx } = searchData;

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPrimaryData(searchQuery, currentDateRange);
    searchSecondaryDataPx(
      searchQuery,
      currentDateRange,
      currentLookBackRangePx
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
