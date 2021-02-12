import {Redirect, Route, Switch} from "react-router-dom";
import OperationsPage from "./pages/OperationsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import BillsPage from "./pages/BillsPage";
import CategoriesPage from "./pages/CategoriesPage";

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path='/operations' component={OperationsPage}/>
                <Route path='/settings' component={SettingsPage} exact/>
                <Route path='/bills' component={BillsPage} exact/>
                <Route path='/categories' component={CategoriesPage} exact/>
                <Redirect to='/operations'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage/>
            </Route>
        </Switch>
    )
};