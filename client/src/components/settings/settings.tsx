import {Button, Card, CardActions, CardContent, TextField} from '@material-ui/core';
import React from 'react';
import './settings.scss';

export default function Settings() {
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
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                    >Save</Button>
                </CardActions>
            </Card>
        </form>
    );
}