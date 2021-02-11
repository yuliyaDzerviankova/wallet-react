import {Switch, Route, Redirect} from "react-router-dom";
import OperationsPage from "./pages/OperationsPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/authPage/AuthPage";

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/operations' exact>
                    <OperationsPage/>
                </Route>
                <Route path='/settings' exact>
                    <SettingsPage/>
                </Route>
                <Redirect to='/operations'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
};