import React, { useState, useEffect } from "react";

const SearchBar = ({
  currentDateRange,
  currentLookBackRange,
  searchPrimaryData,
  searchSecondaryData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPrimaryData(searchQuery, currentDateRange);
    searchSecondaryData(searchQuery, currentDateRange, currentLookBackRange);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Search </label>
      <input onChange={(event) => setSearchQuery(event.target.value)} />
    </form>
  );
};

export default SearchBar;
