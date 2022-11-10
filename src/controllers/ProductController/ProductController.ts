import { Request, Response } from "express";
import { ProductService } from "../../services/ProductServices/ProductServices";

class ProductController {
    async handleCreateProducts(request: Request, response: Response) {
      const { nombre_producto, marca, modelo, precio } = request.body;
  
      const createProductService = new ProductService();
  
      try {
        await createProductService.createProducts({
          nombre_producto,
          marca,
          modelo,
          precio
        }).then(() => {
          response.render("./Product/message", {
            message: "Producto creado con exito"
          });
        });
      } catch (err) {
        response.render("./Product/message", {
          message: `Error al crear producto: ${err.message}`
        });
      }
  
    }
    async handleDeleteProducts(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductService = new ProductService();
    
        try {
          await deleteProductService.deleteProducts(id).then(() => {
            response.render("./Product/message", {
              message: "Producto borrado con exito"
            });
          });
        } catch (err) {
          response.render("./Product/message", {
            message: `Error al borrar producto: ${err.message}`
          });
        }
      }
      async handleGetDataProducts(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getProductDataService = new ProductService();
    
        const getProductData = await getProductDataService.getDataProducts(id);
    
        return response.render("./Product/edit-product", {
          getProductData: getProductData
        });
      }
      async handleListProducts(request: Request, response: Response) {
        const listProductService = new ProductService();
    
        const listProduct = await listProductService.listProducts();
    
        return response.render("./Product/list-product", {
          listProduct: listProduct
        });
      }
      async handleSearchProducts(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchProductService = new ProductService();
    
        try {
          const searchProduct = await searchProductService.searchProducts(search);
          response.render("./Product/search-product", {
            searchProduct: searchProduct,
            search: search
          });
        } catch (err) {
          response.render("./Product/message", {
            message: `Error al buscar usuario: ${err.message}`
          });
        }
      }
      async handleUpdateProducts(request: Request, response: Response) {
        const { id, nombre_producto, marca, modelo, precio } = request.body;
    
        const updateProductService = new ProductService();
    
        try {
          await updateProductService.updateProducts({ id, nombre_producto, marca, modelo, precio }).then(() => {
            response.render("./Product/message", {
              message: "Producto actualizado con exito"
            });
          });
        } catch (err) {
          response.render("./Product/message", {
            message: `Error al actualizar producto: ${err.message}`
          });
        }
    
      }
  }
  
  export { ProductController };