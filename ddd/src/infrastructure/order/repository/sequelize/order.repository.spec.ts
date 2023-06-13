import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/repository/sequelize/customer.models";
import OrderModel from "./order.models";
import OrderItemModel from "./order-items.models";
import ProductModel from "../../../product/repository/sequelize/product.models";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_items";
import Order from "../../../../domain/checkout/entity/order";

describe("Order Repository Unit Test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([
          CustomerModel,
          OrderModel,
          OrderItemModel,
          ProductModel,
        ]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);
    
        const orderItem = new OrderItem(
          "1",
          product.name,
          product.price,
          product.id,
          2
        );
    
        const order = new Order("123", "123", [orderItem]);
    
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
              {
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123",
              },
            ],
          });
    });

    it("should update order", async ()=> {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
    
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
  
      const orderItem1 = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );
    
      const order = new Order("123", "123", [orderItem1]);
      
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const product2 = new Product("1234", "Product 2", 20);
      await productRepository.create(product2);

      const orderItem2 = new OrderItem(
        "2",
        product2.name,
        product2.price,
        product2.id,
        1
      );
      
      const customer2 = new Customer("1233", "Customer 2");
      const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
      customer2.changeAddress(address2);
      await customerRepository.create(customer2);
      
      order.addItems(orderItem2);
      order.changeCustomer(customer2.id);

      await orderRepository.update(order);

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });
      // console.log(orderModel.items);
      expect(orderModel.customer_id).toBe(customer2.id);
      expect(orderModel.total).toBe(order.total());
      expect(orderModel.items.length).toBe(order.items.length);
    });

    it("should find a order",async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
    
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
  
      const orderItem1 = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );
    
      const order = new Order("123", "123", [orderItem1]);
      
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderResult = await orderRepository.find(order.id);
      
      expect(order).toStrictEqual(orderResult);
    });

    it("should find all orders", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
    
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
  
      const orderItem1 = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );
    
      const order = new Order("123", "123", [orderItem1]);

      const orderItem2 = new OrderItem(
        "2",
        product.name,
        product.price,
        product.id,
        3
      );
    
      const order2 = new Order("1234", "123", [orderItem2]);
      
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);
      await orderRepository.create(order2);

      const orders = await orderRepository.findAll();

      expect(orders).toHaveLength(2);
      expect(orders).toContainEqual(order);
      expect(orders).toContainEqual(order2);
    });

    it("should throw an error when order is not found", async () => {
      const orderRepository = new OrderRepository();
  
      expect(async () => {
        await orderRepository.find("1233AS");
      }).rejects.toThrow("Order not found");
    });
});