import {Button, Card, CardContent, TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './settings.scss';
import axios from "axios";
import {useHistory} from "react-router-dom";
import classnames from 'classnames';

export default function Settings() {

    const userData = JSON.parse(sessionStorage.getItem('userData') as string) || '';
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const history = useHistory();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const getUser = () => {
        axios
            .get('/api/users/', {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            }).then(({data}) => {
            setUser({...data});
        });
    }

    useEffect(() => {
        if (userData && userData.token) {
            getUser();
        } else {
            history.push('/');
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const editUser = () => {
        if (user.password !== user.confirmPassword) {
            setError(true);
            setTimeout(() => setError(false), 1500);
        } else {
            const data = {
                name: user.name,
                password: user.password
            }
            axios.put('/api/users/update', data, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            }).then(({data}) => {
                setSuccess(true);
                setUser(data);
                setTimeout(() => setSuccess(false), 1500);

            }).catch(error => console.log(error));
        }
    };

    return (
        <form>
            <Card variant="outlined" className="root">
                <CardContent>
                    <TextField
                        name="name"
                        label="Name"
                        className="item"
                        variant="outlined"
                        value={user.name || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        disabled
                        name="email"
                        label="Email"
                        className="item"
                        variant="outlined"
                        value={user.email || ''}
                    />
                    <TextField
                        name="password"
                        type="password"
                        className={classnames(
                            "item",
                            {"error": error}
                        )}
                        label="Password"
                        variant="outlined"
                        onChange={handleChange}
                        value={user.password || ''}
                    />
                    <TextField
                        type="password"
                        className={classnames(
                            "item",
                            {"error": error}
                        )}
                        variant="outlined"
                        name="confirmPassword"
                        onChange={handleChange}
                        label="Confirm Password"
                        value={user.confirmPassword || ''}
                    />
                    <div className="buttons">
                        <Button
                            size="medium"
                            color="primary"
                            onClick={editUser}
                            variant="contained"
                        >Save</Button>
                        {error && <span className="error-edit">Check passwords</span>}
                        {success && <span className="success-edit">User was updated</span>}
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}