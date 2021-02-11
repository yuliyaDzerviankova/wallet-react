// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import {config} from "../auth.config.js";
// import mongoose from "mongoose";
// import {userScheme} from "../models/User.js";
//
// const User = mongoose.model('User', userScheme);
// //
// // export const register = async (request, response) => {
// //     try {
// //         const {email, name, password} = request.body;
// //         const candidate = await User.findOne({email});
// //
// //         if (candidate) {
// //             return response.status(400).json({message: 'This user is already exists'});
// //         }
// //
// //         const hashedPassword = await bcrypt.hash(password, 12);
// //         const user = new User({email, name, password: hashedPassword, wallets: []});
// //
// //         await user.save();
// //
// //         response.status(201).json({message: 'User was created'});
// //
// //     } catch (e) {
// //         response.status(500).json({message: 'Ops... Something went wrong. Try again'});
// //     }
// // }
//
// export const login.tsx = async (request, response) => {
//     try {
//         const {email, password} = request.body;
//
//         const user = await User.findOne({email});
//
//         if (!user) {
//             return response.status(400).json({message: 'User not found'});
//         }
//
//         const isMatch = await bcrypt.compare(password, user.password);
//
//         if (!isMatch) {
//             return response.status(400).json({message: 'Invalid password, try again'});
//         }
//
//         const token = jwt.sign(
//             {userId: user.id},
//             config.secret,
//             {expiresIn: '7d'}
//         );
//
//         response.json({token, userId: user.id});
//
//     } catch (e) {
//         response.status(500).json({message: 'Ops... Something went wrong. Try again'});
//     }
// }
//
//
