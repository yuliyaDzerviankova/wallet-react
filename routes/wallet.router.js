import express from "express";
import {getWallets, addWallet, editWallet} from "../controllers/wallet.controller.js";
import {auth} from "../middleware/auth.js";

const walletRouter = express.Router();

walletRouter.use('/add', auth, addWallet)
walletRouter.use('/edit/:id', auth, editWallet)
walletRouter.use('/', auth, getWallets);

export default walletRouter;
