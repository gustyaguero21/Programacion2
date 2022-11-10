import { Request, Response } from "express";
import { UserService } from "../../services/UserServices/UserServices";

class UserController {
    async handleCreateUsers(request: Request, response: Response) {
      const { nombre_usuario, correo, telefono, ciudad, provincia, contrasena } = request.body;
  
      const createUserService = new UserService();
  
      try {
        await createUserService.createUsers({
          nombre_usuario,
          correo,
          telefono,
          ciudad,
          provincia,
          contrasena
        }).then(() => {
          response.render("./User/message", {
            message: "Usuario creado con exito"
          });
        });
      } catch (err) {
        response.render("./User/message", {
          message: `Error al crear usuario: ${err.message}`
        });
      }
  
    }
    async handleDeleteUsers(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new UserService();
    
        try {
          await deleteUserService.deleteUsers(id).then(() => {
            response.render("./User/message", {
              message: "Usuario borrado con exito"
            });
          });
        } catch (err) {
          response.render("./User/message", {
            message: `Error al borrar usuario: ${err.message}`
          });
        }
      }
      async handleGetDataUsers(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getUserDataService = new UserService();
    
        const getUserData = await getUserDataService.getDataUsers(id);
    
        return response.render("./User/edit-user", {
          getUserData: getUserData
        });
      }
      async handleListUsers(request: Request, response: Response) {
        const listUserService = new UserService();
    
        const listUser= await listUserService.listUsers();
    
        return response.render("./User/list-user", {
          listUser:listUser
        });
      }
      async handleSearchUsers(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchUserService = new UserService();
    
        try {
          const searchUser = await searchUserService.searchUsers(search);
          response.render("./User/search-user", {
           searchUser:searchUser,
            search: search
          });
        } catch (err) {
          response.render("./User/message", {
            message: `Error al buscar usuario: ${err.message}`
          });
        }
      }
      async handleUpdateUser(request: Request, response: Response) {
        const { id, nombre_usuario, correo, telefono, ciudad, provincia, contrasena } = request.body;
    
        const updateUser = new UserService();
    
        try {
          await updateUser.updateUsers({ id, nombre_usuario, correo, telefono, ciudad, provincia, contrasena }).then(() => {
            response.render("./User/message", {
              message: "Usuario actualizado con exito"
            });
          });
        } catch (err) {
          response.render("./User/message", {
            message: `Error al actualizar usuario: ${err.message}`
          });
        }
    
      }
  }
  
  export { UserController };