import React from 'react';
import { BookContextConsumer } from './themeContext';

function Book(props) {
    /*addBookToShelf() {
      console.log('book added');
    }*/
    return (
        <BookContextConsumer>
          { context => (
            <table className="table table-striped">
              <thead className="headerRow">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="tableRow">
              {context.books.map((book, index) => (
                  <tr key={"book"+index}>
                    <td key={"booktitle_"+index} >{book.title}</td>
                    <td key={"bookauthor_"+index} >{book.author}</td>
                    <td key={"booksave_"+index} ><button onClick={() => {context.addBookToShelf(book.title, book.author)}}>Save</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </BookContextConsumer>
    )
  }
  
  export default Book;