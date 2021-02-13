import React from 'react';
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import Login from "./login";
import Register from "./register";

export default function Auth() {

    return (
        <>
            <nav>
                <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                    <span className="brand-logo">Wallet</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/register'>Register</NavLink></li>
                    </ul>
                </div>
            </nav>

            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Redirect exact to="/login"/>
            </Switch>
        </>
    );
}