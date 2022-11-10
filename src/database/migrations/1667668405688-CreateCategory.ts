import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategory1667668405688 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categorias",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nombre_categoria",
                        type: "varchar"
                    },
                    {
                        name: "creado",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "actualizado",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categorias");
    }

}