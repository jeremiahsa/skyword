import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class ThemeContextProvider extends Component {
    state = {
        theme: "Day"
    };

    toggleTheme = () => {
        this.setState(prevState => {
            return {
                theme: prevState.theme === "Day" ? "Night" : "Day"
            };
        })
    }

    render() {
        return (
            <Provider
                value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
            >
                {this.props.children}
            </Provider>
        )
    }

}

class BookContextProvider extends Component {
    componentDidMount() {
        this.fetchAllBooks();
    }
    state = {
        books: []
    }
    fetchAllBooks() {
        fetch('/books.json')
        .then(res => res.json())
        .then(data => {
            this.setState({books: data});
        })
        .catch(console.log)
    }
    filterAuthor = (event) => {
        //console.log('Filtering by Author', event.target.value);
        if (event.target.value.length >= 3) {
            fetch('/book.json?author='+event.target.value)
            .then(res => res.json())
            .then(data => {
                this.setState({books:data});
            })
            .catch(console.log)
        }
    }
    addBookToShelf = (title, author) => {
        /* 
            This is a hacky way to do it, but trying to focus on demonstrating functionality first
            The right approach would be to map recommender to user in the database, 
            implement authentication, have a user log in, then POST the save back to the api
            to save the list. This would be the next step if time allows, since authentication
            wasn't in the project specification.
        */
        const { books } = this.state;
        console.log(title, author);
        let userBooks = books.filter(book => book.author===author && book.title === title);
        userBooks.forEach(book => {
            book.user = 'me';
        });
        this.setState({userBooks: userBooks});

    }
    AllBooksList = (event) => {
        this.fetchAllBooks();
    }
    FilterUserList = (event) => {
        const { books } = this.state;
        let userBooks = books.filter(book => book.user === 'me');
        this.setState({
            books: userBooks
        })
    }
    filterCount = (event) => {
        console.log('Filtering by Recommendation Count', event.target.value);
        if (event.target.value.length > 0) {
            fetch('/book.json?count='+event.target.value)
            .then(res => res.json())
            .then(data => {
                this.setState({books:data});
            })
            .catch(console.log)
        } else {
            this.fetchAllBooks();
        }
    }
    render() {
        return (
            <Provider
                value={{ 
                    books: this.state.books, 
                    filterAuthor: this.filterAuthor, 
                    FilterUserList: this.FilterUserList, 
                    addBookToShelf: this.addBookToShelf,
                    filterCount:this.filterCount,
                    AllBooksList:this.AllBooksList
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}

export { ThemeContextProvider, BookContextProvider, Consumer as BookContextConsumer };