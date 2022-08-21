import React from "react";
import Books from "./Books";

const CurrentlyReading = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <Books props={props} shelfs={'currentlyReading'}/>
      </div>
    </div>
  );
};

export default CurrentlyReading;
