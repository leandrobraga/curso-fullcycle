import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUserCase from "../update/update.customer.usecase";
import ListCustomerUserCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Jhon Doe",
    new Address("Rua", 123, "1234", "city")
);

const customer2 = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("Rua 2", 2, "12344555", "city 2")
)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("Unit Test for listing customer use case", () => {
    it("should list a customer", async ()=>{
        const customerRepository = MockRepository();
        const usecase = new ListCustomerUserCase(customerRepository);

        const output = await usecase.execute({});

       
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
    })
});