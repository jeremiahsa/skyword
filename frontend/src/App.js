import React from 'react';
import Book from './Book';
import BookSearch from './BookSearch';
import MyList from './MyList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

/*
- Provide a UI that will search through the API and return de-duped results in a list based off the books `author`.
  Allow the ability to 
    select an item from the that list and 
    store it in a separate list viewable by the user.
- Use of `create-react-app` is encouraged
- Use of hooks, Context API, and other current React paradigms is *highly encouraged*.
- Tests are highly encouraged, but not necessary.
- Use whatever tooling you want (fetch API, Axios, etc.)
- No styling necessary, plain html will suffice, however if you do want to use styles, `styled-components` is highly encouraged.

*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Book Recommendation Master List</p>
        <MyList />
      </header>
      <div className="container">
        <BookSearch />
        <Book />
      </div>
    </div>
  );
}

export default App;
