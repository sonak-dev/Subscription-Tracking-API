import { Router } from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";

import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();


userRouter.get(`/`, getUsers);


userRouter.get(`/:id`, authorize, getUser);


userRouter.post(`/`, createUser);


userRouter.put(`/:id`, updateUser);


userRouter.delete(`/:id`, authorize, deleteUser);




export default userRouter;