import React from 'react'
import Books from "./Books";

const WantToRead = (props) => {
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">Want to Read</h2>
    <div className="bookshelf-books">
      <Books props={props} shelfs={'wantToRead'}/>
    </div>
  </div>
  )
}

export default WantToRead
