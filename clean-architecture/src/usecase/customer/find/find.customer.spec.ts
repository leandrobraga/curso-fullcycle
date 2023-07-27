import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.models";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomeruseCase from "./find.customer.usecase";


const customer = new Customer("123", "Jhon");
const address = new Address("Rua tal", 123, "39400-123", "Moc");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}


describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomeruseCase(customerRepository);
  
    const input = {
        id : "123"
    }

    const output = {
        id: "123",
        name: "Jhon",
        address: {
            street: "Rua tal",
            city: "Moc",
            number: 123,
            zip: "39400-123",
        }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output);
  });

  it("should not found a customer", () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomeruseCase(customerRepository);

    const input = {
      id : "123"
    };
    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found")
  });
});