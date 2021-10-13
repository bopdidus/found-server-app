import {MigrationInterface, QueryRunner} from "typeorm";
import { connection} from '../config/db';
import { User, UserRole } from '../entity/User';
import {getManager} from "typeorm";

export class initMigration1634001339779 implements MigrationInterface {
    name = 'initMigration1634001339779'


    public async up(queryRunner: QueryRunner): Promise<void> {
   /* await queryRunner.query("ALTER TABLE `item` DROP FOREIGN KEY `FK_c0c8f47a702c974a77812169bc2`");
        await queryRunner.query("ALTER TABLE `item` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `category` DROP FOREIGN KEY `FK_01279634d048402041313def384`");
        await queryRunner.query("ALTER TABLE `category` CHANGE `fatherId` `fatherId` int NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createDate` `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `item` ADD CONSTRAINT `FK_c0c8f47a702c974a77812169bc2` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `category` ADD CONSTRAINT `FK_01279634d048402041313def384` FOREIGN KEY (`fatherId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");*/

         await queryRunner.query(`INSERT INTO user (firstName, lastName, email, password, isActivated, role) VALUES ("admin","admin", "admin@admin.com", 'admin12345', 1, "${UserRole.ADMIN}")`);
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       /* await queryRunner.query("ALTER TABLE `category` DROP FOREIGN KEY `FK_01279634d048402041313def384`");
        await queryRunner.query("ALTER TABLE `item` DROP FOREIGN KEY `FK_c0c8f47a702c974a77812169bc2`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createDate` `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `category` CHANGE `fatherId` `fatherId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `category` ADD CONSTRAINT `FK_01279634d048402041313def384` FOREIGN KEY (`fatherId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `item` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `item` ADD CONSTRAINT `FK_c0c8f47a702c974a77812169bc2` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");*/
    }

}
