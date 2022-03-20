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
    <form onSubmit={handleSubmit}>
      <label>Search </label>
      <input onChange={(event) => setSearchQuery(event.target.value)} />
    </form>
  );
};

export default SearchBar;
