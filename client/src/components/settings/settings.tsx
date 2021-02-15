import {Button, Card, CardContent, TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './settings.scss';
import axios from "axios";

export default function Settings() {

    const userData = JSON.parse(sessionStorage.getItem('userData') as string) || '';
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (userData && userData.token) {
            axios
                .get('/api/users/', {
                    headers: {
                        'Authorization': `Bearer ${userData.token}`
                    }
                }).then(({data}) => {
                setUser({...data});
            });
        }
    }, []);

    useEffect(() => {
        console.log(user)
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    return (
        <form>
            <Card variant="outlined" className="root">
                <CardContent>
                    <TextField
                        className="item"
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <TextField
                        className="item"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={user.email}
                        disabled
                    />
                    <TextField
                        className="item"
                        name="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <TextField
                        className="item"
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        value={user.confirmPassword}
                        onChange={handleChange}
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