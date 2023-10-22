import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.models";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUserCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test find product use case", () => {
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

    it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new FindProductUserCase(productRepository) 

        const product = ProductFactory.create("a", "product 1", 100)
        
        await productRepository.create(product);

        const input = {
            id: product.id
        };

        const output = {
            id: product.id,
            name: "product 1",
            price: 100
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});