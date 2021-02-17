import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {useHistory} from "react-router-dom";
import './login.scss';
import {Button, Card, CardContent, TextField, Typography} from "@material-ui/core";

const Login = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {loading, request} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const [error, setError] = useState('');

    const changeHandle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const login = async () => {
        try {
            const data = await request(
                '/api/auth/login',
                'POST',
                {...form}
            );
            auth.login(data.token, data.userId);
            sessionStorage.setItem('userData', JSON.stringify({
                userId: data.userId,
                token: data.token
            }));
            history.push('/main/operations');
        } catch (e) {
            setError(e.message);
            setTimeout(() => setError(''), 1500);
        }
    };

    return (
        <div className="row">
            <Card className="card">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Авторизация</Typography>
                    <TextField
                        className="item"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={changeHandle}
                    />
                    <TextField
                        className="item"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={changeHandle}
                    />
                    <span className="error">{error}</span>
                    <div className="buttons">
                        <Button
                            size="medium"
                            color="primary"
                            onClick={login}
                            variant="contained"
                            disabled={loading}
                            style={{marginRight: '10px'}}
                        >Login</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;