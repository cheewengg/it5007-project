import "../css/styles.css";

import React, { useState, useEffect } from "react";

const SearchBar = ({ setQuery, placeHolder }) => {
  const [searchBuffer, setSearchBuffer] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setQuery(searchBuffer);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchBuffer]);

  return (
    <div className="section__searchBar">
      <input
        placeholder={placeHolder}
        className="searchBar__input"
        onChange={(e) => {
          setSearchBuffer(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
