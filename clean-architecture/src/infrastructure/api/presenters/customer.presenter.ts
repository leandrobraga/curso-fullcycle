import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/lis.customer.dto";

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerDto): string {
        const xmlOption = {
            header: true,
            indent: " ",
            newline: "\n",
            allowempty: true,
        };

        return toXML(
            {
                customers: {
                  customer: data.customers.map((customer) => ({
                    id: customer.id,
                    name: customer.name,
                    address: {
                      street: customer.address.street,
                      number: customer.address.number,
                      zip: customer.address.zip,
                      city: customer.address.city,
                    },
                  })),
                },
            },
            xmlOption
        )
    }
}