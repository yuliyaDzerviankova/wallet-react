import React, {useEffect, useState} from 'react';
import './categories.scss';
import {Icon, List, ListItem, ListItemIcon, ListItemSecondaryAction} from "@material-ui/core";
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
    const [icons, setIcons] = useState([]);

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

    return (
        <div className="categories">
            <div className="list profits">
                <h3>Доходы</h3>
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
            <div className="icons">
                <ul style={{listStyleType: 'none'}}>
                    {icons && icons.map(({_id, icon}) => {
                        return <li key={_id}><Icon>{icon}</Icon></li>
                    })}
                </ul>
            </div>
            <div className="list expenses">
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