import React from "react";

const SearchPage = (props) => {
  return (
    <div className="search-books-input-wrapper">
      <input onChange={e => setTimeout(() => props.handleSearch(e.target.value) , 500)} type="text" placeholder="Search by title, author, or ISBN" />
    </div>
  );
};

export default SearchPage;
