import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import logo from '../../assets/images/logo.png';
import './navbar.scss';

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
            <div className="nav-wrapper" style={{padding: '0 2rem'}}>
                <div className="logo-block">
                    <img src={logo} alt="logo" className="logo"/>
                    <span>Wallet</span>
                </div>
                <ul className="menu">
                    <NavLink to='/main/operations' activeClassName="selected">
                        <li>Operations</li>
                    </NavLink>
                    <NavLink to='/main/categories' activeClassName="selected">
                        <li>Categories</li>
                    </NavLink>
                    <NavLink to='/main/bills' activeClassName="selected">
                        <li>Bills</li>
                    </NavLink>
                    <NavLink to='/main/settings' activeClassName="selected">
                        <li>Settings</li>
                    </NavLink>
                    <a href='/' onClick={logout}>
                        <li>Logout</li>
                    </a>
                </ul>
            </div>
        </nav>
    );
}