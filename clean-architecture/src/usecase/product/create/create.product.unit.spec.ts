import ProductCreateUseCase from "./create.product.usecase";

const input = {
    name: "product 1",
    price: 100
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test create product use case", () => {
    it("should create a product", async()=>{
        const productRepository = MockRepository();
        const productCreateUsecase = new ProductCreateUseCase(productRepository);

        const output = await productCreateUsecase.execute(input);
        
        // Retorna um uuid gerado automatico
        // no caso poderia forçar ser um valor válido de uuid
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async()=>{
        const productRepository = MockRepository();
        const productCreateUsecase = new ProductCreateUseCase(productRepository);

        input.name = "";
        await expect(productCreateUsecase.execute(input)).rejects.toThrow("Name is required")
        
    });
});