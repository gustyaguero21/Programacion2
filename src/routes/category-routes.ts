import { request, response, Router } from "express";
import { CategoryController } from "../controllers/CategoryController/CategoryController";


const catrouter = Router();
const categoryController = new CategoryController();

/*Categoria*/

catrouter.get("/add-category",(request,response)=>{
  response.render("./Category/add-category");
});

catrouter.post("/add-category",categoryController.handleCreateCategories);

catrouter.get("/list-category",categoryController.handleListCategories);

catrouter.get("/edit-category",categoryController.handleGetDataCategories);

catrouter.post("/edit-category",categoryController.handleUpdateCategories);

catrouter.post("/delete-category",categoryController.handleDeleteCategories);

catrouter.get("/search-category",categoryController.handleSearchCategories);

export { catrouter };
