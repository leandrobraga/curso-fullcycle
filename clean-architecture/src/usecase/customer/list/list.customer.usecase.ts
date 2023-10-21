import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./lis.customer.dto";

export default class ListCustomerUserCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const costumers = await this.customerRepository.findAll();
        return OutputMapper.toOutPut(costumers);
    }
}

class OutputMapper {
    static toOutPut(costumers: Customer[]): OutputListCustomerDto {
        return {
            customers: costumers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    city: customer.Address.city,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                }
            })),
        };
    }
}