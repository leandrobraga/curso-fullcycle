import Product from "../../../../domain/product/entity/product";
import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductRespositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.models";

export default class ProductRepository implements ProductRespositoryInterface {
    async create(product: ProductInterface): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update(
            {
                name: product.name,
                price: product.price
            },
            {
                where: {
                    id: product.id
                }
            }
        );
    }

    async find(id: string):Promise<Product>{
        const product = await ProductModel.findOne({where: {id: id}});
        return new Product(product.id, product.name, product.price);
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map(productModel => 
            new Product(productModel.id, productModel.name, productModel.price)
        );
    }
}