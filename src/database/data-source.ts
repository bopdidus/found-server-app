import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource(require("../../ormconfig.json"))

                                  

