import express from "express";
import {
    addProfitType,
    getProfitsType,
    getProfitTypeById,
    updateProfitType,
    deleteProfitType
} from "../controllers/profitType.controller.js";

const profitTypeRouter = express.Router();

profitTypeRouter.use('/update/:id', updateProfitType);
profitTypeRouter.use('/delete/:id', deleteProfitType);
profitTypeRouter.use('/add', addProfitType);
profitTypeRouter.use('/:id', getProfitTypeById);
profitTypeRouter.use('/', getProfitsType);

export default profitTypeRouter;
