import { Request, Response } from "express";
import { CategoryService } from "../../services/CategoryServices/CategoryServices";

class CategoryController {
    async handleCreateCategories(request: Request, response: Response) {
      const { nombre_categoria } = request.body;
  
      const createCategoryService = new CategoryService();
  
      try {
        await createCategoryService.createCategories({
          nombre_categoria
        }).then(() => {
          response.render("./Category/message", {
            message: "Categoria creada con exito"
          });
        });
      } catch (err) {
        response.render("./Category/message", {
          message: `Error al crear categoria: ${err.message}`
        });
      }
  
    }
    async handleDeleteCategories(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteCategoryService = new CategoryService();
    
        try {
          await deleteCategoryService.deleteCategories(id).then(() => {
            response.render("./Category/message", {
              message: "Categoria borrada con exito"
            });
          });
        } catch (err) {
          response.render("./Category/message", {
            message: `Error al borrar categoria: ${err.message}`
          });
        }
      }
      async handleGetDataCategories(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getCategoryDataService = new CategoryService();
    
        const getCategoryData = await getCategoryDataService.getDataCategories(id);
    
        return response.render("./Category/edit-category", {
          getCategoryData: getCategoryData
        });
      }
      async handleListCategories(request: Request, response: Response) {
        const listCategoryService = new CategoryService();
    
        const listCategory = await listCategoryService.listCategories();
    
        return response.render("./Category/list-category", {
          listCategory: listCategory
        });
      }
      async handleSearchCategories(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchCategoryService = new CategoryService();
    
        try {
          const searchCategory = await searchCategoryService.searchCategories(search);
          response.render("./Category/search-category", {
            searchCategory: searchCategory,
            search: search
          });
        } catch (err) {
          response.render("./Category/message", {
            message: `Error al buscar categoria: ${err.message}`
          });
        }
      }
      async handleUpdateCategories(request: Request, response: Response) {
        const { id, nombre_categoria, descripcion } = request.body;
    
        const updateCategoryService = new CategoryService();
    
        try {
          await updateCategoryService.updateCategories({ id, nombre_categoria }).then(() => {
            response.render("./Category/message", {
              message: "Categoria actualizada con exito"
            });
          });
        } catch (err) {
          response.render("./Category/message", {
            message: `Error al actualizar categoria: ${err.message}`
          });
        }
    
      }
  }
  
  export { CategoryController };