import { getCustomRepository } from "typeorm";
import { Usuario } from "../../entities/Usuario";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";


interface IUsuario {
  id?:string;
  nombre_usuario: string;
  correo: string;
  telefono : string;
  ciudad: string;
  provincia: string;
  contrasena: string;
}

class UserService {
  async createUsers({ nombre_usuario, correo, telefono, ciudad, provincia, contrasena }: IUsuario) {
    if (!nombre_usuario || !correo || !telefono || !ciudad || !provincia || !contrasena) {
      throw new Error("Por favor llenar todos campos");
    }

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ nombre_usuario, correo, telefono});

    if (userAlreadyExists) {
      throw new Error("Usuario ya registrado");
    }

    const createUser = userRepository.create({ nombre_usuario, correo, telefono, ciudad, provincia, contrasena });

    await userRepository.save(createUser);

    return createUser;

  }
  async deleteUsers(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    const deleteUser = await userRepository
      .createQueryBuilder()
      .delete()
      .from(Usuario)
      .where("id = :id", { id })
      .execute();

    return deleteUser;

  }
  async getDataUsers(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    const getDataUser = await userRepository.findOne(id);

    return getDataUser;
  }
  async listUsers() {
    const userRepository = getCustomRepository(UserRepository);

    const listUser = await userRepository.find();

    return listUser;
  }
  async searchUsers(search: string) {
    if (!search) {
      throw new Error("Por favor rellena el campo de busqueda");
    }

    const userRepository = getCustomRepository(UserRepository);

    const searchUser = await userRepository
      .createQueryBuilder()
      .where("nombre_usuario like :search", { search: `%${search}%` })
      .orWhere("correo like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("ciudad like :search", { search: `%${search}%` })
      .orWhere("provincia like :search", { search: `%${search}%` })
      .getMany();

    return searchUser;

  }
  async updateUsers({ id, nombre_usuario, correo, telefono, ciudad, provincia, contrasena }: IUsuario) {
    const userRepository = getCustomRepository(UserRepository);

    const updateUser = await userRepository
      .createQueryBuilder()
      .update(Usuario)
      .set({ nombre_usuario, correo, telefono, ciudad, provincia, contrasena })
      .where("id = :id", { id })
      .execute();

    return updateUser;

  }
}

export { UserService };