import {Redirect, Route, Switch} from "react-router-dom";
import Operations from "./components/operations/operations";
import Settings from "./components/settings/settings";
import Auth from "./components/auth/auth";
import Bills from "./components/bills/bills";
import Categories from "./components/categories/categories";

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path='/operations' component={Operations}/>
                <Route path='/settings' component={Settings} exact/>
                <Route path='/bills' component={Bills} exact/>
                <Route path='/categories' component={Categories} exact/>
                <Redirect to='/operations'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <Auth/>
            </Route>
        </Switch>
    )
};