import CustomerCreateUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Rua",
        number: 123,
        zip: "zip",
        city: "City"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test create customer use case", () => {
    it("should create a customer", async()=>{
        const customerRepository = MockRepository();
        const customerCreateUsecase = new CustomerCreateUseCase(customerRepository);

        const output = await customerCreateUsecase.execute(input);
        
        // Retorna um uuid gerado automatico
        // no caso poderia forçar ser um valor válido de uuid
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        });
    });

    it("should throw an error when name is missing", async()=>{
        const customerRepository = MockRepository();
        const customerCreateUsecase = new CustomerCreateUseCase(customerRepository);

        input.name = "";
        await expect(customerCreateUsecase.execute(input)).rejects.toThrow("Name is required")
        
    });
});