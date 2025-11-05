import { Router } from "express";
import { getUser, getUsers, createUser, updateUser } from "../controllers/user.controllers.js";

import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();


userRouter.get(`/`, getUsers);


userRouter.get(`/:id`, authorize, getUser);


userRouter.post(`/`, createUser);


userRouter.put(`/:id`, updateUser);


userRouter.delete(`/:id`, (req, res) => res.send({title: 'DELETE user'}));




export default userRouter;