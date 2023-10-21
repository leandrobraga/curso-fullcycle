import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUserCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Jhon",
    new Address("Rua", 123, "1234", "city")
)

const input = {
    id: customer.id,
    name: "Jhon Updated",
    address: {
        street: "Rua Updated",
        number: 1234,
        zip: "zip Updated",
        city: "City Updated"
    }
}

// pra usar o update usa-se o find e ele deve estar implementado
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}


describe("Unit Test for update customer use case", () => {
    it("should update a customer", async ()=>{
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUserCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    })
});