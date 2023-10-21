import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUserCase from "./find.customer.usecase";

const customer = new Customer("123", "Jhon");
const address = new Address("Rua", 123, "2342", "city");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("Unit Test find customer use case", () => {
    
    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        const usecase = new FindCustomerUserCase(customerRepository) 

        const input = {
            id: "123"
        };

        const output = {
            id: "123",
            name: "Jhon",
            address: {
                street: "Rua", 
                number: 123, 
                zip: "2342", 
                city: "city"
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a customer", () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
            
        });
        const usecase = new FindCustomerUserCase(customerRepository) 
        
        const input = {
            id: "1234"
        };
        expect(async() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    });
});