import React, { useState, useEffect } from "react";

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(term);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Search </label>
      <input onChange={(event) => setTerm(event.target.value)} />
    </form>
  );
};

export default SearchBar;
