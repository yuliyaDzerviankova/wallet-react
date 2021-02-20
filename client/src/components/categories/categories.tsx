import React, {ChangeEvent, SetStateAction, useEffect, useState} from 'react';
import './categories.scss';
import {
    Button, Card, CardContent,
    FormControl,
    Icon,
    Input, InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction, MenuItem,
    Select, TextField, Typography
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/EditOutlined';
import axios from "axios";

class MaterialIcon extends React.Component<{ icon: string }> {
    render() {
        const {icon} = this.props;
        return <Icon>{icon}</Icon>;
    }
}

export default function Categories() {

    const [profitTypes, setProfitTypes] = useState([]);
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [icons, setIcons] = useState([{
        _id: '',
        icon: ''
    }]);
    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState({
        _id: '',
        icon: ''
    });
    const [title, setTitle] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    const getProfitTypes = () => {
        axios.get('/api/profitsType')
            .then(({data}) => {
                setProfitTypes(data);
                console.log(data)
            });
    };

    const getExpenseTypes = () => {
        axios.get('/api/expensesType')
            .then(({data}) => {
                setExpenseTypes(data);
                console.log(data)
            });
    };

    const getIcons = () => {
        axios.get('/api/icons')
            .then(({data}) => {
                setIcons(data);
            });
    };

    useEffect(() => {
        getProfitTypes();
        getExpenseTypes();
        getIcons();
    }, []);

    const changeHandle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(event.target.value);
    }

    return (
        <div className="categories">
            <div className="list profits">
                <h3>
                    Доходы
                    <Icon
                        onClick={() => {
                            setTitle('доход');
                            setShowAdd(true);
                        }}
                    >add</Icon>
                </h3>
                {
                    profitTypes.length ?
                        <List>
                            {
                                profitTypes.length &&
                                profitTypes.map(({_id, name, icon}) => {
                                    return (
                                        <>
                                            <ListItem
                                                key={_id}
                                                className="item"
                                            >
                                                <ListItemIcon>
                                                    <Icon>{icon}</Icon>
                                                </ListItemIcon>
                                                {name}
                                                <ListItemSecondaryAction>
                                                    <EditIcon/>
                                                </ListItemSecondaryAction>
                                            </ListItem>

                                        </>
                                    )
                                })}
                        </List> :
                        <span>List is empty</span>
                }
            </div>
            {
                showAdd &&
                <Card className="add-category">
                    <Typography gutterBottom variant="h5" component="h2">Добавить {title}</Typography>
                    <Icon
                        className="close"
                        onClick={() => {
                            setTitle('');
                            setShowAdd(false);
                        }}
                    >close</Icon>
                    <FormControl>
                        <InputLabel htmlFor="icons">Choose icon</InputLabel>
                        <Select
                            id="icons"
                            value={selectedIcon._id}
                            onChange={(event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
                                const icon = icons.find(icon => icon._id === event.target.value);
                                setSelectedIcon({
                                    // @ts-ignore
                                    _id: event.target.value,
                                    // @ts-ignore
                                    note: wallet.note,
                                    // @ts-ignore
                                    balance: wallet.balance
                                });
                            }}
                        >
                            {icons.map(({_id, icon}) => {
                                return <MenuItem key={_id}>{icon}</MenuItem>
                            })}
                        </Select>
                        <TextField
                            name="name"
                            type="text"
                            label="Name"
                            variant="outlined"
                            onChange={changeHandle}
                            style={{margin: '10px 0'}}
                        />
                        <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                        >Добавить</Button>
                    </FormControl>
                </Card>
            }
            {/*<div className="icons">*/}
            {/*    <ul style={{listStyleType: 'none'}}>*/}
            {/*        {icons && icons.map(({_id, icon}) => {*/}
            {/*            return <li key={_id}><Icon>{icon}</Icon></li>*/}
            {/*        })}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <div className="list expenses">
                <h3>
                    Расходы
                    <Icon
                        onClick={() => {
                            setTitle('расход');
                            setShowAdd(true);
                        }}
                    >add</Icon>

                </h3>
                {
                    expenseTypes.length ?
                        <List>
                            <ListItem></ListItem>
                            <ListItemSecondaryAction>
                                <EditIcon/>
                            </ListItemSecondaryAction>
                        </List> :
                        <span>List is empty</span>
                }
            </div>
        </div>
    );
}