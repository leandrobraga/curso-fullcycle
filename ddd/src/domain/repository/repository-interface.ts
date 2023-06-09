export default interface RepositoryInterface<T> {
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    // Faz sentido ter uma assinatura de um método de paginação
    findAll(): Promise<T[]>;
}