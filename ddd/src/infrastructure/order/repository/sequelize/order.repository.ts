import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_items";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-items.models";
import OrderModel from "./order.models";




export default class OrderRepository implements OrderRepositoryInterface  {
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
        
        await OrderModel.update(
            {
                customer_id: order.customerId,
                items: order.items,
                total: order.total()
            },
            {
                where: {
                    id: order.id
                },
                
            }
        );

        await OrderItemModel.destroy({
            where: {
                order_id: order.id
            }
        });

        await OrderItemModel.bulkCreate(order.items.map(item => ({ 
            order_id: order.id,
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
        })))

    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({ 
                where: {
                    id:id
                },
                rejectOnEmpty: true,
                include: [{ model: OrderItemModel }],
            });
        }catch(error) {
            throw new Error('Order not found');
        }
        
        const orderItems = orderModel.items.map((item: OrderItemModel) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        }) 
        return new Order(orderModel.id, orderModel.customer_id, orderItems);
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({include: [{ model: OrderItemModel }],})
        
        return orderModels.map(orderModel => {
            const orderItems = orderModel.items.map((item: OrderItemModel) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            });
            return new Order(orderModel.id, orderModel.customer_id, orderItems)
        });
           
           
    }
}