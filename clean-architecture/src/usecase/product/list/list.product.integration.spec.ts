import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.models";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductCreateUseCase from "../create/create.product.usecase";
import ProductListUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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

    it("should list a product", async () => {
        const productRepository = new ProductRepository();
        const listUseCase = new ProductListUseCase(productRepository);
        const createUseCase = new ProductCreateUseCase(productRepository);

        const inputCreateProduct1 = {
            name: "product 1",
            price: 100 
        };

        const inputCreateProduct2 = {
            name: "product 2",
            price: 200 
        };

        const outputProduct1 = await createUseCase.execute(inputCreateProduct1);
        const outputProduct2 = await createUseCase.execute(inputCreateProduct2);



        const result = await listUseCase.execute({});

        expect(result.products.length).toBe(2);
        expect(result.products[0].name).toBe(outputProduct1.name);
        expect(result.products[0].price).toBe(outputProduct1.price);
        expect(result.products[1].name).toBe(outputProduct2.name);
        expect(result.products[1].price).toBe(outputProduct2.price);
    });
});