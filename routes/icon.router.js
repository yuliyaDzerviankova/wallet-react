import express from "express";
import {getIcons, updateIcons} from "../controllers/icons.controller.js";
import passport from 'passport';

const iconRouter = express.Router();

iconRouter.use('/update', updateIcons);
// iconRouter.use('/', passport.authenticate('jwt', {session: false}), getIcons);
iconRouter.use('/', getIcons);

export default iconRouter;
