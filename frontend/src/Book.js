import React from 'react';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }
    componentDidMount() {
      fetch('/books.json')
      .then(res => res.json())
      .then(data => {
        this.setState({books: data});
      })
      .catch(console.log)
    }
  
    render() {
      const { books } = this.state;
      return (
        <div>
          {books.map(book => {
            return (
            <>
              <div class="col3">{book.title}</div>
              <div class="col3">{book.author}</div>
            </>
            )
          })}
        </div>
      )
    }
  }
  
  export default Book;