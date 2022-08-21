import { useState , useEffect } from "react";
import "./App.css";
import {getAll, update , search} from './BooksAPI'
import CurrentlyReading from "./components/CurrentlyReading";
import WantToRead from "./components/WantToRead";
import Read from "./components/Read";
import SearchPage from './components/SearchPage'

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);


  const [alldata , setAlldata] = useState([])
  useEffect( () => {
    getAll().then(e => {
      setAlldata(e)
    })
  },[alldata])


  // update Shalfe
  const updateShalfe = (book , val) => {
    update(book , val)

    console.log(book);
  }

  // handle Search Data
  const [SearchData , setSearchData] = useState('')
  useEffect( () => {
    setSearchData('')
  },[showSearchPage])
  const handleSearch = (q) => {
      if (q != '') {
        search(q).then(e => {
          if (Array.isArray(e)) {
            setSearchData(e)
          } else {
            setSearchData('')
          }
        })
      }else{
        setSearchData('')
      }
  }
  
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <SearchPage handleSearch={handleSearch} />
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {SearchData != ''&&
                  SearchData.map( item => {
                    return <li key={item.id}>
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
                            <select onChange={e => updateShalfe(item , e.target.value)} value={'none'}>
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
                  })
                }
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentlyReading updateShalfe={updateShalfe} alldata={alldata} />
              <WantToRead updateShalfe={updateShalfe} alldata={alldata} />
              <Read updateShalfe={updateShalfe} alldata={alldata} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
