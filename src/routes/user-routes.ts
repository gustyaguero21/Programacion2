import { request, response, Router } from "express";
import { UserController } from "../controllers/UserController/UserController";

const userrouter = Router();
const userController = new UserController();
  
userrouter.get("/add-user",(request, response)=>{
    response.render("./User/add-user");
});
  
userrouter.post("/add-user",userController.handleCreateUsers);
  
userrouter.get("/list-user",userController.handleListUsers);
  
userrouter.get("/edit-user",userController.handleGetDataUsers);
  
userrouter.post("/edit-user",userController.handleUpdateUser);
  
userrouter.post("/delete-user",userController.handleDeleteUsers);
  
userrouter.get("/search-user",userController.handleSearchUsers);

export{ userrouter};