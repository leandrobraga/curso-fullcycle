import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUserCase from "./update.product.usecase";

const product = ProductFactory.create("a", "product 1", 100)

const input = {
    id: product.id,
    name: "product 1 Updated",
    price: 200
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("Unit Test for update product use case", () => {
    it("should update a product", async ()=>{
        const productRepository = MockRepository();
        const usecase = new UpdateProductUserCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    })
});