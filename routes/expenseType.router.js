const {Router} = require("express");

const expenseTypeRouter = Router();

expenseTypeRouter.use('/update/:id', updateExpenseType);
expenseTypeRouter.use('/delete/:id', deleteExpenseType);
expenseTypeRouter.use('/add', addExpenseType);
expenseTypeRouter.use('/:id', getExpenseTypeById);
expenseTypeRouter.use('/', getExpensesType);

module.exports = expenseTypeRouter;
