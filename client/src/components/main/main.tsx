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
import {log} from "util";

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
        _id: "",
        walletType: {
            id: '',
            name: ''
        },
        note: "",
        start_date: ""
    }]);
    const [usedWallet, setUsedWallet] = useState({
        _id: '',
        note: '',
        prevState: {_id: '', note: ''} || null
    });

    useEffect(() => {
        console.log(usedWallet)
    }, [usedWallet]);

    const userData = JSON.parse(sessionStorage.getItem('userData') as string) || '';

    useEffect(() => {
        if (userData && userData.token) {
            axios
                .get('/api/users/', {
                    headers: {
                        'Authorization': `Bearer ${userData.token}`
                    }
                }).then(({data}) => {
                if (data.wallets) {
                    setUsedWallet(data.wallets[0]);
                    setWallets(data.wallets);
                }
            });
        }
    }, []);


    const changeWallet = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log(event)
        // setUsedWallet(event.target.value);
    };

    return (
        <div className="container">
            <Navbar/>
            <FormControl className="wallets-list">
                <InputLabel htmlFor="wallets">Choose wallet</InputLabel>
                <Select
                    id="wallets"
                    value={usedWallet._id}
                    onChange={(event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
                        let wallet = wallets.find(wallet => wallet._id === event.target.value);
                        setUsedWallet({
                            // @ts-ignore
                            _id: event.target.value,
                            // @ts-ignore
                            note: wallet.note
                        });
                    }}
                >
                    {wallets && wallets.map((wallet, index) => {
                        return (
                            <MenuItem
                                key={wallet._id}
                                className="item"
                                value={wallet._id}
                            >
                                {wallet.note}
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