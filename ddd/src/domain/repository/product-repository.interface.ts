import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";

export default interface ProductRespositoryInterface extends RepositoryInterface<Product> {
    // Pode crar aqui uma assinatura de um metodo aqui que faz sentodo somente para o produto.
    // findByCodigodeBarra() por exemplo
}