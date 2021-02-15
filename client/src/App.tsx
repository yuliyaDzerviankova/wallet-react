import React, {useEffect} from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom';
import './App.scss';
import {useAuth} from "./hooks/auth.hook";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Main from "./components/main/main";

function App() {
    const {token, login, userId, logout} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    const userData = JSON.parse(sessionStorage.getItem('userData') as string);
    const history = useHistory();

    // useEffect(() => {
    //     if (userData && userData.token) {
    //         console.log(history)
    //         history.push('/main')
    //     }
    // }, [userData]);

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/main" component={Main}/>
                    <Redirect from="/" to="/login"/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
