import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1667668228909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "productos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nombre_producto",
                        type: "varchar"
                    },
                    {
                        name: "marca",
                        type: "varchar"
                    },
                    {
                        name: "modelo",
                        type: "varchar"
                    },
                    {
                        name: "precio",
                        type: "number"
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
        await queryRunner.dropTable("productos");
    }

}