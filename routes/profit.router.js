import express from "express";
import {
    addProfit,
    getProfits,
    getProfitById,
    updateProfit,
    deleteProfit
} from "../controllers/profit.controller.js";
import {auth} from "../middleware/auth.js";

const profitRouter = express.Router();

profitRouter.use('/update/:id', updateProfit);
profitRouter.use('/delete/:id', deleteProfit);
profitRouter.use('/add', auth, addProfit);
profitRouter.use('/:id', getProfitById);
profitRouter.use('/', getProfits);

export default profitRouter;
