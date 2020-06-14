import React, { useState } from 'react';
import { BookContextConsumer } from './themeContext';
import Login from './Login';
import Register from './Register';

function MyList() {
    const [ all, setAll ] = useState(true);
    const [ us, setUs ] = useState(false);
    return(
        <BookContextConsumer>
        {context => (
            <div className="container">
                {!context.show ? 
                    <div className="container">
                        <div className="row"><Login /><Register /></div>
                    </div>
                : <>{context.userName}</>}
                    <div className="row ToggleMenu">
                        <div className="col-6"><button className={all ? 'selected' : 'deselected'} onClick={() => { setAll(!all); setUs(!us); context.AllBooksList()}}>All Books</button></div>
                        <div className="col-6"><button className={us ? 'selected' : 'deselected'} onClick={() => { setUs(!us); setAll(!all); context.FilterUserList()}}>My List</button></div>
                    </div>
            </div>
        )}
        </BookContextConsumer>
    )
}
export default MyList;