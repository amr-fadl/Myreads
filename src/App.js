import { useState , useEffect } from "react";
import { BrowserRouter , Router , Route , Link, Routes } from "react-router-dom";
import "./App.css";
import {getAll, update , search} from './BooksAPI'
import CurrentlyReading from "./components/CurrentlyReading";
import WantToRead from "./components/WantToRead";
import Read from "./components/Read";
import SearchPage from './components/SearchPage'

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);


  const [alldata , setAlldata] = useState([])
  const [changeShelf , setChangeShelf] = useState('')


  useEffect( () => {
    getAll().then(e => {
      setAlldata(e)
    })
  },[alldata])


  // update Shalfe
  const updateShalfe = (book , val) => {
    update(book , val)
    setChangeShelf(alldata)
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
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
                <Link to="search">Add a book</Link>
              </div>
            </div>
          } />
          <Route path="search" element={
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <SearchPage handleSearch={handleSearch} />
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {SearchData != ''&&
                      SearchData.map( item => {
                        // alldata.filter(e => e.id == item.id).map(el => console.log(item))
                        // alldata.map(el => console.log(el.id == item.id ? el.shelf : ''))

                       
                        let amr = alldata.filter(el => el.id == item.id).map(e => e.shelf)
                        // console.log(amr != '' ? amr : 'none');
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
                                <select onChange={e => updateShalfe(item , e.target.value)} value={`${amr != '' ? amr : 'none'}`}>
                                    <option value="none">None</option>
                                    <option value="currentlyReading">
                                    Currently Reading
                                    </option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
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
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
