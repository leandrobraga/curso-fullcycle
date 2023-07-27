import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.models";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomeruseCase from "./find.customer.usecase";


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
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomeruseCase(customerRepository);

    const customer = new Customer("123", "Jhon");
    const address = new Address("Rua tal", 123, "39400-123", "Moc");
    customer.changeAddress(address);
    await customerRepository.create(customer);

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
  })
});