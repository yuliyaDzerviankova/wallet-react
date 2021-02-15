import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
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
    const [wallets, setWallets] = useState([{
        start_balance: 0,
        balance: 0,
        profits_cost: 0,
        expenses_cost: 0,
        profits: [],
        expenses: [],
        id: "",
        walletType: {
            id: '',
            name: ''
        },
        note: "",
        start_date: ""

    }]);
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
                if (data.wallets.length !== 0) {
                    setWallets(data.wallets);
                    setUsedWallet(wallets[0]);
                    console.log(wallets)
                }
            });
        }
    }, []);

    const changeWallet = (event:  ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        // setUsedWallet(event.target.value);
    };

    return (
        <div className="container">
            <Navbar/>
            <FormControl className="wallets-list">
                <InputLabel id="wallets">Choose wallet</InputLabel>
                <Select
                    labelId="wallets"
                    value={usedWallet}
                    onChange={changeWallet}
                >
                    {wallets && wallets.map(wallet => {
                        return (
                            <MenuItem
                                key={wallet.id}
                                className="item"
                                value={wallet}
                            >
                                {wallet.note || wallet.walletType.name}
                            </MenuItem>
                        )
                    })}
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