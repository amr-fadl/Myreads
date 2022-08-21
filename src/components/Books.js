import React from 'react'

const Books = (props) => {
    return (
        <ol className="books-grid">
            {props.props.alldata.filter((e) => e.shelf == props.shelfs).map((item) => { 
            return(<li key={item.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: item.imageLinks ? `url(${item.imageLinks.smallThumbnail})` : 'url()'
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select onChange={e => props.props.updateShalfe(item , e.target.value)} value={item.shelf}>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                        <div className="book-title">{item.title ? item.title : ''}</div>
                        <div className="book-authors">{item.authors ? item.authors[0] : ''}</div>
                  </div>
                </li>
              );
            })}
        </ol>
  )
}

export default Books
