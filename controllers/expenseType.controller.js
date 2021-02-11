const mongoose = require("mongoose");
const ExpenseType = require('../models/ExpenseType');

const addExpenseType = (request, response) => {

    if (!request.body) return response.sendStatus(400);

    const {name, icon} = request.body;
    const expenseType = new ExpenseType({name, icon});

    expenseType.save(error => {
        if (error) return response.send(error);
        response.send(expenseType);
    })
}

const getExpensesType = (request, response) => {
    ExpenseType.find({}, function (err, expensesType) {

        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.send(expensesType);
    });
};

export const getExpenseTypeById = (request, response) => {
    ExpenseType.findById({_id: request.params.id}, function (err, expensesType) {
        if (err) return console.log(err);
        response.send(expensesType);
    });
};

export const updateExpenseType = (request, response) => {
    if (!request.params) return response.sendStatus(400);

    const {id} = request.params;
    const {body} = request;
    ExpenseType.findByIdAndUpdate(
        {_id: id},
        {$set: {...body}},
        {returnOriginal: false},
        (error, result) => {
            console.log(result);
            if (error) return console.log(error);
            response.send(result);
        });
}

export const deleteExpenseType = (request, response) => {
    if (!request.params) return response.sendStatus(400);

    const {id} = request.params;
    ExpenseType.deleteOne({_id: id}, (error, result) => {
        if (error) return console.log(error);

        response.send(result);
    });
};
