import { DataSource } from "typeorm";
import Pagamento from "../../domain/entities/Pagamento";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/infra/config/database.sqlite",
    entities: [Pagamento],
    synchronize: true,
});
