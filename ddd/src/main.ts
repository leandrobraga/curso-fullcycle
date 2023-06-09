import Address from './domain/entity/address';
import Customer from './domain/entity/customer';
import Order from './domain/entity/order';
import OrderItem from './domain/entity/order_items';


// Customer Agregate 
let customer = new Customer("1", "Leandro");
const address = new Address("Rua dos bobos", 0, "99999-99", "Iolanda");
customer.Address = address;
customer.activate();


// Order Agregate
const item1 = new OrderItem("1", "Item1", 10);
const item2 = new OrderItem("2", "Item2", 15);
const order = new Order("1", "1", [item1, item2]);