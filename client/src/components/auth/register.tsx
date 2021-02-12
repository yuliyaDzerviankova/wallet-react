import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

const Register = () => {
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '', password: '', name: ''
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

    const register = async () => {
        try {
            const data = await request(
                '/api/auth/register',
                'POST',
                {...form}
            );
            message(data.message);
        } catch (e) {
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Регистрация</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={changeHandle}
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
                            onClick={register}
                            disabled={loading}
                        >Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;