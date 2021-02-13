import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.scss';
import {useAuth} from "./hooks/auth.hook";
import Operations from "./components/operations/operations";
import Settings from "./components/settings/settings";
import Bills from "./components/bills/bills";
import Categories from "./components/categories/categories";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Main from "./components/main/main";

function App() {
    const {token, login, userId, logout} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

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
        // <AuthContext.Provider value={{
        //     token, logout, login, userId, isAuthenticated
        // }}>
        //     <Router>
        //         {isAuthenticated ? <Navbar/> : <Auth/>}
        //         <div className="container">
        //             {/*{*/}
        //             {/*    isAuthenticated &&*/}
        //             <select>
        //                 <option value="0">Choose your option</option>
        //                 <option value="1">Option 1</option>
        //                 <option value="2">Option 2</option>
        //                 <option value="3">Option 3</option>
        //             </select>
        //             {/*}*/}
        //             {routes}
        //         </div>
        //     </Router>
        // </AuthContext.Provider>
    );
}

export default App;
