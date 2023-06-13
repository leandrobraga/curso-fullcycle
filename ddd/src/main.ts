import Address from './domain/customer/value-object/address';
import Customer from './domain/customer/entity/customer';
import Order from './domain/checkout/entity/order';
import OrderItem from './domain/checkout/entity/order_items';


// Customer Agregate 
let customer = new Customer("1", "Leandro");
const address = new Address("Rua dos bobos", 0, "99999-99", "Iolanda");
customer.Address = address;
customer.activate();


// Order Agregate
const item1 = new OrderItem("1", "Item1", 10);
const item2 = new OrderItem("2", "Item2", 15);
const order = new Order("1", "1", [item1, item2]);