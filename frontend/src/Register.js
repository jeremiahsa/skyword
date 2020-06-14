import React, { useRef, useState }from 'react';
import { BookContextConsumer } from './themeContext';

/* http://v1k45.com/blog/modern-django-part-3-creating-an-api-and-integrating-with-react/ */

export default function Register() {
    const userName = useRef(null);
    const password = useRef(null);
    const [show, setShow]  = useState(false);
    if (show) {
        return (
            <BookContextConsumer>
                { context => (
                    <div>
                        <label htmlFor="userName">Username</label> <input className="register" id="username" ref={userName} />
                        <label htmlFor="password">Password</label> <input className="register" id="password" type="password" ref={password} />
                        <button className="register" onClick={() => context.Register({userName, password})}>Create Account and Log In</button>
                    </div>
                )}
            </BookContextConsumer>
        )
    } else {
        return (
            <BookContextConsumer>
                { context => (
                    <div><button className="register" onClick={() => setShow(!show)}>Register</button></div>
                )}
            </BookContextConsumer>
        )
    }
}