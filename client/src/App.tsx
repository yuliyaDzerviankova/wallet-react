import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom';
// import './App.scss';
import 'materialize-css';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";

function App() {
    const {token, login, userId, logout} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{
            token, logout, login, userId, isAuthenticated}}>
            <Router>
                {isAuthenticated && <Navbar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
