import React from 'react';
import { BookContextConsumer } from './themeContext';

function BookFilter() {
    return (
        <BookContextConsumer>
            { context => (
            <div className="bookFilter row">
                <div className="col-sm-6 col-md-6">
                    <label htmlFor="filter_author">Filter By Author </label> 
                    <input id="filter_author" onKeyUp={context.filterAuthor} />
                </div>
                <div className="col-sm-6 col-md-6">
                    <label htmlFor="filter_author">Filter By Rating </label> 
                    <input id="filter_rating" onKeyUp={context.filterCount} />
                </div>
            </div>   
            )}
        </BookContextConsumer>
    )
}

export default BookFilter;