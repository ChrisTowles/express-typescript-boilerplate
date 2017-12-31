import {MigrationInterface, QueryRunner} from 'typeorm';

export class generate_1514691117272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL,
             "last_name" character varying NOT NULL, "email" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(
            `CREATE TABLE "pet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL,
             "age" integer NOT NULL, "user_id" uuid, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "fk_29afab316d1eccbc4b52ba2e8c8" FOREIGN KEY ("user_id") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "fk_29afab316d1eccbc4b52ba2e8c8"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
