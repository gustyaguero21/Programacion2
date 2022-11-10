import { getCustomRepository } from "typeorm";
import { Categoria } from "../../entities/Categoria";
import { CategoryRepository } from "../../repositories/CategoryRepository/CategoryRepository";

interface ICategoria {
  id?: string;
  nombre_categoria: string;
}

class CategoryService {
  async createCategories({ nombre_categoria }: ICategoria) {
    if (!nombre_categoria) {
      throw new Error("Por favor rellene todos los campos");
    }

    const categoryRepository = getCustomRepository(CategoryRepository);

    const categoryAlreadyExists = await categoryRepository.findOne({ nombre_categoria});
    
    if (categoryAlreadyExists) {
      throw new Error("Categoria ya registrada ");
    }
    const createCategory = categoryRepository.create({ nombre_categoria });

    await categoryRepository.save(createCategory);

    return createCategory;

  }

  async deleteCategories(id: string) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const deleteCategory = await categoryRepository
      .createQueryBuilder()
      .delete()
      .from(Categoria)
      .where("id = :id", { id })
      .execute();

    return deleteCategory;

  }
  async getDataCategories(id: string) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const getDataCategory = await categoryRepository.findOne(id);

    return getDataCategory;
  }
  async listCategories() {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const listCategory = await categoryRepository.find();

    return listCategory;
  }
  async searchCategories(search: string) {
    if (!search) {
      throw new Error("Por favor llenar todos los campos de busqueda");
    }

    const categoryRepository = getCustomRepository(CategoryRepository);

    const searchCategory = await categoryRepository
      .createQueryBuilder()
      .where("nombre_categoria like :search", { search: `%${search}%` })
      .getMany();

    return searchCategory;

  }
  async updateCategories({ id, nombre_categoria}: ICategoria) {

    const categoryRepository = getCustomRepository(CategoryRepository);

    const updateCategory = await categoryRepository
      .createQueryBuilder()
      .update(Categoria)
      .set({ nombre_categoria })
      .where("id = :id", { id })
      .execute();

    return updateCategory;

  }
}

export { CategoryService };