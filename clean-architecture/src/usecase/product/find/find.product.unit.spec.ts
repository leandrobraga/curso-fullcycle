import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUserCase from "./find.product.usecase";

const product = ProductFactory.create("a", "product 1", 100);


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("Unit Test find product use case", () => {
    
    it("should find a product", async () => {

        const productRepository = MockRepository();
        const usecase = new FindProductUserCase(productRepository) 

        const input = {
            id: product.id
        };

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});