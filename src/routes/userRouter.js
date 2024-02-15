const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/usercontroller");
const validateId = require("../middleware/validateId");
//get request
userRouter.get("/users", validateId, userController.getUserData);

//post data
userRouter.post("/users", validateId, userController.createUser);

//get one
userRouter.get("/users/:id", validateId, userController.getOneUser);

//update
userRouter.patch("/users/:id", validateId, userController.updateUser);

//delete
userRouter.delete("/users/:id", validateId, userController.deleteUser);

module.exports = userRouter;
