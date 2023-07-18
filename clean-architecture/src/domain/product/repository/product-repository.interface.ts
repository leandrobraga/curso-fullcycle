import RepositoryInterface from "../../@shared/repository/repository-interface";
import Product from "../entity/product";

export default interface ProductRespositoryInterface extends RepositoryInterface<Product> {
    // Pode crar aqui uma assinatura de um metodo aqui que faz sentodo somente para o produto.
    // findByCodigodeBarra() por exemplo
}