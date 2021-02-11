// const mongoose = require("mongoose");
// const {errorHandler} = require("../utils/errorHandler");
// const Expense = require("../models/Expense");
// const Wallet = require("../models/Wallet");
//
// export const addExpense = async (request, response) => {
//     try {
//         const {name, category, note, cost, wallet, date} = request.body;
//         const expense = await new Expense({
//             name,
//             expenseType: category,
//             note,
//             cost,
//             wallet,
//             date
//         });
//
//         expense.save();
//         Wallet.findOneAndUpdate(
//             {_id: wallet._id},
//             {
//                 $push: {
//                     expenses: expense
//                 }
//             }, {new: true, returnOriginal: false},
//             function (err, wallet) {
//                 mongoose.disconnect();
//                 if (err) return console.log(err);
//                 response.status(201).json(expense);
//             }
//         );
//     } catch (e) {
//         errorHandler(response, e);
//     }
// }