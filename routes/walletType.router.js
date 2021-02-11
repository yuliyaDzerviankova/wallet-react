import express from "express";
import {addWalletType} from "../controllers/walletType.controller.js";

const walletTypeRouter = express.Router();

walletTypeRouter.use('/add', addWalletType);

export default walletTypeRouter;
