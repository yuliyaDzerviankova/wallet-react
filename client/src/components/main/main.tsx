import React, {FunctionComponent, useEffect, useState} from "react";
import './main.scss';
import {Navbar} from "../navbar/navbar";
import {Route, Switch} from "react-router-dom";
import Operations from "../operations/operations";
import Settings from "../settings/settings";
import Bills from "../bills/bills";
import Categories from "../categories/categories";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import axios from "axios";

interface Props {
    match: {
        url: string;
    }
}

const Main: FunctionComponent<Props> = props => {
    const [wallets, setWallets] = useState([]);
    const [usedWallet, setUsedWallet] = useState({});
    const userData = JSON.parse(sessionStorage.getItem('userData') as string) || '';

    useEffect(() => {
        if (userData && userData.token) {
            axios
                .get('/api/users/', {
                    headers: {
                        'Authorization': `Bearer ${userData.token}`
                    }
                }).then(({data}) => {
                console.log(data)
            });
        }
    }, [wallets]);

    return (
        <div className="container">
            <Navbar/>
            <FormControl className="wallets-list">
                <InputLabel id="wallets">Choose wallet</InputLabel>
                <Select
                    // className="wallets-list"
                    labelId="wallets"
                >
                    <MenuItem className="item" value="1">Wallet 1</MenuItem>
                    <MenuItem className="item" value="2">Wallet 2</MenuItem>
                    <MenuItem className="item" value="3">Wallet 3</MenuItem>
                </Select>
            </FormControl>
            <Switch>
                <Route path={`${props.match.url}/operations`} component={Operations}/>
                <Route path={`${props.match.url}/settings`} component={Settings}/>
                <Route path={`${props.match.url}/bills`} component={Bills}/>
                <Route path={`${props.match.url}/categories`} component={Categories}/>
            </Switch>
        </div>
    );
};

export default Main;