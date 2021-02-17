import React from 'react';
import {useRoutes} from "./routes";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import './App.scss';
import {useAuth} from "./hooks/auth.hook";
import Main from "./components/main/main";
import Auth from "./components/auth/auth";
import Register from "./components/auth/register/register";
import Login from "./components/auth/login/login";

function App() {
    const {token, login, userId, logout} = useAuth();
    const isAuthenticated = !!token;
    // const routes = useRoutes(isAuthenticated);
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
            <Switch>
                {/*<Route path="/login" component={Login}/>*/}
                {/*<Route path="/register" component={Register}/>*/}
                <Route path="/auth" component={Auth}/>
                <Route path="/main" component={Main}/>
                <Redirect from="/" to="/auth"/>
            </Switch>
        </>
    );
}

export default App;
