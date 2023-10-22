import Product from "../../../domain/product/entity/product";
import ProductRespositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUserCase {
    private productRepository: ProductRespositoryInterface

    constructor(productRepository: ProductRespositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto):Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll()
        return OutputMapper.toOutPut(products);
        
    }
} 

class OutputMapper {
    static toOutPut(products: Product[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            })),
        };
    }
}