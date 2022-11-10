import { request, response, Router } from "express";
import { ProductController} from "../controllers/ProductController/ProductController";

const prodrouter = Router();
const productController = new ProductController();

/*Producto*/

prodrouter.get("/add-product",(request,response)=>{
    response.render("./Product/add-product");
  });
  

prodrouter.post("/add-product",productController.handleCreateProducts);
  
prodrouter.get("/list-product",productController.handleListProducts);
  
prodrouter.get("/edit-product",productController.handleGetDataProducts);
  
prodrouter.post("/edit-product",productController.handleUpdateProducts);
  
prodrouter.post("/delete-product",productController.handleDeleteProducts);
  
prodrouter.get("/search-product",productController.handleSearchProducts);
  
export{ prodrouter };