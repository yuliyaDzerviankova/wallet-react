import React, {useState} from "react";
import {useHttp} from "../../../hooks/http.hook";
import {Button, Card, CardContent, TextField, Typography} from "@material-ui/core";

const Register = () => {
    const {loading, request} = useHttp();
    const [form, setForm] = useState({
        email: '', password: '', name: ''
    });
    const [error, setError] = useState('');

    const changeHandle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const register = async () => {
        try {
            const data = await request(
                '/api/auth/register',
                'POST',
                {...form}
            );
        } catch (e) {
            setError(e.message);
            setTimeout(() => setError(''), 1500);
        }
    };

    return (
        <div className="row">
            <Card className="card">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Регистрация</Typography>
                    <TextField
                        className="item"
                        name="name"
                        label="Name"
                        variant="outlined"
                        onChange={changeHandle}
                    />
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
                            onClick={register}
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

export default Register;