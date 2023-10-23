import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.models";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductCreateUseCase from "./create.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test create product use case", () => {
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

    it("should create a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new ProductCreateUseCase(productRepository);

        const input = {
            name: "product 1",
            price: 100 
        };

        const output = {
            id: expect.any(String),
            name: "product 1",
            price: 100
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});