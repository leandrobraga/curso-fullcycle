import Order from "../../domain/entity/order";
import OrderRespositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/models/order-items.models";
import OrderModel from "../db/sequelize/models/order.models";


// implements OrderRespositoryInterface
export default class OrderRepository  {
    async create(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: order.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
        },
        {
            include: [{ model: OrderItemModel }],
          }
        );
    }

    async update(order: Order): Promise<void> {
        await OrderModel.update({
            items: order.items,
           
        },
        {
            where: {
                id: order.id
            }
        });
    }

    // async findAll(): Promise<Order[]> {
    //     const orderModels = await OrderModel.findAll()

    //     return orderModels.map(orderModel => 
    //         new Order(orderModel.id, orderModel.cusomterId, []orderModel.items)
    //     )
    // }
}