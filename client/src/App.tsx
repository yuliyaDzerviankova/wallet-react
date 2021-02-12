import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom';
// import './App.scss';
import 'materialize-css';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar/Navbar";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
    const {token, login, userId, logout} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{
            token, logout, login, userId, isAuthenticated
        }}>
            <Router>
                {isAuthenticated ? <Navbar/> : <AuthPage/>}
                <div className="container">
                    {/*{*/}
                    {/*    isAuthenticated &&*/}
                    <select>
                        <option value="0">Choose your option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                    {/*}*/}
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
