import express from "express";
import UserController from "../controllers/user.controller";
const route = express.Router();

route.post('/user', UserController.register); 
route.post('/login', UserController.login);
route.get('/me/:id', UserController.getMe);
route.get('/me', UserController.getMe);
route.delete('/delete/:id', UserController.deleteUser);
route.put('/update/:id', UserController.updateUser);

export default route; 