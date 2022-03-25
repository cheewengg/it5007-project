import "../css/styles.css";

import React, { useState, useEffect } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [searchBuffer, setSearchBuffer] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(searchBuffer);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchBuffer]);

  return (
    <div className="section__searchBar">
      <input
        placeholder="Search for a ticker"
        className="searchBar__input"
        onChange={(e) => {
          setSearchBuffer(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
