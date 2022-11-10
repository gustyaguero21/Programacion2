import { Column, CreateDateColumn, Entity,OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Producto } from "./Producto";

@Entity("categorias")
class Categoria {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre_categoria: string;

  @CreateDateColumn()
  creado: Date;

  @UpdateDateColumn()
  actualizado: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Categoria };