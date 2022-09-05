import express from 'express';
import userRoute from './users.router'
const Router = express.Router();

Router.use('/', userRoute);

export default Router;
