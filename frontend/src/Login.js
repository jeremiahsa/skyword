import React, { useRef } from "react";
import { BookContextConsumer } from "./themeContext";

function Login() {
    //const reviewerName = useRef(null);
    const userName = useRef(null);
    const password = useRef(null);
    return (
        <BookContextConsumer>
            { context => (
                <div>
                    <input className="register" id="username" ref={userName} />
                    <input className="register" id="password" type="password" ref={password} />
                    <button className="register" onClick={() => context.LoginUser({userName, password})}>Log In</button>
                </div>
            )}
        </BookContextConsumer>
    )
}

export default Login;

//<label htmlFor="reviewer">Reviewer Name</label><input id="reviewer" ref={reviewerName} />