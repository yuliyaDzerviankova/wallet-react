import React, {FunctionComponent} from 'react';
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register";
import '../navbar/navbar.scss';
import './auth.scss';
import logo from "../../assets/images/logo.png";

interface Props {
    match: {
        url: string;
    }
}

const Auth: FunctionComponent<Props> = props => {

    return (
        <>
            <nav>
                <div className="nav-wrapper" style={{padding: '0 2rem'}}>
                    <div className="logo-block">
                        <img src={logo} alt="logo" className="logo"/>
                        <span>Wallet</span>
                    </div>
                    <ul className="menu">
                        <NavLink to='/auth/login' activeClassName="selected">
                            <li>Login</li>
                        </NavLink>
                        <NavLink to='/auth/register' activeClassName="selected">
                            <li>Register</li>
                        </NavLink>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <Switch>
                    <Route path={`${props.match.url}/login`} component={Login}/>
                    <Route path={`${props.match.url}/register`} component={Register}/>
                    <Redirect from="/auth" to="/auth/login"/>
                </Switch>
            </div>
        </>
    );
}

export default Auth;