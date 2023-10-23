import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.models";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductCreateUseCase from "../create/create.product.usecase";
import UpdateListUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updateUseCase = new UpdateListUseCase(productRepository);
        const createUseCase = new ProductCreateUseCase(productRepository);
        
        const inputCreateProduct1 = {
            name: "product 1",
            price: 100 
        };

        const outputProduct1 = await createUseCase.execute(inputCreateProduct1);

        const input = {
            id: outputProduct1.id,
            name: "product 1 updated",
            price: 200
        };

        const result = await updateUseCase.execute(input);

        expect(result).toEqual(input);

        
    });
});