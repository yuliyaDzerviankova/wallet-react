import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

export default function AuthPage() {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const [name, setName] = useState('');

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

    const register = async () => {
        try {
            const data = await request(
                '/api/auth/register',
                'POST',
                {...form, name}
            );
            message(data.message);
        } catch (e) {
        }
    };

    const login = async () => {
        try {
            const data = await request(
                '/api/auth/login.tsx',
                'POST',
                {...form}
            );
            auth.login(data.token, data.userId);
        } catch (e) {
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Авторизация</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={event => setName(event.target.value)}
                                    className="yellow-input"
                                    placeholder="Enter name"
                                />
                                <label htmlFor="name">Name</label>
                            </div>
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
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={register}
                            disabled={loading}
                        >Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}