import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useHistory} from "react-router-dom";

const Login = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        M.updateTextFields();
    }, []);

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
            history.push('/main');
        } catch (e) {
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Авторизация</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandle}
                                    className="yellow-input"
                                    placeholder="Enter email"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandle}
                                    className="yellow-input"
                                    placeholder="Enter password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: '10px'}}
                            disabled={loading}
                            onClick={login}
                        >Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;