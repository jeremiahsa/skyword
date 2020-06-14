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
        books: [],
        currentUser: null,
        isUserList: false,
        show: false,
        token: null,
        user: null,
        userBooks: []
    }
    fetchAllBooks() {
        fetch('/books.json')
        .then(res => res.json())
        .then(data => {
            this.setState({
                books: data
            });
        })
        .catch(console.log)
    }
    fetchUserBooks() {
        if (this.state.currentUser !== null) {
            fetch('/reviewers.json?user_id='+this.state.currentUser)
            .then(res => res.json())
            .then(data => {
                /* I know, this isn't de-duplicated, but it needs to have a separate serializer 
                   for updating vs creating and I need to work it out.
                */
                data = data.filter(user => user.user===this.state.currentUser);
                let books = [];
                data.forEach(row => {
                    for (let i=0;i<row.books.length;i++) {
                        if (!books.includes(row.books[i])) {
                            books.push(row.books[i]);
                        }
                    }
                });
                books = Array.from(new Set(books));
                console.log(books);
                console.log(this.state.books.filter(row => this.state.userBooks.includes(row.book_id)));
                this.setState({
                    userBooks: books
                });
            })
        }
    }
    filterAuthor = (event) => {
        //console.log('Filtering by Author', event.target.value);
        if (event.target.value.length > 3) {
            fetch('/book.json?author='+event.target.value)
            .then(res => res.json())
            .then(data => {
                this.setState({books:data});
            })
            .catch(console.log)
        } else {
            this.setState({
                books: this.state.books.filter(book => {
                    console.log(book.author, book.author.substring(0,event.target.value.length), event.target.value, book.author.substring(0,event.target.value.length) === event.target.value);
                    return book.author.substring(0,event.target.value.length) === event.target.value;
                })
            })
            //this.fetchAllBooks();
        }
    }
    showRegistration = () => {
        this.setState({
            show: !this.state.show
        })
    }
    Register = (userName, password) => {
        console.log(userName)
        fetch('/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'username': userName.userName.current.value,
                'password': userName.password.current.value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('created: ', data )
            this.setState({
                token: data.token,
                currentUser: data.user.id,
                user: data.user,
                show: true
            })
            this.fetchUserBooks()
        })
        .catch(console.log)
    }
    LoginUser = (e) => {
        /* This is a way to just save the name so the list can be generated.
           Given more time, this could be associated with the user and a login
           form could be created. 
        */
        console.log(e)
        fetch('/auth/login/', {
            /* TODO: Change to a view-based endpoint where it will either get the 
               reviewer or create one, based on the name. */
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': e.userName.current.value,
                'password': e.password.current.value
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                token: data.token,
                currentUser: data.user.id,
                user: data.user,
                show: true,
            });
            this.fetchUserBooks();
        })
        .catch(console.log);
    }
    addBookToShelf = (book_id) => {
        const { currentUser, userBooks } = this.state;
        if (currentUser === null) {
            alert('Please Add your Name to the Field Above to save your list');
            return false;
        } 
        let book_ids = userBooks;
        book_ids.push(book_id);

        fetch('/reviewers/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "books":book_ids,
                "user":currentUser
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.fetchUserBooks()
        })
        .catch(console.log);
        /*
        let userBooks = books.filter(book => book.book_id===book_id);
        userBooks.forEach(book => {
            book.user = 'me';
        });
        this.setState({userBooks: userBooks});
        */

    }
    AllBooksList = (event) => {
        this.fetchAllBooks();
        this.setState({
            isUserList: false
        });
    }
    FilterUserList = (event) => {
        this.setState({
            isUserList: true
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
                    books: this.state.isUserList ? this.state.books.filter(row => this.state.userBooks.includes(row.book_id)) : this.state.books, 
                    filterAuthor: this.filterAuthor, 
                    FilterUserList: this.FilterUserList, 
                    addBookToShelf: this.addBookToShelf,
                    filterCount:this.filterCount,
                    AllBooksList:this.AllBooksList,
                    LoginUser: this.LoginUser,
                    showRegistration: this.showRegistration,
                    Register:this.Register,
                    show: this.state.show,
                    userName: this.state.userName
                }}
            >
                {this.props.children}
            </Provider>
        )
    }
}

export { ThemeContextProvider, BookContextProvider, Consumer as BookContextConsumer };