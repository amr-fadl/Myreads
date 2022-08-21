import React from "react";
import Books from "./Books";

const Read = (props) => {
    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <div className="bookshelf-books">
        <Books props={props} shelfs={'read'}/>
      </div>
    </div>
  );
};

export default Read;
