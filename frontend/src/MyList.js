import React from 'react';
import { BookContextConsumer } from './themeContext';

function MyList() {
    return(
        <BookContextConsumer>
        {context => (
            <div>
                <button onClick={context.AllBooksList}>All Books</button>
                <button onClick={context.FilterUserList}>My List</button>
            </div>
        )}
        </BookContextConsumer>
    )
}
export default MyList;