import {Button, Card, CardContent, TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './settings.scss';
import axios from "axios";

export default function Settings() {

    const userData = JSON.parse(sessionStorage.getItem('user') as string);
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log(userData)
        if (userData && userData.token) {
            axios.get('/api/users/', {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            }).then(({data}) => {
                console.log(data);
            });
        }
    }, []);

    return (
        <form>
            <Card variant="outlined" className="root">
                <CardContent>
                    <TextField
                        className="item"
                        name="name"
                        label="Name"
                        variant="outlined"
                    />
                    <TextField
                        className="item"
                        name="email"
                        label="Email"
                        variant="outlined"
                        disabled
                    />
                    <TextField
                        className="item"
                        name="password"
                        label="Password"
                        variant="outlined"
                    />
                    <TextField
                        className="item"
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                    >Save</Button>
                </CardContent>
            </Card>
        </form>
    );
}