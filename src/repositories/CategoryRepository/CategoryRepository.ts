import { Repository, EntityRepository } from "typeorm";
import { Categoria } from "../../entities/Categoria";

@EntityRepository(Categoria)
class CategoryRepository extends Repository<Categoria>{ }

export { CategoryRepository };