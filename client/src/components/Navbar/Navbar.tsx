import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import logo from '../../assets/images/logo.png';
import './Navbar.scss';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <div className="logo-block">
                    <img src={logo} alt="logo" className="logo"/>
                    <span>Wallet</span>
                </div>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to='/operations' activeClassName="selected">Operations</NavLink>
                    </li>
                    <li>
                        <NavLink to='/categories' activeClassName="selected">Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to='/bills' activeClassName="selected">Bills</NavLink>
                    </li>
                    <li>
                        <NavLink to='/settings' activeClassName="selected">Settings</NavLink>
                    </li>
                    <li><a href='/' onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}